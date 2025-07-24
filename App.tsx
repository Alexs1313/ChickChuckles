import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import Loader from './src/components/Loader';

import { ContextProvider } from './src/store/context';
import { useEffect, useState } from 'react';

const App = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 4000);
  }, []);

  return (
    <NavigationContainer>
      <ContextProvider>
        {loader ? <StackNavigation /> : <Loader />}
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
