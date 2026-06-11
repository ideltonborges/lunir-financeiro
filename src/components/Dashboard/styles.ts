import { StyleSheet } from 'react-native';

export const getStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 60, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  
  appName: { fontFamily: 'Manrope_700Bold', fontSize: 24, color: '#fff', marginBottom: 4 },
  greeting: { fontFamily: 'Manrope_400Regular', fontSize: 14, color: 'rgba(255,255,255,0.8)' },

  balanceCard: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 24, padding: 24, marginTop: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  balanceHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  balanceLabel: { fontFamily: 'Manrope_400Regular', color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  balanceValue: { fontFamily: 'Manrope_700Bold', color: '#fff', fontSize: 36, marginBottom: 20 },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  balanceSubHeader: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  balanceSubLabel: { fontFamily: 'Manrope_400Regular', color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  incomeValue: { fontFamily: 'Manrope_700Bold', color: '#fff', fontSize: 18 },
  expenseValue: { fontFamily: 'Manrope_700Bold', color: '#fff', fontSize: 18 },

  content: { paddingHorizontal: 24, marginTop: -30 },

  quickActions: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  actionCard: { flex: 1, backgroundColor: colors.card, padding: 16, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  actionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  iconWrapper: { padding: 8, borderRadius: 12 },
  actionText: { fontFamily: 'Manrope_500Medium', color: colors.foreground, fontSize: 14 },

  chartContainer: { backgroundColor: colors.card, borderRadius: 24, padding: 16, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 18, color: colors.foreground, marginBottom: 16 },

  emptyChart: { alignItems: 'center', paddingVertical: 32 },
  emptyChartText: { fontFamily: 'Manrope_400Regular', fontSize: 14, color: colors.muted, marginTop: 8 },

  recentSection: { marginBottom: 24 },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  recentTitle: { fontFamily: 'Manrope_700Bold', fontSize: 18, color: colors.foreground },
  seeAllText: { fontFamily: 'Manrope_500Medium', fontSize: 14, color: colors.gradientStart },

  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyStateText: { fontFamily: 'Manrope_500Medium', fontSize: 15, color: colors.muted, marginTop: 12 },
  emptyStateSubText: { fontFamily: 'Manrope_400Regular', fontSize: 13, color: colors.muted, opacity: 0.7, marginTop: 4 },

  transactionCard: { backgroundColor: colors.card, borderRadius: 20, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  transactionLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  transactionIcon: { padding: 10, borderRadius: 12 },
  transactionDesc: { fontFamily: 'Manrope_500Medium', fontSize: 15, color: colors.foreground },
  transactionCat: { fontFamily: 'Manrope_400Regular', fontSize: 12, color: colors.muted, marginTop: 2 },
  transactionAmount: { fontFamily: 'Manrope_700Bold', fontSize: 15 },

  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontFamily: 'Manrope_400Regular', fontSize: 14, color: colors.muted, marginTop: 12 },
  
});