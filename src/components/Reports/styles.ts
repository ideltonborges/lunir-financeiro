import { StyleSheet } from 'react-native';

export const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },

  periodRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 4,
    gap: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#fff',
  },
  periodButtonText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  periodButtonTextActive: {
    color: colors.gradientStart,
    fontFamily: 'Manrope_700Bold',
  },

  scrollContent: {
    padding: 16,
  },

  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
  },
  summaryCardIncome: {
    backgroundColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.2)',
  },
  summaryCardExpense: {
    backgroundColor: 'rgba(59,130,246,0.08)',
    borderColor: 'rgba(59,130,246,0.2)',
  },
  summaryIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  summaryIconWrapper: {
    padding: 6,
    borderRadius: 10,
  },
  summaryLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.muted,
  },
  summaryValue: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: colors.foreground,
  },

  balanceCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  balanceCardPositive: {
    backgroundColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.2)',
  },
  balanceCardNegative: {
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderColor: 'rgba(239,68,68,0.2)',
  },
  balanceLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.muted,
    marginBottom: 6,
  },
  balanceValue: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 28,
    color: colors.foreground,
  },
  balancePositive: {
    color: '#10B981',
  },
  balanceNegative: {
    color: '#ef4444',
  },

  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: colors.foreground,
    marginBottom: 16,
  },

  expenseRow: {
    marginBottom: 16,
  },
  expenseRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  expenseRowLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.muted,
  },
  expenseRowValue: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 13,
    color: colors.foreground,
  },
  progressTrack: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFixed: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  progressBarVariable: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },

  categoryItem: {
    marginBottom: 14,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  categoryName: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colors.foreground,
  },
  categoryValue: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 13,
    color: colors.foreground,
  },
  categoryPercentage: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11,
    color: colors.muted,
  },

  chartLegend: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.muted,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colors.muted,
    marginTop: 8,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colors.muted,
    marginTop: 12,
  },
});