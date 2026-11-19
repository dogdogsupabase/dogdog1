# REGRAS LOCAIS E INVARIANTES RIGIDOS — PROJETO DOGDOG

Este arquivo define as regras inegociaveis do projeto **DOGDOG**. Toda decisao de arquitetura, modelagem de banco de dados, backend, frontend, migration, seed ou revisao de codigo neste repositorio DEVE obedecer integralmente a estas diretrizes, sem excecoes.

---

## 1. PROIBICAO ABSOLUTA DE DADOS HARDCODED

1. **Nenhum dado de negocio ou configuracao pode ser hardcoded no codigo-fonte** (frontend, backend, server actions, crons ou edge functions).
2. Os seguintes dados DEVEM residir obrigatoriamente em tabelas no PostgreSQL/Supabase e ser lidos dinamicamente:
   - Planos comerciais, mensalidades e percentuais de comissao (`platform_plans`).
   - Parametros globais da plataforma (`platform_settings`): prazo de aviso previo de reajuste (ex.: 7 dias), limite do Circuit Breaker (ex.: 20%), quebra tecnica padrao (ex.: 2,0%), versao vigente dos Termos de Uso e Politica de Privacidade, fuso horario padrao.
   - Catalogos de referencia: racas de caes e gatos (`pet_breeds`), categorias de produto, classes terapeuticas de medicamentos, bandeiras de cartao na maquininha e motivos de recusa/cancelamento.
   - Regras operacionais de cada loja (`tenants`): frete, pedido minimo, raio em km, tempo de preparo, horarios de funcionamento e meios de pagamento aceitos na entrega.
3. **Unica excecao tecnica permitida:** maquinas de estado de software que controlam transicoes de codigo (`order_status`, `approval_status`, `subscription_status`, `rbac_role`) devem permanecer como `ENUM` ou `CHECK` constraint fixos no PostgreSQL para garantir integridade estrutural.

---

## 2. ZERO FALLBACKS GENERICOS, SILENCIOSOS OU DADOS MOCADOS (FAIL-FAST)

1. **Proibido mascarar ausencia de dado com valores substitutos** (`price || 1000`, `commission ?? 8.5`, `weight || 10`, `storeId || defaultStore`, etc.).
2. Todo campo obrigatorio deve ser protegido por `NOT NULL` e `CHECK` constraints no PostgreSQL. Se um dado obrigatorio estiver ausente ou invalido, a operacao DEVE **falhar explicitamente** com erro claro e rastreavel — nunca calcular sobre um valor inventado.
3. **Proibido fallback visual enganoso:**
   - Produto sem foto exibe estado neutro ("sem imagem"), jamais a foto de outro produto.
   - CEP sem cobertura exibe o fluxo real de lista de espera (`waitlist_leads`), jamais uma loja padrao de outro bairro.
4. **Defaults legitimos devem ser explicitos e rastreaveis:** sugestoes iniciais (como quebra tecnica ao cadastrar item por kg) devem ser lidas de `platform_settings` e gravadas explicitamente no registro, nunca aplicadas de forma oculta no calculo.
5. **Zero dados ficticios em producao:** nenhum dado de demonstracao (ex.: "Thor", "Casa de Racao Central") pode existir em migrations, seeds de producao ou codigo de aplicacao.

---

## 3. INTEGRIDADE FINANCEIRA, ESTOQUE E CONCORRENCIA (POSTGRESQL)

1. **Dinheiro sempre em inteiros de centavos:** usar exclusivamente `INT` ou `BIGINT` com sufixo `*_cents`. Proibido `FLOAT`, `REAL` ou `DOUBLE PRECISION` para valores monetarios.
2. **Peso e estoque fracionado sempre em gramas:** usar sufixo `*_grams` com `CHECK (current_stock_grams >= 0)` e `CHECK (price_cents > 0)`.
3. **Snapshots historicos imutaveis:** `orders`, `order_items` e `tenant_invoices` devem gravar copia imutavel de preco, comissao aplicada, peso solicitado/conferido e endereco no instante da transacao. Alteracoes futuras em planos ou precos nunca podem distorcer registros passados.
4. **Atomicidade transacional com bloqueio de linha (`FOR UPDATE`):** operacoes criticas — como abertura de saco (`convert_sack_to_bulk`) e baixa de estoque por kg no fechamento de pedido — devem rodar em funcoes transacionais atomicas no banco, impedindo estoque negativo ou venda concorrente do mesmo saldo.
5. **Proibido `DELETE` fisico em entidades com historico:** lojas, produtos, entregadores e pets vinculados a pedidos/assinaturas devem usar desativacao/soft delete (`is_active` / `deleted_at`) com `ON DELETE RESTRICT` nas chaves estrangeiras financeiras e regulatorias.

---

## 4. SEGURANCA MULTI-TENANT E AUDITORIA IMUTAVEL (ZERO TRUST)

