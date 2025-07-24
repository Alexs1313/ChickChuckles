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
import TransparentButton from '../../components/TransparentButton';
import { jokes } from '../../data/jokes';
import GradientContainer from '../../components/GradientContainer';

const { height } = Dimensions.get('window');

const categories = ['Feather Roasts', 'Barnyard Blunders', 'Cluck Philosophy'];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showJokes, setShowJokes] = useState(false);
  const [currentJokeIdx, setCurrentJokeIdx] = useState(0);
  const [randomJoke, setRandomJoke] = useState(null);
  const videoRef = useRef(null);
  const {
    getFavoritesJokes,
    favoritesJokes,
    setFavoritesJokes,
    joke,
    setJoke,
  } = useStore();

  const isFavorite = joke && favoritesJokes.includes(joke);

  const filredByCategory = jokes.find(
    joke => joke.category === selectedCategory,
  );

  useFocusEffect(
    useCallback(() => {
      getFavoritesJokes();

      return () => {
        setShowJokes(false), setSelectedCategory('');
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

    if (currentJokeIdx === filredByCategory.jokes.length - 1)
      setCurrentJokeIdx(0);
    else setCurrentJokeIdx(prev => prev + 1);

    generateRandomJoke();
  };

  const generateRandomJoke = () => {
    // const random =
    //   filredByCategory.jokes[
    //     Math.floor(Math.random() * filredByCategory.jokes.length)
    //   ];
    setRandomJoke(filredByCategory.jokes[currentJokeIdx]);
    setJoke(filredByCategory.jokes[currentJokeIdx]);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {showJokes ? (
            <View style={{ width: '100%' }}>
              <Video
                source={require('../../assets/videos/rooster.mp4')}
                style={styles.video}
                resizeMode="cover"
                ref={videoRef}
              />
              <View style={{ paddingHorizontal: 20 }}>
                <GradientContainer>
                  <View style={styles.jokeContainer}>
                    <Text style={styles.containerTitle}>
                      Feather Roasts #{currentJokeIdx + 1}
                    </Text>
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
                source={require('../../assets/images/categoriesLogo.png')}
              />
              <View style={{ width: '75%', gap: 8 }}>
                {categories.map((category, idx) => (
                  <View key={idx}>
                    <TransparentButton
                      colors={
                        selectedCategory === category
                          ? ['#fff', '#fff']
                          : ['#18110C', '#18110C']
                      }
                      title={category}
                      type={'Text'}
                      onPress={() => setSelectedCategory(category)}
                    />
                  </View>
                ))}
              </View>
              <View style={{ width: '75%', marginTop: 21 }}>
                <GragientButton
                  colors={['#F5AB01', '#E97F01']}
                  isDisabled={!selectedCategory}
                  image={require('../../assets/images/components/start.png')}
                  onPress={() => {
                    setShowJokes(true), generateRandomJoke();
                  }}
                />
              </View>
            </>
          )}
        </View>
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
  video: {
    width: '100%',
    height: 380,
    marginBottom: 20,
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
  buttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
});

export default Categories;
