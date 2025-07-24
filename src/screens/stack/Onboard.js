import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import GragientButton from '../../components/GradientButton';
import AppBackground from '../../components/AppBackground';

const { height } = Dimensions.get('window');

const Onboard = () => {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  const handleNextStep = () => {
    index === 3 ? navigation.replace('TabNav') : setIndex(index + 1);
  };

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={require('../../assets/images/onboardLogo.png')} />
          <LinearGradient
            colors={['#251A13', '#3E1C08']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.contentContainer}
          >
            <View style={styles.contentWrap}>
              <View style={styles.imagesWrap}>
                {index === 0 && (
                  <Image
                    source={require('../../assets/images/onboardComponents/1.png')}
                  />
                )}
                {index === 1 && (
                  <Image
                    source={require('../../assets/images/onboardComponents/2.png')}
                  />
                )}
                {index === 2 && (
                  <Image
                    source={require('../../assets/images/onboardComponents/3.png')}
                  />
                )}
                {index === 3 && (
                  <Image
                    source={require('../../assets/images/onboardComponents/4.png')}
                  />
                )}
              </View>
              <Text style={styles.subtitle}>
                {index === 0 &&
                  'Get ready for farm-fresh fun and jokes straight from the coop.'}
                {index === 1 &&
                  'A new laugh from our wise old rooster — every single day.'}
                {index === 2 &&
                  'From classic coop humor to wild henhouse tales — pick your style.'}
                {index === 3 &&
                  'Save your favorites and spread the laughs with just one tap.'}
              </Text>
              <View style={{ width: '70%' }}>
                <GragientButton
                  colors={['#F5AB01', '#E97F01']}
                  image={
                    index === 0
                      ? require('../../assets/images/onboardComponents/buttonText.png')
                      : require('../../assets/images/onboardComponents/buttonText2.png')
                  }
                  onPress={handleNextStep}
                />
              </View>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.07,
    alignItems: 'center',
  },
  contentWrap: {
    padding: 20,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  contentContainer: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    marginTop: 25,
    width: '100%',
  },
  title: {
    fontFamily: 'RubikBubbles-Regular',
    fontSize: 97,
    color: 'yellow', // orange-yellow
    textShadowColor: '#914207',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 14,
  },
  subtitle: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 60,
  },
  imagesWrap: {
    height: 90,
    marginBottom: 20,
  },
});

export default Onboard;
