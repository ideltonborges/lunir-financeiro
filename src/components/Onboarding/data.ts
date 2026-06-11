import { z } from 'zod';
import { Sparkles, TrendingUp, Target } from 'lucide-react-native';

export const slides = [
  {
    id: 'welcome',
    icon: Sparkles,
    title: 'Bem-vindo ao Lunir!',
    description: 'Seu assistente pessoal para organizar finanças de forma simples e intuitiva.',
    colors: ['#3b82f6', '#06b6d4'],
  },
  {
    id: 'track',
    icon: TrendingUp,
    title: 'Controle suas Finanças',
    description: 'Registre receitas e despesas, classifique gastos fixos e variáveis, e acompanhe tudo.',
    colors: ['#22c55e', '#10b981'],
  },
  {
    id: 'reports',
    icon: Target,
    title: 'Relatórios Detalhados',
    description: 'Visualize gráficos bonitos e relatórios completos para entender seus hábitos.',
    colors: ['#a855f7', '#ec4899'],
  },
];

export const setupSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(50, 'Máximo de 50 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Apenas letras'),
  salary: z
    .string()
    .optional()
    .refine(
      (val) => !val || (parseFloat(val) >= 0 && parseFloat(val) <= 999999.99),
      'Valor inválido'
    ),
  salaryDate: z.string().optional(),
  theme: z.enum(['light', 'dark']).optional(),
});

export type SetupFormData = z.infer<typeof setupSchema>;