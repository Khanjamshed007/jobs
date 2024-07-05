import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '@/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    padding: SIZES.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.secondary,
  },
  listContainer: {
    paddingBottom: SIZES.medium,
  },
});

export default styles;
