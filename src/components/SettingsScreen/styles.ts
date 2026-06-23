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
  },

  scrollContent: {
    padding: 16,
    gap: 16,
  },

  card: {
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
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIconWrapper: {
    padding: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(59,130,246,0.08)',
  },
  cardTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: colors.foreground,
  },
  cardSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  editButton: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: colors.gradientStart,
  },

  profileField: {
    marginBottom: 14,
  },
  profileFieldLast: {
    marginBottom: 0,
  },
  profileLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.muted,
    marginBottom: 4,
  },
  profileValue: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: colors.foreground,
  },

  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colors.muted,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    fontFamily: 'Manrope_400Regular',
    color: colors.foreground,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
  },
  inputPrefix: {
    paddingLeft: 14,
    fontFamily: 'Manrope_400Regular',
    fontSize: 15,
    color: colors.muted,
  },
  inputInline: {
    flex: 1,
    padding: 14,
    fontSize: 15,
    fontFamily: 'Manrope_400Regular',
    color: colors.foreground,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  errorText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#ef4444',
  },
  saveButton: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 4,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonGradient: {
    padding: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#fff',
  },

  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  toggleRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 4,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  toggleInfo: {
    flex: 1,
  },
  toggleTitle: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: colors.foreground,
  },
  toggleSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },

  switchTrack: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 3,
    justifyContent: 'center',
  },
  switchTrackOn: {
    backgroundColor: colors.gradientStart,
  },
  switchTrackOff: {
    backgroundColor: colors.border,
  },
  switchTrackDisabled: {
    opacity: 0.4,
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },

  reminderTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 36,
    marginBottom: 8,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
  },
  reminderTimeLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.muted,
  },
  reminderTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  reminderTimeValue: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: colors.foreground,
  },

  emptyFixedText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.muted,
    marginTop: 14,
  },
  fixedExpenseItem: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 14,
    marginTop: 14,
  },
  fixedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  fixedInfo: {
    flex: 1,
  },
  fixedTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: colors.foreground,
  },
  fixedMeta: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.muted,
    marginTop: 3,
  },
  fixedAmount: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#ef4444',
  },
  fixedActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  fixedSecondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.inputBg,
  },
  fixedDisabledButton: {
    opacity: 0.75,
  },
  fixedSecondaryText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colors.foreground,
  },
  fixedPrimaryButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fixedPrimaryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
  },
  fixedPrimaryText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 13,
    color: '#fff',
  },
  fixedEditRow: {
    flexDirection: 'row',
    gap: 12,
  },
  fixedEditColumn: {
    flex: 1,
  },

  backupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
  },
  backupButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 14,
    width: '100%',
  },
  backupButtonText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#fff',
  },
  restoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.inputBg,
    marginBottom: 12,
  },
  restoreButtonText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: colors.foreground,
  },
  infoBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'rgba(59,130,246,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(59,130,246,0.15)',
    borderRadius: 14,
    padding: 12,
  },
  infoText: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.muted,
    lineHeight: 18,
  },
  infoTextBold: {
    fontFamily: 'Manrope_700Bold',
    color: colors.foreground,
  },

  appInfoCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  appName: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 32,
    color: colors.gradientStart,
  },
  appTagline: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.muted,
    marginBottom: 8,
  },
  appVersion: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.border,
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
