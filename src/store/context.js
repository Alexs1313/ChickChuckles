import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [favoritesJokes, setFavoritesJokes] = useState([]);

  const [joke, setJoke] = useState(null);

  // daily blooms

  const getFavoritesJokes = async () => {
    const stored = await AsyncStorage.getItem('favorites');
    if (stored) {
      setFavoritesJokes(JSON.parse(stored));
    }
  };

  const removeJoke = async selectedBloom => {
    const jsonValue = await AsyncStorage.getItem('favorites');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item !== selectedBloom);

    setFavoritesJokes(filtered);
    await AsyncStorage.setItem('favorites', JSON.stringify(filtered));
  };

  const value = {
    getFavoritesJokes,
    favoritesJokes,
    setFavoritesJokes,
    joke,
    setJoke,
    removeJoke,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
