import { StyleSheet } from 'react-native';

export const getStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
  backButton: { padding: 8, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12 },
  headerTitle: { fontSize: 22, fontWeight: '600', color: '#fff', fontFamily: 'Manrope_700Bold' },

  typeSelector: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 4, gap: 4 },
  typeButton: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  typeButtonActive: { backgroundColor: '#fff' },
  typeButtonText: { fontSize: 15, fontWeight: '600', color: 'rgba(255,255,255,0.8)', fontFamily: 'Manrope_500Medium' },
  typeButtonTextActive: { color: colors.gradientStart },

  form: { flex: 1 },
  formContent: { padding: 24},

  inputGroup: { gap: 8, marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: colors.muted, fontFamily: 'Manrope_500Medium' },

  amountContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.border, borderRadius: 16 },
  currencySymbol: { paddingLeft: 16, fontSize: 22, color: colors.muted, fontFamily: 'Manrope_500Medium' },
  amountInput: { flex: 1, padding: 16, fontSize: 22, fontWeight: '700', color: colors.foreground, fontFamily: 'Manrope_700Bold' },

  input: { backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 16, fontSize: 16, color: colors.foreground, fontFamily: 'Manrope_400Regular' },
  inputText: { fontSize: 16, color: colors.foreground, fontFamily: 'Manrope_400Regular' },
  placeholderText: { color: colors.muted },
  inputError: { borderColor: '#ef4444' },

  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  errorText: { color: '#ef4444', fontSize: 12, fontFamily: 'Manrope_400Regular' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryCard: { width: '47%', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 16, borderWidth: 2, borderColor: colors.border, backgroundColor: colors.card, alignItems: 'center', position: 'relative' },
  categoryCardActive: { borderColor: colors.gradientStart, backgroundColor: 'rgba(59,130,246,0.05)' },
  categoryText: { fontSize: 14, color: colors.muted, fontFamily: 'Manrope_500Medium' },
  categoryTextActive: { color: colors.gradientStart, fontWeight: '600' },
  checkBadge: { position: 'absolute', top: 6, right: 6, width: 18, height: 18, borderRadius: 9, backgroundColor: colors.gradientStart, alignItems: 'center', justifyContent: 'center' },

  expenseTypeRow: { flexDirection: 'row', gap: 12 },
  expenseTypeButton: { flex: 1, paddingVertical: 14, borderRadius: 16, borderWidth: 2, borderColor: colors.border, backgroundColor: colors.card, alignItems: 'center' },
  expenseTypeFixed: { borderColor: colors.gradientStart, backgroundColor: 'rgba(59,130,246,0.05)' },
  expenseTypeVariable: { borderColor: '#10B981', backgroundColor: 'rgba(16,185,129,0.05)' },
  expenseTypeText: { fontSize: 15, fontWeight: '600', color: colors.muted, fontFamily: 'Manrope_500Medium' },
  expenseTypeTextActive: { color: colors.foreground },

  submitButton: { padding: 18, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', fontFamily: 'Manrope_700Bold' },
});
