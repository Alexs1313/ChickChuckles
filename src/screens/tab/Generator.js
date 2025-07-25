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
import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore } from '../../store/context';
import GragientButton from '../../components/GradientButton';
import AppBackground from '../../components/AppBackground';
import { jokes } from '../../data/jokes';
import GradientContainer from '../../components/GradientContainer';
import MiniLoader from '../../components/MiniLoader';

const { height } = Dimensions.get('window');

const Generator = () => {
  const [showJokes, setShowJokes] = useState(false);
  const [randomJoke, setRandomJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const {
    getFavoritesJokes,
    favoritesJokes,
    setFavoritesJokes,
    joke,
    setJoke,
  } = useStore();

  const isFavorite = joke && favoritesJokes.includes(joke);

  const allJokes = jokes.flatMap(category => category.jokes);

  console.log('allJokes', allJokes);
  useFocusEffect(
    useCallback(() => {
      getFavoritesJokes();

      return () => {
        setShowJokes(false);
      };
    }, []),
  );

  const saveFavorites = async newFavorites => {
    setFavoritesJokes(newFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const toggleFavorite = () => {
    if (!joke) return;

    const updated = favoritesJokes.includes(joke)
      ? favoritesJokes.filter(i => i !== joke)
      : [...favoritesJokes, joke];

    saveFavorites(updated);
  };

  const handleRestart = () => {
    videoRef.current?.seek(0);
    generateRandomJoke();
  };

  const generateRandomJoke = () => {
    setIsLoading(true);

    setTimeout(() => {
      const random = allJokes[Math.floor(Math.random() * allJokes.length)];
      setRandomJoke(random);
      setJoke(random);
      setIsLoading(false);
    }, 4000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: randomJoke,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AppBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {isLoading ? (
          <View style={{ flexGrow: 1, height: height }}>
            <View style={{ alignItems: 'center', paddingTop: height * 0.07 }}>
              <Image
                source={require('../../assets/images/generatorLogo.png')}
              />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>

            <MiniLoader />
          </View>
        ) : (
          <View style={styles.container}>
            {showJokes ? (
              <View style={{ width: '100%' }}>
                <View style={styles.videoWrap}>
                  <Video
                    source={require('../../assets/videos/rooster.mp4')}
                    style={styles.video}
                    resizeMode="cover"
                    ref={videoRef}
                  />
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                  <GradientContainer>
                    <View style={styles.jokeContainer}>
                      <Text style={styles.containerTitle}>Generated joke:</Text>
                      <Text style={styles.joke}>{randomJoke}</Text>

                      <View style={styles.buttonsWrap}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={handleShare}
                        >
                          <Image
                            source={require('../../assets/icons/share.png')}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={toggleFavorite}
                        >
                          {isFavorite ? (
                            <Image
                              source={require('../../assets/icons/savedJoke.png')}
                            />
                          ) : (
                            <Image
                              source={require('../../assets/icons/save.png')}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </GradientContainer>
                  <View style={{ marginTop: 18 }}>
                    <GragientButton
                      colors={['#F5AB01', '#E97F01']}
                      image={require('../../assets/images/components/nextJoke.png')}
                      onPress={() => {
                        handleRestart();
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <>
                <Image
                  source={require('../../assets/images/generatorLogo.png')}
                />
                <Text style={styles.title}>
                  Tap below to generate the new joke
                </Text>
                <View style={{ width: '80%', marginTop: 21 }}>
                  <GragientButton
                    colors={['#F5AB01', '#E97F01']}
                    image={require('../../assets/images/components/generate.png')}
                    onPress={() => {
                      setShowJokes(true), generateRandomJoke();
                    }}
                  />
                </View>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.07,
    alignItems: 'center',
    padding: 32,
    paddingBottom: height * 0.14,
  },
  videoWrap: {
    overflow: 'hidden',
    borderRadius: 14,
    width: '100%',
    height: height * 0.42,
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  imagesWrap: {
    height: 90,
    marginBottom: 20,
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
  loadingText: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  buttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
});

export default Generator;
