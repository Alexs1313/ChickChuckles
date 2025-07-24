import {
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { useStore } from '../../store/context';
import AppBackground from '../../components/AppBackground';
import GradientContainer from '../../components/GradientContainer';
import { jokes } from '../../data/jokes';

const { height } = Dimensions.get('window');

const Saved = () => {
  const { getFavoritesJokes, favoritesJokes, removeJoke } = useStore();

  const allJokes = jokes.flatMap(category => category.jokes);

  useFocusEffect(
    useCallback(() => {
      getFavoritesJokes();
    }, []),
  );

  const handleShare = async joke => {
    try {
      await Share.share({
        message: joke,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Saved</Text>
          <View style={{ width: '100%' }}>
            <View style={{ paddingHorizontal: 20, gap: 12 }}>
              {favoritesJokes.map((joke, idx) => (
                <GradientContainer key={idx}>
                  <View style={styles.jokeContainer}>
                    <Text style={styles.containerTitle}>
                      Feather Roasts #{allJokes.indexOf(joke) + 1}
                    </Text>
                    <Text style={styles.joke}>{joke}</Text>

                    <View style={styles.buttonsWrap}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => handleShare(joke)}
                      >
                        <Image
                          source={require('../../assets/icons/share.png')}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => removeJoke(joke)}
                      >
                        <Image
                          source={require('../../assets/icons/savedJoke.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </GradientContainer>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.078,
    alignItems: 'center',
    padding: 32,
    paddingBottom: height * 0.14,
  },
  title: {
    fontFamily: 'RubikOne-Regular',
    fontSize: 18,
    color: '#FFCE68',
    textAlign: 'center',
    marginBottom: 43,
  },
  containerTitle: {
    fontFamily: 'RubikOne-Regular',
    fontSize: 18,
    color: '#FFCE68',
    textAlign: 'center',
  },
  jokeContainer: {
    padding: 20,
    paddingHorizontal: 15,
    paddingBottom: 32,
  },
  joke: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 15,
    minHeight: 75,
  },
  buttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
});

export default Saved;
