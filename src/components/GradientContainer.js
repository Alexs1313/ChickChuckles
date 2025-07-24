import { Platform, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientContainer = ({ children, style, borderStyles }) => {
  return (
    <LinearGradient
      colors={['#FFCE68', '#D33F00']}
      style={[
        Platform.OS === 'ios'
          ? styles.gradientBorderIos
          : styles.gradientBorder,
        style,
        borderStyles,
      ]}
    >
      <LinearGradient
        colors={['#18110C', '#3E1C08']}
        style={[
          Platform.OS === 'ios'
            ? styles.gradientContainerIos
            : styles.gradientContainer,
          style,
        ]}
      >
        {children}
      </LinearGradient>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  gradientBorder: {
    borderRadius: 14,
    padding: 2,
  },
  gradientContainerIos: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    padding: 2,
  },
  gradientBorderIos: {
    borderRadius: 14,
  },
});

export default GradientContainer;
