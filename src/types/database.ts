// ==============================================================================
// DOGDOG — TIPAGEM TYPESCRIPT CANONICA DO BANCO DE DADOS (POSTGRESQL / SUPABASE)
// Versao: 1.0 | Data: 19/11/2026
// Mapeamento ponta a ponta dos 7 domínios e 27 tabelas relacionais
// ==============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ------------------------------------------------------------------------------
// ENUMS & ESTADOS LITERAIS
// ------------------------------------------------------------------------------

export type RbacRole =
  | 'superadmin'
  | 'store_owner'
  | 'store_attendant'
  | 'courier'
  | 'customer';

export type PlanTier = 'starter' | 'pro';

export type OrderSource = 'direct_link' | 'marketplace' | 'subscription';

export type OrderStatus =
  | 'pending'
  | 'preparing'
  | 'dispatched'
  | 'delivered'
  | 'cancelled';

export type DeliveryMode = 'immediate_45min' | 'scheduled';

export type DeliveryShift = 'manha' | 'tarde';

export type PaymentChannel = 'online_split' | 'offline_delivery';

export type PaymentMethod =
  | 'pix'
  | 'credit_card'
  | 'dinheiro'
  | 'cartao_credito_maquininha'
  | 'cartao_debito_maquininha'
  | 'pix_maquininha';

export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export type SubscriptionStatus = 'active' | 'paused' | 'cancelled';

export type SubscriptionPaymentMethod = 'mercadopago_card' | 'offline_delivery';

export type SubscriptionFrequencyDays = 7 | 14 | 30;

export type PetSpecies = 'dog' | 'cat' | 'other';

export type PetSizeCategory = 'mini' | 'small' | 'medium' | 'large' | 'giant';

export type BulkMovementType =
  | 'sack_opening'
  | 'order_deduction'
  | 'manual_adjustment'
  | 'loss_writeoff';

export type LeadPipelineStage =
  | 'novo'
  | 'em_contato'
  | 'pronto_aprovar'
  | 'aprovado'
  | 'descartado';

export type TenantInvoiceStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';

export type BackgroundJobStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed';

// ------------------------------------------------------------------------------
// ESTRUTURAS JSONB TIPADAS
// ------------------------------------------------------------------------------

export interface DeliveryAddressSnapshot {
  recipient_name: string;
  phone_whatsapp?: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  reference_point?: string;
  delivery_instructions?: string;
}

export interface OperatingHoursDay {
  open: string; // "08:00"
  close: string; // "19:00"
  is_closed: boolean;
}

export interface OperatingHoursMap {
  monday?: OperatingHoursDay;
  tuesday?: OperatingHoursDay;
  wednesday?: OperatingHoursDay;
  thursday?: OperatingHoursDay;
  friday?: OperatingHoursDay;
  saturday?: OperatingHoursDay;
  sunday?: OperatingHoursDay;
}

// ------------------------------------------------------------------------------
// ESQUEMA PRINCIPAL DO BANCO (SUPABASE GENERATED SHAPE)
// ------------------------------------------------------------------------------

