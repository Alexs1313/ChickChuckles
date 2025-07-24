import { useNavigation } from '@react-navigation/native';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TransparentButton = ({
  style,
  title,
  onPress,
  colors,
  type,
  image,
  border = ['#FFCE68', '#D33F00'],
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
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
  btnText: {
    fontSize: 19,
    fontWeight: '900',
    color: '#fff',
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

export default TransparentButton;
