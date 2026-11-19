/**
 * DOGDOG Design Tokens
 * 
 * Fonte canônica de verdade para o design system "Pure Craft & Tactile Minimalism".
 * Consolidado a partir da malha completa de páginas públicas interligadas:
 * Home, Vitrine da Loja, Detalhe do Granel, Busca Comparativa, Institucional e Autenticação.
 */

export interface TenantPalette {
  name: string;
  accent: string;
  accentDark: string;
  accentSoft: string;
  textOnAccent: string;
  glowSoft: string;
}

export const tokens = {
  colors: {
    canvas: {
      base: '#FAF8F5',       // Linho porcelana suave editorial
      dark: '#1C1917',       // Fundo escuro desktop/backdrop
    },
    surface: {
      card: '#FFFFFF',       // Branco puro elevado
      cardDark: '#18181B',   // Dark mode tátil (Hero e Dynamic Island)
      cardMuted: '#F5F4F0',  // Superfície secundária desativada/neutra
      cardHover: '#FAFAF9',  // Feedback tátil de hover/press
    },
    ink: {
      primary: '#18181B',    // Carvão escovado de alto contraste
      secondary: '#71717A',  // Cinza intermediário legível
      muted: '#A1A1AA',      // Legendas e metadados secundários
      inverse: '#FFFFFF',    // Branco sobre superfícies escuras
      inverseMuted: '#D4D4D8',
    },
    border: {
      subtle: 'rgba(24, 24, 27, 0.06)',  // Oclusão física milimétrica (1px)
      default: 'rgba(24, 24, 27, 0.09)',
      dark: 'rgba(255, 255, 255, 0.12)',
    },
    status: {
      success: {
        solid: '#10B981',
        soft: '#ECFDF5',
        text: '#047857',
        border: 'rgba(16, 185, 129, 0.25)',
      },
      warning: {
        solid: '#F59E0B',
        soft: '#FEF3C7',
        text: '#B45309',
        border: 'rgba(245, 158, 11, 0.25)',
      },
      danger: {
        solid: '#EF4444',
        soft: '#FEE2E2',
        text: '#B91C1C',
        border: 'rgba(239, 68, 68, 0.25)',
      },
      rx: {
        solid: '#BE185D',
        soft: '#FDF2F8',
        text: '#9D174D',
        border: 'rgba(190, 24, 93, 0.25)',
      },
    }
  },

  tenantPresets: {
    dogdog: {
      name: 'DogDog Oficial',
      accent: '#EA283E',
      accentDark: '#C81E32',
      accentSoft: '#FFF1F2',
      textOnAccent: '#FFFFFF',
      glowSoft: 'rgba(234, 40, 62, 0.22)',
    },
    sunset: {
      name: 'Laranja Sunset',
      accent: '#FF5A1F',
      accentDark: '#D9440D',
      accentSoft: '#FFF2ED',
      textOnAccent: '#FFFFFF',
      glowSoft: 'rgba(255, 90, 31, 0.22)',
    },
    botanic: {
      name: 'Verde Botânico',
      accent: '#15803D',
      accentDark: '#166534',
      accentSoft: '#F0FDF4',
      textOnAccent: '#FFFFFF',
      glowSoft: 'rgba(21, 128, 61, 0.22)',
    },
    classic: {
      name: 'Graphite Classic',
      accent: '#18181B',
      accentDark: '#000000',
      accentSoft: '#F4F4F5',
      textOnAccent: '#FFFFFF',
      glowSoft: 'rgba(161, 161, 170, 0.22)',
    }
  } as Record<string, TenantPalette>,

  typography: {
    fonts: {
      sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      display: ['"Outfit"', 'sans-serif'],
    },
    sizes: {
      '2xs': ['9px', { lineHeight: '12px' }],
      'xs': ['11px', { lineHeight: '14px' }],
      'sm': ['13px', { lineHeight: '18px' }],
      'base': ['15px', { lineHeight: '20px' }],
      'lg': ['18px', { lineHeight: '24px' }],
      'xl': ['20px', { lineHeight: '26px' }],
      '2xl': ['24px', { lineHeight: '30px' }],
      '3xl': ['30px', { lineHeight: '36px' }],
      '4xl': ['36px', { lineHeight: '42px' }], // Grain Dial Mostrador
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    }
  },

  shadows: {
    'craft-sm': '0 8px 20px -6px rgba(24, 24, 27, 0.04), 0 1px 2px 0 rgba(24, 24, 27, 0.02)',
    'craft': '0 20px 40px -15px rgba(24, 24, 27, 0.05), 0 1px 3px 0 rgba(24, 24, 27, 0.02)',
    'craft-md': '0 20px 40px -10px rgba(24, 24, 27, 0.08), 0 2px 4px 0 rgba(24, 24, 27, 0.03)',
    'craft-floating': '0 24px 48px -12px rgba(24, 24, 27, 0.12), 0 2px 6px -1px rgba(24, 24, 27, 0.04)',
    'inner-dial': 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
  },

  radii: {
    'xs': '6px',
    'sm': '10px',
    'md': '14px',
    'lg': '16px',
    'xl': '20px',
    '2xl': '24px',
    '3xl': '28px',
    'pill': '9999px',
  },

  forms: {
    input: {
      bg: '#FAFAF9',
      border: 'rgba(24, 24, 27, 0.08)',
      radius: '12px',
      padding: '10px 12px',
      fontSize: '12px',
      fontWeight: '600',
    },
    otpSlot: {
      width: '40px',
      height: '44px',
      radius: '12px',
      fontSize: '18px',
      fontWeight: '900',
    },
    profilePill: {
      bgActive: '#FFFFFF',
      bgInactive: 'transparent',
      textActive: '#18181B',
      textInactive: '#71717A',
    }
  },

  grainDial: {
    thumb: {
      size: '28px',
      borderWidth: '3px',
      borderColor: '#FFFFFF',
      shadow: '0 4px 12px rgba(234, 40, 62, 0.4)',
    },
    track: {
      height: '8px',
      bg: '#E4E4E7',
      radius: '9999px',
    }
  },

  store: {
    tabs: {
      height: '36px',
      radius: '12px',
      activeBg: 'var(--tenant-accent)',
      activeText: '#FFFFFF',
      inactiveBg: '#FFFFFF',
      inactiveText: '#52525B',
    }
  },

  motion: {
    transitions: {
      tactile: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      spring: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
      fade: 'opacity 0.2s ease-out',
    }
  }
} as const;

export type DesignTokens = typeof tokens;
export type TenantKey = keyof typeof tokens.tenantPresets;
