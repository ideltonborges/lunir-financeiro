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
    fontSize: 24,
    fontFamily: 'Manrope_700Bold',
    color: '#fff',
    marginBottom: 20,
  },

  filterRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 4,
    gap: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#fff',
  },
  filterButtonText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  filterButtonTextActive: {
    color: colors.gradientStart,
    fontFamily: 'Manrope_700Bold',
  },

  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  resultCount: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.muted,
    marginBottom: 12,
    marginLeft: 4,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  cardAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 12,
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 12,
    marginRight: 12,
    marginTop: 2,
  },
  cardInfo: {
    flex: 1,
  },
  cardDescription: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: colors.foreground,
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: colors.inputBg,
  },
  badgeText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11,
    color: colors.muted,
  },
  badgeFixed: {
    backgroundColor: 'rgba(59,130,246,0.1)',
  },
  badgeFixedText: {
    color: '#3B82F6',
  },
  badgeVariable: {
    backgroundColor: 'rgba(16,185,129,0.1)',
  },
  badgeVariableText: {
    color: '#10B981',
  },
  cardDate: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11,
    color: colors.muted,
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  cardAmount: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
  },
  deleteButton: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(239,68,68,0.08)',
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: 28,
    width: '100%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  modalTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
    color: colors.foreground,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colors.muted,
    lineHeight: 22,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: colors.inputBg,
    alignItems: 'center',
  },
  modalCancelText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    color: colors.foreground,
  },
  modalDeleteButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#ef4444',
    alignItems: 'center',
  },
  modalDeleteText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#fff',
  },
});