1. **RLS obrigatorio em 100% das tabelas:** nenhuma tabela pode ser criada sem `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` acompanhada de politicas explicitas por `tenant_id`, `auth.uid()` e papel RBAC. Sem politica = acesso negado por padrao.
2. **Isolamento fisico de credenciais:** tokens OAuth e segredos de integracao (`Mercado Pago`, `Meta WhatsApp CoEx`) sao **estritamente proibidos** na tabela publica `tenants`. Devem residir exclusivamente em `tenant_integrations`, bloqueada para leitura publica e acessivel apenas via backend (`service_role`).
3. **Auditoria `append-only`:** as tabelas `audit_prescriptions`, `bulk_stock_movements`, `product_price_changes` e `user_consents` nao podem permitir `UPDATE` ou `DELETE` via RLS (somente `INSERT` e `SELECT` conforme permissao).

---

## 5. FUSO HORARIO OFICIAL (UTC-3 / `America/Sao_Paulo`)

1. **Armazenamento no banco:** toda coluna temporal DEVE usar **`TIMESTAMPTZ`** (armazenamento interno UTC no PostgreSQL). E proibido criar colunas `TIMESTAMP` sem fuso horario.
2. **Fuso de negocio:** `platform_settings` e cada loja em `tenants` devem possuir a coluna explicita `timezone VARCHAR(50) NOT NULL DEFAULT 'America/Sao_Paulo'` (UTC-3).
3. **Regras de agenda e exibicao:** horarios de funcionamento, corte do cron diario de assinaturas (`06:00`), filtros por periodo, relatorios financeiros e logs de auditoria devem converter explicitamente usando `AT TIME ZONE timezone` (padrao `America/Sao_Paulo`, UTC-3).

---

## 6. PRIVACIDADE, LGPD E ACEITE DE COOKIES OBRIGATORIO

1. **Registro rastreavel de consentimento (`user_consents`):** tabela `append-only` obrigatoria para registrar aceite e revogacao de cookies e termos legais.
2. **Suporte ao fluxo Guest-First:** `user_consents` deve aceitar consentimentos de **visitantes anonimos** (`anonymous_session_id`) antes do login e vincula-los ao `profile_id` no momento da autenticacao social no checkout.
3. **Campos obrigatorios de auditoria LGPD:** `policy_version` (lida de `platform_settings`), `cookies_essential`, `cookies_analytics`, `cookies_marketing`, `ip_address` (`INET`), `user_agent`, `consented_at` (`TIMESTAMPTZ`) e `revoked_at` (`TIMESTAMPTZ`).
4. **Zero consentimento implicito:** cookies de analytics, marketing e recursos opcionais de rastreio NAO podem ser inicializados sem aceite explicito registrado. Apenas cookies estritamente necessarios (sessao `HttpOnly`, carrinho anonimo e CEP ativo) operam antes do aceite, com opcao permanente de revisao/revogacao pelo usuario.

---

## 7. DIRETRIZES INEGOCIAVEIS DE PRODUTO, VOCABULARIO E UI

1. **Zero Emojis:** proibido usar emojis em interfaces, mensagens de sistema, alertas ou respostas ao usuario. Utilizar exclusivamente icones SVG da biblioteca **Lucide**.
2. **Vocabulario proibido voltado ao usuario:** nunca exibir `"INMETRO"`, `"tambor"` ou `"granel"` na interface. Padronizar sempre **"por kg"**, **"venda por kg"**, **"estoque por kg"** e **"abertura de saco"**.
3. **Proibida calculadora de dose diaria (`g/dia`):** nao estimar nem sugerir gramatura diaria com base em peso/porte do pet. Perfis de pet armazenam dados reais (especie, raca, peso, fase, preferencias) e o CRM de recompra opera exclusivamente sobre o **intervalo medio real de compras do historico**.
4. **Fluxo Dual & Login Social Tardio:** suportar entrada tanto pela Home quanto pelo link particular da loja (`/[slug]`), com navegacao e montagem do pedido sem login previo, exigindo autenticacao social (Google/Apple, WhatsApp como fallback) apenas no fechamento — com reconhecimento automatico por cookie `HttpOnly` para clientes ja cadastrados.
5. **Trava Legal de Medicamentos Controlados:** todo medicamento com `is_prescription_required = TRUE` exige aceite legal com IP/timestamp no checkout e confirmacao fisica com CRMV (ou recusa com estorno parcial automatico) pelo entregador no Courier PWA.

---

## 8. ENGENHARIA, AMBIENTE E VERIFICACAO

1. **Runtime:** Node.js **22 LTS ou superior** (`node:22-alpine` em containers).
2. **Separacao estrita de scripts SQL:**
   - `migrations/`: exclusivamente DDL, constraints, indices, RPCs, triggers e politicas RLS.
   - `seed_reference.sql`: exclusivamente catalogos oficiais necessarios para producao (`platform_plans`, `platform_settings`, `pet_breeds`, categorias/dominios).
3. **Seguranca operacional:** nunca commitar segredos/chaves de API; nunca executar comandos destrutivos ou `git push` sem autorizacao expressa previa do usuario.
4. **Verificacao obrigatoria:** nenhuma entrega pode ser dada como concluida sem validacao direta (build, typecheck, testes SQL/RLS ou verificacao em navegador real).
