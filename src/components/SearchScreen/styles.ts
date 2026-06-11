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
    marginBottom: 16,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: 'Manrope_400Regular',
    color: '#fff',
  },
  clearButton: {
    padding: 4,
  },

  scrollContent: {
    padding: 16,
  },

  filterSection: {
    marginBottom: 20,
  },
  filterHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterLabel: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colors.muted,
  },
  clearFiltersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clearFiltersText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: colors.gradientStart,
  },

  typeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  typeButtonAll: {
    borderColor: colors.gradientStart,
    backgroundColor: 'rgba(59,130,246,0.05)',
  },
  typeButtonIncome: {
    borderColor: '#10B981',
    backgroundColor: 'rgba(16,185,129,0.05)',
  },
  typeButtonExpense: {
    borderColor: colors.gradientStart,
    backgroundColor: 'rgba(59,130,246,0.05)',
  },
  typeButtonText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colors.muted,
  },
  typeButtonTextActive: {
    fontFamily: 'Manrope_700Bold',
    color: colors.foreground,
  },

  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  categoryChipActive: {
    borderColor: colors.gradientStart,
    backgroundColor: 'rgba(59,130,246,0.05)',
  },
  categoryChipText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.muted,
  },
  categoryChipTextActive: {
    fontFamily: 'Manrope_700Bold',
    color: colors.gradientStart,
  },

  resultsLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.muted,
    marginBottom: 12,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 12,
  },
  cardDesc: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: colors.foreground,
    marginBottom: 4,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: colors.inputBg,
  },
  badgeText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11,
    color: colors.muted,
  },
  cardDate: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11,
    color: colors.muted,
  },
  cardAmount: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: colors.muted,
  },
  emptySubText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.border,
    marginTop: 4,
  },
});