export interface Database {
  public: {
    Tables: {
      platform_settings: {
        Row: {
          id: string;
          technical_break_default_percent: number;
          price_change_notice_days: number;
          circuit_breaker_failure_rate_percent: number;
          terms_version: string;
          privacy_version: string;
          default_timezone: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          technical_break_default_percent?: number;
          price_change_notice_days?: number;
          circuit_breaker_failure_rate_percent?: number;
          terms_version?: string;
          privacy_version?: string;
          default_timezone?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          technical_break_default_percent?: number;
          price_change_notice_days?: number;
          circuit_breaker_failure_rate_percent?: number;
          terms_version?: string;
          privacy_version?: string;
          default_timezone?: string;
          updated_at?: string;
        };
      };

      platform_plans: {
        Row: {
          id: PlanTier;
          name: string;
          monthly_price_cents: number;
          online_order_commission_percent: number;
          subscription_commission_percent: number;
          offline_order_commission_percent: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id: PlanTier;
          name: string;
          monthly_price_cents: number;
          online_order_commission_percent: number;
          subscription_commission_percent: number;
          offline_order_commission_percent?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: PlanTier;
          name?: string;
          monthly_price_cents?: number;
          online_order_commission_percent?: number;
          subscription_commission_percent?: number;
          offline_order_commission_percent?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };

      tenants: {
        Row: {
          id: string;
          slug: string;
          legal_name: string;
          trade_name: string;
          document_cnpj: string;
          phone_whatsapp: string;
          email: string;
          plan_tier: PlanTier;
          address_street: string;
          address_number: string;
          address_complement: string | null;
          address_neighborhood: string;
          address_city: string;
          address_state: string;
          address_cep: string;
          latitude: number | null;
          longitude: number | null;
          delivery_radius_km: number;
          delivery_fee_cents: number;
          min_order_cents: number;
          estimated_prep_minutes: number;
          accepted_payment_methods: Json;
          operating_hours: Json;
          timezone: string;
          is_active: boolean;
          deleted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          legal_name: string;
          trade_name: string;
          document_cnpj: string;
          phone_whatsapp: string;
          email: string;
          plan_tier: PlanTier;
          address_street: string;
          address_number: string;
          address_complement?: string | null;
          address_neighborhood: string;
          address_city: string;
          address_state: string;
          address_cep: string;
          latitude?: number | null;
          longitude?: number | null;
          delivery_radius_km?: number;
          delivery_fee_cents?: number;
          min_order_cents?: number;
          estimated_prep_minutes?: number;
          accepted_payment_methods?: Json;
          operating_hours?: Json;
          timezone?: string;
          is_active?: boolean;
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          legal_name?: string;
          trade_name?: string;
          document_cnpj?: string;
          phone_whatsapp?: string;
          email?: string;
          plan_tier?: PlanTier;
          address_street?: string;
          address_number?: string;
          address_complement?: string | null;
          address_neighborhood?: string;
          address_city?: string;
          address_state?: string;
          address_cep?: string;
          latitude?: number | null;
          longitude?: number | null;
          delivery_radius_km?: number;
          delivery_fee_cents?: number;
          min_order_cents?: number;
          estimated_prep_minutes?: number;
          accepted_payment_methods?: Json;
          operating_hours?: Json;
          timezone?: string;
          is_active?: boolean;
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      tenant_integrations: {
        Row: {
          tenant_id: string;
          mercadopago_user_id: string | null;
          mercadopago_access_token: string | null;
          mercadopago_public_key: string | null;
          mercadopago_refresh_token: string | null;
          mercadopago_token_expires_at: string | null;
          meta_waba_id: string | null;
          meta_phone_number_id: string | null;
          meta_access_token: string | null;
          updated_at: string;
        };
        Insert: {
          tenant_id: string;
          mercadopago_user_id?: string | null;
          mercadopago_access_token?: string | null;
          mercadopago_public_key?: string | null;
          mercadopago_refresh_token?: string | null;
          mercadopago_token_expires_at?: string | null;
          meta_waba_id?: string | null;
          meta_phone_number_id?: string | null;
          meta_access_token?: string | null;
          updated_at?: string;
        };
        Update: {
          tenant_id?: string;
          mercadopago_user_id?: string | null;
          mercadopago_access_token?: string | null;
          mercadopago_public_key?: string | null;
          mercadopago_refresh_token?: string | null;
          mercadopago_token_expires_at?: string | null;
          meta_waba_id?: string | null;
          meta_phone_number_id?: string | null;
          meta_access_token?: string | null;
          updated_at?: string;
        };
      };

      tenant_invoices: {
        Row: {
          id: string;
          tenant_id: string;
          plan_id: string;
          amount_cents: number;
          status: TenantInvoiceStatus;
          reference_month: string;
          due_date: string;
          paid_at: string | null;
          payment_method: string | null;
          receipt_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          plan_id: string;
          amount_cents: number;
          status?: TenantInvoiceStatus;
          reference_month: string;
          due_date: string;
          paid_at?: string | null;
          payment_method?: string | null;
          receipt_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          plan_id?: string;
          amount_cents?: number;
          status?: TenantInvoiceStatus;
          reference_month?: string;
          due_date?: string;
          paid_at?: string | null;
          payment_method?: string | null;
          receipt_url?: string | null;
          created_at?: string;
        };
      };

      tenant_onboarding_leads: {
        Row: {
          id: string;
          trade_name: string;
          contact_name: string;
          phone_whatsapp: string;
          cep: string;
          city: string;
          state: string;
          pipeline_stage: LeadPipelineStage;
          converted_tenant_id: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          trade_name: string;
          contact_name: string;
          phone_whatsapp: string;
          cep: string;
          city: string;
          state: string;
          pipeline_stage?: LeadPipelineStage;
          converted_tenant_id?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          trade_name?: string;
          contact_name?: string;
          phone_whatsapp?: string;
          cep?: string;
          city?: string;
          state?: string;
          pipeline_stage?: LeadPipelineStage;
          converted_tenant_id?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      waitlist_leads: {
        Row: {
          id: string;
          full_name: string;
          phone_whatsapp: string;
          cep: string;
          suggested_petshop: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          phone_whatsapp: string;
          cep: string;
          suggested_petshop?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone_whatsapp?: string;
          cep?: string;
          suggested_petshop?: string | null;
          created_at?: string;
        };
      };

      profiles: {
        Row: {
          id: string;
          tenant_id: string | null;
          full_name: string;
          phone_whatsapp: string | null;
          role: RbacRole;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          tenant_id?: string | null;
          full_name: string;
          phone_whatsapp?: string | null;
          role?: RbacRole;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          full_name?: string;
          phone_whatsapp?: string | null;
          role?: RbacRole;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      user_consents: {
        Row: {
          id: string;
          anonymous_session_id: string | null;
          profile_id: string | null;
          policy_version: string;
          cookies_essential: boolean;
          cookies_analytics: boolean;
          cookies_marketing: boolean;
          ip_address: string | null;
          user_agent: string | null;
          consented_at: string;
          revoked_at: string | null;
        };
        Insert: {
          id?: string;
          anonymous_session_id?: string | null;
          profile_id?: string | null;
          policy_version: string;
          cookies_essential?: boolean;
          cookies_analytics?: boolean;
          cookies_marketing?: boolean;
          ip_address?: string | null;
          user_agent?: string | null;
          consented_at?: string;
          revoked_at?: string | null;
        };
        Update: {
          id?: string;
          anonymous_session_id?: string | null;
          profile_id?: string | null;
          policy_version?: string;
          cookies_essential?: boolean;
          cookies_analytics?: boolean;
          cookies_marketing?: boolean;
          ip_address?: string | null;
          user_agent?: string | null;
          consented_at?: string;
          revoked_at?: string | null;
        };
      };

      customer_addresses: {
        Row: {
          id: string;
          customer_id: string;
          label: string;
          recipient_name: string;
          cep: string;
          street: string;
          number: string;
          complement: string | null;
          neighborhood: string;
          city: string;
          state: string;
          reference_point: string | null;
          delivery_instructions: string | null;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          label?: string;
          recipient_name: string;
          cep: string;
          street: string;
          number: string;
          complement?: string | null;
          neighborhood: string;
          city: string;
          state: string;
          reference_point?: string | null;
          delivery_instructions?: string | null;
          is_default?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          label?: string;
          recipient_name?: string;
          cep?: string;
          street?: string;
          number?: string;
          complement?: string | null;
          neighborhood?: string;
          city?: string;
          state?: string;
          reference_point?: string | null;
          delivery_instructions?: string | null;
          is_default?: boolean;
          created_at?: string;
        };
      };

      couriers: {
        Row: {
          id: string;
          tenant_id: string;
          profile_id: string | null;
          full_name: string;
          phone_whatsapp: string;
          vehicle_plate: string;
          is_active: boolean;
          deleted_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          profile_id?: string | null;
          full_name: string;
          phone_whatsapp: string;
          vehicle_plate: string;
          is_active?: boolean;
          deleted_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          profile_id?: string | null;
          full_name?: string;
          phone_whatsapp?: string;
          vehicle_plate?: string;
          is_active?: boolean;
          deleted_at?: string | null;
          created_at?: string;
        };
      };

      pet_breeds: {
        Row: {
          id: string;
          species: PetSpecies;
          name: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          species: PetSpecies;
          name: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          species?: PetSpecies;
          name?: string;
          is_active?: boolean;
        };
      };

      pets: {
        Row: {
          id: string;
          customer_id: string;
          breed_id: string | null;
          name: string;
          species: PetSpecies;
          custom_breed: string | null;
          size_category: PetSizeCategory | null;
          weight_kg: number | null;
          birth_date: string | null;
          avatar_url: string | null;
          health_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          breed_id?: string | null;
          name: string;
          species: PetSpecies;
          custom_breed?: string | null;
          size_category?: PetSizeCategory | null;
          weight_kg?: number | null;
          birth_date?: string | null;
          avatar_url?: string | null;
          health_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          breed_id?: string | null;
          name?: string;
          species?: PetSpecies;
          custom_breed?: string | null;
          size_category?: PetSizeCategory | null;
          weight_kg?: number | null;
          birth_date?: string | null;
          avatar_url?: string | null;
          health_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      product_categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          sort_order: number;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          sort_order?: number;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          sort_order?: number;
        };
      };

      products: {
        Row: {
          id: string;
          tenant_id: string;
          category_id: string;
          title: string;
          description: string | null;
          brand: string | null;
          image_url: string | null;
          price_cents: number;
          stock_quantity: number;
          is_prescription_required: boolean;
          is_active: boolean;
          deleted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          category_id: string;
          title: string;
          description?: string | null;
          brand?: string | null;
          image_url?: string | null;
          price_cents: number;
          stock_quantity?: number;
          is_prescription_required?: boolean;
          is_active?: boolean;
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          category_id?: string;
          title?: string;
          description?: string | null;
          brand?: string | null;
          image_url?: string | null;
          price_cents?: number;
          stock_quantity?: number;
          is_prescription_required?: boolean;
          is_active?: boolean;
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      bulk_products: {
        Row: {
          product_id: string;
          tenant_id: string;
          parent_sack_product_id: string;
          price_per_kg_cents: number;
          current_stock_grams: number;
          technical_break_percent: number;
          low_stock_threshold_grams: number;
          updated_at: string;
        };
        Insert: {
          product_id: string;
          tenant_id: string;
          parent_sack_product_id: string;
          price_per_kg_cents: number;
          current_stock_grams?: number;
          technical_break_percent?: number;
          low_stock_threshold_grams?: number;
          updated_at?: string;
        };
        Update: {
          product_id?: string;
          tenant_id?: string;
          parent_sack_product_id?: string;
          price_per_kg_cents?: number;
          current_stock_grams?: number;
          technical_break_percent?: number;
          low_stock_threshold_grams?: number;
          updated_at?: string;
        };
      };

      bulk_stock_movements: {
        Row: {
          id: string;
          tenant_id: string;
          bulk_product_id: string;
          sack_product_id: string | null;
          operator_id: string | null;
          movement_type: BulkMovementType;
          sacks_debited: number;
          grams_moved: number;
          resulting_stock_grams: number;
          technical_break_applied_percent: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          bulk_product_id: string;
          sack_product_id?: string | null;
          operator_id?: string | null;
          movement_type: BulkMovementType;
          sacks_debited?: number;
          grams_moved: number;
          resulting_stock_grams: number;
          technical_break_applied_percent?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          bulk_product_id?: string;
          sack_product_id?: string | null;
          operator_id?: string | null;
          movement_type?: BulkMovementType;
          sacks_debited?: number;
          grams_moved?: number;
          resulting_stock_grams?: number;
          technical_break_applied_percent?: number | null;
          notes?: string | null;
          created_at?: string;
        };
      };

      product_price_changes: {
        Row: {
          id: string;
          tenant_id: string;
          product_id: string;
          created_by: string | null;
          old_price_cents: number;
          new_price_cents: number;
          effective_date: string;
          subscribers_affected_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          product_id: string;
          created_by?: string | null;
          old_price_cents: number;
          new_price_cents: number;
          effective_date: string;
          subscribers_affected_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          product_id?: string;
          created_by?: string | null;
          old_price_cents?: number;
          new_price_cents?: number;
          effective_date?: string;
          subscribers_affected_count?: number;
          created_at?: string;
        };
      };

      subscriptions: {
        Row: {
          id: string;
          customer_id: string;
          tenant_id: string;
          status: SubscriptionStatus;
          payment_method: SubscriptionPaymentMethod;
          mercadopago_card_token: string | null;
          delivery_weekday: number;
          preferred_shift: DeliveryShift;
          delivery_address_snapshot: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          tenant_id: string;
          status?: SubscriptionStatus;
          payment_method: SubscriptionPaymentMethod;
          mercadopago_card_token?: string | null;
          delivery_weekday: number;
          preferred_shift?: DeliveryShift;
          delivery_address_snapshot: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          tenant_id?: string;
          status?: SubscriptionStatus;
          payment_method?: SubscriptionPaymentMethod;
          mercadopago_card_token?: string | null;
          delivery_weekday?: number;
          preferred_shift?: DeliveryShift;
          delivery_address_snapshot?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };

      subscription_items: {
        Row: {
          id: string;
          subscription_id: string;
          product_id: string;
          pet_id: string | null;
          is_bulk: boolean;
          weight_grams: number | null;
          quantity: number;
          frequency_interval_days: SubscriptionFrequencyDays;
          price_cents: number;
          next_billing_date: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          subscription_id: string;
          product_id: string;
          pet_id?: string | null;
          is_bulk?: boolean;
          weight_grams?: number | null;
          quantity?: number;
          frequency_interval_days: SubscriptionFrequencyDays;
          price_cents: number;
          next_billing_date: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subscription_id?: string;
          product_id?: string;
          pet_id?: string | null;
          is_bulk?: boolean;
          weight_grams?: number | null;
          quantity?: number;
          frequency_interval_days?: SubscriptionFrequencyDays;
          price_cents?: number;
          next_billing_date?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      subscription_execution_logs: {
        Row: {
          id: string;
          subscription_id: string;
          order_id: string | null;
          cycle_date: string;
          status: 'success' | 'payment_failed' | 'skipped' | 'retry';
          error_message: string | null;
          executed_at: string;
        };
        Insert: {
          id?: string;
          subscription_id: string;
          order_id?: string | null;
          cycle_date: string;
          status: 'success' | 'payment_failed' | 'skipped' | 'retry';
          error_message?: string | null;
          executed_at?: string;
        };
        Update: {
          id?: string;
          subscription_id?: string;
          order_id?: string | null;
          cycle_date?: string;
          status?: 'success' | 'payment_failed' | 'skipped' | 'retry';
          error_message?: string | null;
          executed_at?: string;
        };
      };

      orders: {
        Row: {
          id: string;
          display_sequence_id: number;
          tenant_id: string;
          customer_id: string;
          subscription_id: string | null;
          courier_id: string | null;
          order_source: OrderSource;
          status: OrderStatus;
          delivery_mode: DeliveryMode;
          scheduled_date: string | null;
          scheduled_shift: DeliveryShift | null;
          subtotal_cents: number;
          delivery_fee_cents: number;
          platform_take_rate_cents: number;
          total_cents: number;
          payment_channel: PaymentChannel;
          payment_method: PaymentMethod;
          payment_status: PaymentStatus;
          offline_change_for_cents: number | null;
          has_prescription: boolean;
          prescription_confirmed_by_courier: boolean;
          mercadopago_payment_id: string | null;
          delivery_address_snapshot: Json;
          cancellation_reason: string | null;
          cancelled_at: string | null;
          delivered_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          display_sequence_id: number;
          tenant_id: string;
          customer_id: string;
          subscription_id?: string | null;
          courier_id?: string | null;
          order_source: OrderSource;
          status?: OrderStatus;
          delivery_mode?: DeliveryMode;
          scheduled_date?: string | null;
          scheduled_shift?: DeliveryShift | null;
          subtotal_cents: number;
          delivery_fee_cents?: number;
          platform_take_rate_cents?: number;
          total_cents: number;
          payment_channel: PaymentChannel;
          payment_method: PaymentMethod;
          payment_status?: PaymentStatus;
          offline_change_for_cents?: number | null;
          has_prescription?: boolean;
          prescription_confirmed_by_courier?: boolean;
          mercadopago_payment_id?: string | null;
          delivery_address_snapshot: Json;
          cancellation_reason?: string | null;
          cancelled_at?: string | null;
          delivered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_sequence_id?: number;
          tenant_id?: string;
          customer_id?: string;
          subscription_id?: string | null;
          courier_id?: string | null;
          order_source?: OrderSource;
          status?: OrderStatus;
          delivery_mode?: DeliveryMode;
          scheduled_date?: string | null;
          scheduled_shift?: DeliveryShift | null;
          subtotal_cents?: number;
          delivery_fee_cents?: number;
          platform_take_rate_cents?: number;
          total_cents?: number;
          payment_channel?: PaymentChannel;
          payment_method?: PaymentMethod;
          payment_status?: PaymentStatus;
          offline_change_for_cents?: number | null;
          has_prescription?: boolean;
          prescription_confirmed_by_courier?: boolean;
          mercadopago_payment_id?: string | null;
          delivery_address_snapshot?: Json;
          cancellation_reason?: string | null;
          cancelled_at?: string | null;
          delivered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          pet_id: string | null;
          is_bulk: boolean;
          weight_grams_requested: number | null;
          weight_grams_actual: number | null;
          quantity: number;
          unit_price_cents: number;
          total_price_cents: number;
          packaging_instructions: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          pet_id?: string | null;
          is_bulk?: boolean;
          weight_grams_requested?: number | null;
          weight_grams_actual?: number | null;
          quantity?: number;
          unit_price_cents: number;
          total_price_cents: number;
          packaging_instructions?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          pet_id?: string | null;
          is_bulk?: boolean;
          weight_grams_requested?: number | null;
          weight_grams_actual?: number | null;
          quantity?: number;
          unit_price_cents?: number;
          total_price_cents?: number;
          packaging_instructions?: string | null;
          created_at?: string;
        };
      };

      order_status_history: {
        Row: {
          id: string;
          order_id: string;
          from_status: string | null;
          to_status: string;
          notes: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          from_status?: string | null;
          to_status: string;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          from_status?: string | null;
          to_status?: string;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
      };

      audit_prescriptions: {
        Row: {
          id: string;
          order_id: string;
          customer_id: string;
          customer_ip: string;
          terms_accepted_at: string;
          courier_id: string;
          physical_verified: boolean;
          crmv_number: string | null;
          rejection_reason: string | null;
          partial_refund_cents: number;
          verified_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          customer_id: string;
          customer_ip: string;
          terms_accepted_at?: string;
          courier_id: string;
          physical_verified?: boolean;
          crmv_number?: string | null;
          rejection_reason?: string | null;
          partial_refund_cents?: number;
          verified_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          customer_id?: string;
          customer_ip?: string;
          terms_accepted_at?: string;
          courier_id?: string;
          physical_verified?: boolean;
          crmv_number?: string | null;
          rejection_reason?: string | null;
          partial_refund_cents?: number;
          verified_at?: string | null;
          created_at?: string;
        };
      };

      order_reviews: {
        Row: {
          id: string;
          order_id: string;
          tenant_id: string;
          customer_id: string | null;
          courier_id: string | null;
          rating_punctuality: number;
          rating_packaging_freshness: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          tenant_id: string;
          customer_id?: string | null;
          courier_id?: string | null;
          rating_punctuality: number;
          rating_packaging_freshness: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          tenant_id?: string;
          customer_id?: string | null;
          courier_id?: string | null;
          rating_punctuality?: number;
          rating_packaging_freshness?: number;
          comment?: string | null;
          created_at?: string;
        };
      };

      background_jobs: {
        Row: {
          id: string;
          queue_name: string;
          job_type: string;
          payload: Json;
          status: BackgroundJobStatus;
          attempts: number;
          max_attempts: number;
          last_error: string | null;
          run_at: string;
          locked_at: string | null;
          locked_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          queue_name?: string;
          job_type: string;
          payload: Json;
          status?: BackgroundJobStatus;
          attempts?: number;
          max_attempts?: number;
          last_error?: string | null;
          run_at?: string;
          locked_at?: string | null;
          locked_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          queue_name?: string;
          job_type?: string;
          payload?: Json;
          status?: BackgroundJobStatus;
          attempts?: number;
          max_attempts?: number;
          last_error?: string | null;
          run_at?: string;
          locked_at?: string | null;
          locked_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };

    Functions: {
      convert_sack_to_bulk: {
        Args: {
          p_tenant_id: string;
          p_sack_product_id: string;
          p_bulk_product_id: string;
          p_sack_weight_kg: number;
          p_operator_id: string;
        };
        Returns: void;
      };
      enqueue_background_job: {
        Args: {
          p_queue_name: string;
          p_job_type: string;
          p_payload: Json;
          p_run_at?: string;
        };
        Returns: string;
      };
      get_auth_tenant_id: {
        Args: Record<PropertyKey, never>;
        Returns: string | null;
      };
    };
  };
}

// ------------------------------------------------------------------------------
// SHORTCUT HELPERS PARA CONSUMO NO FRONTEND E SERVER ACTIONS
// ------------------------------------------------------------------------------

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// Aliases Diretos
export type PlatformSettings = Tables<'platform_settings'>;
export type PlatformPlan = Tables<'platform_plans'>;
export type Tenant = Tables<'tenants'>;
export type TenantIntegration = Tables<'tenant_integrations'>;
export type TenantInvoice = Tables<'tenant_invoices'>;
export type TenantOnboardingLead = Tables<'tenant_onboarding_leads'>;
export type WaitlistLead = Tables<'waitlist_leads'>;
export type Profile = Tables<'profiles'>;
export type UserConsent = Tables<'user_consents'>;
export type CustomerAddress = Tables<'customer_addresses'>;
export type Courier = Tables<'couriers'>;
export type PetBreed = Tables<'pet_breeds'>;
export type Pet = Tables<'pets'>;
export type ProductCategory = Tables<'product_categories'>;
export type Product = Tables<'products'>;
export type BulkProduct = Tables<'bulk_products'>;
export type BulkStockMovement = Tables<'bulk_stock_movements'>;
export type ProductPriceChange = Tables<'product_price_changes'>;
export type Subscription = Tables<'subscriptions'>;
export type SubscriptionItem = Tables<'subscription_items'>;
export type SubscriptionExecutionLog = Tables<'subscription_execution_logs'>;
export type Order = Tables<'orders'>;
export type OrderItem = Tables<'order_items'>;
export type OrderStatusHistory = Tables<'order_status_history'>;
export type AuditPrescription = Tables<'audit_prescriptions'>;
export type OrderReview = Tables<'order_reviews'>;
export type BackgroundJob = Tables<'background_jobs'>;
