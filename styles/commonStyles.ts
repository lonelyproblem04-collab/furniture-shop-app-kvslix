
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#8B4513',      // Saddle Brown - warm wood tone
  secondary: '#D2691E',    // Chocolate - lighter wood accent
  accent: '#2E8B57',       // Sea Green - modern accent
  background: '#FAFAFA',   // Off-white background
  backgroundAlt: '#FFFFFF', // Pure white for cards
  text: '#2C2C2C',         // Dark gray text
  textLight: '#666666',    // Light gray for secondary text
  border: '#E0E0E0',       // Light border color
  success: '#4CAF50',      // Green for success states
  warning: '#FF9800',      // Orange for warnings
  error: '#F44336',        // Red for errors
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  textLight: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textLight,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 3,
  },
  productCard: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    boxShadow: `0px 4px 12px ${colors.shadow}`,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  originalPrice: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textLight,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.backgroundAlt,
  },
});
