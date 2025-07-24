import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GragientButton = ({
  isDisabled,
  title,
  onPress,
  colors,
  type,
  image,
  border = ['#FFCE68', '#D33F00'],
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isDisabled}
    >
      <LinearGradient
        colors={border}
        style={
          Platform.OS === 'ios'
            ? styles.gradientBorderIos
            : styles.gradientBorder
        }
      >
        <View>
          <LinearGradient
            colors={colors}
            style={
              Platform.OS === 'ios'
                ? styles.gradientButtonIos
                : styles.gradientButton
            }
          >
            {type === 'Text' ? (
              <Text style={styles.btnText}>{title}</Text>
            ) : (
              <Image source={image} />
            )}
          </LinearGradient>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradientButton: {
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  gradientBorder: {
    borderRadius: 14,
    padding: 2,
  },
  gradientButtonIos: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    height: 64,
    padding: 2,
  },
  gradientBorderIos: {
    borderRadius: 14,
  },

  btnText: {
    fontFamily: 'RubikOne-Regular',
    fontSize: 18,
    color: '#FFCE68',
  },
});

export default GragientButton;
