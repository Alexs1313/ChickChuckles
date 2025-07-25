import {
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GragientButton from '../../components/GradientButton';
import AppBackground from '../../components/AppBackground';
import GradientContainer from '../../components/GradientContainer';
import { stories } from '../../data/stories';
import { useFocusEffect } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const TWELVE_HOURS = 12 * 60 * 60 * 1000;

const Daily = () => {
  const [showJokes, setShowJokes] = useState(false);
  const videoRef = useRef(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [randomIndex, setRandomIndex] = useState(() =>
    Math.floor(Math.random() * stories.length),
  );

  useEffect(() => {
    checkButtonStatus();
    const interval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowJokes(false);
      };
    }, []),
  );

  const checkButtonStatus = async () => {
    const storedTime = await AsyncStorage.getItem('timer');
    if (storedTime) {
      const elapsed = Date.now() - parseInt(storedTime, 10);
      if (elapsed >= TWELVE_HOURS) {
        setIsAvailable(true);
        setTimeLeft(0);
      } else {
        setIsAvailable(false);
        setTimeLeft(TWELVE_HOURS - elapsed);
      }
    } else {
      setIsAvailable(true);
    }
  };

  const updateCountdown = async () => {
    const storedTime = await AsyncStorage.getItem('timer');
    if (!storedTime) return;

    const elapsed = Date.now() - parseInt(storedTime, 10);
    if (elapsed >= TWELVE_HOURS) {
      setIsAvailable(true);
      setTimeLeft(0);
    } else {
      setTimeLeft(TWELVE_HOURS - elapsed);
    }
  };

  const handleStart = async () => {
    const now = Date.now().toString();
    await AsyncStorage.setItem('timer', now);
    setIsAvailable(false);
    setTimeLeft(TWELVE_HOURS);
  };

  const formatTime = ms => {
    if (ms <= 0) return '00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);

    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${stories[randomIndex].title}
${stories[randomIndex].story}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Daily Story</Text>
          <GradientContainer style={{ borderRadius: 22 }}>
            <View style={styles.timerContainer}>
              <Image source={require('../../assets/icons/timer.png')} />
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            </View>
          </GradientContainer>
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
                <GradientContainer borderStyles={{ top: -60 }}>
                  <View style={styles.jokeContainer}>
                    <Text style={styles.containerTitle}>
                      {stories[randomIndex].title}
                    </Text>
                    <Text style={styles.joke}>
                      {stories[randomIndex].story}
                    </Text>
                  </View>
                </GradientContainer>
                <View style={{ top: -50 }}>
                  <GragientButton
                    colors={['#F5AB01', '#E97F01']}
                    image={require('../../assets/images/components/share.png')}
                    onPress={() => {
                      handleShare();
                    }}
                  />
                </View>
              </View>
            </View>
          ) : (
            <>
              <Image source={require('../../assets/images/dailyStory.png')} />
              <Text style={styles.subtitle}>
                Tap below to get the daily joke-store
              </Text>
              <View style={{ width: '80%', marginTop: 21 }}>
                <GragientButton
                  isDisabled={!isAvailable}
                  colors={
                    !isAvailable
                      ? ['#3E1C08', '#18110C']
                      : ['#F5AB01', '#E97F01']
                  }
                  image={require('../../assets/images/components/getNow.png')}
                  onPress={() => {
                    setShowJokes(true), handleStart();
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
  videoWrap: {
    overflow: 'hidden',
    borderRadius: 14,
    width: '100%',
    height: height * 0.42,
    marginTop: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  subtitle: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'RubikOne-Regular',
    fontSize: 18,
    color: '#FFCE68',
    textAlign: 'center',
    marginBottom: 10,
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
    marginTop: 15,
    minHeight: 75,
  },
  buttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  timerContainer: {
    width: 104,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  timerText: {
    fontFamily: 'RubikOne-Regular',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Daily;
