import { z } from 'zod';
import { isValidCurrencyInput, parseCurrencyInput } from '../../utils/currency';

export const incomeCategories = [
  'Salário', 'Freelance', 'Investimentos',
  'Renda Extra', 'Presente', 'Outros',
];

export const expenseCategories = [
  'Alimentação', 'Transporte', 'Moradia',
  'Saúde', 'Educação', 'Lazer',
  'Contas', 'Compras', 'Outros',
];

export const transactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z
    .string()
    .min(1, 'O valor é obrigatório')
    .refine((val) => isValidCurrencyInput(val), 'Valor inválido')
    .refine((val) => parseCurrencyInput(val) > 0, 'O valor deve ser maior que zero')
    .refine((val) => parseCurrencyInput(val) <= 999999.99, 'Valor máximo: R$ 999.999,99'),
  description: z
    .string()
    .min(3, 'Mínimo de 3 caracteres')
    .max(100, 'Máximo de 100 caracteres'),
  category: z.string().min(1, 'Selecione uma categoria'),
  expenseType: z.enum(['fixed', 'variable']).optional(),
  date: z.string().min(1, 'A data é obrigatória'),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
