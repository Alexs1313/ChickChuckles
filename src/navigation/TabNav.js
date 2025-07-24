import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, Image, StyleSheet } from 'react-native';

import Categories from '../screens/tab/Categories';
import Generator from '../screens/tab/Generator';
import Saved from '../screens/tab/Saved';
import Daily from '../screens/tab/Daily';

const Tab = createBottomTabNavigator();

const { height } = Dimensions.get('window');

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarActiveTintColor: '#E97F01',
        tabBarInactiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/categories.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Generator"
        component={Generator}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/generator.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/saved.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Daily"
        component={Daily}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/daily.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#17100B',
    borderTopColor: '#F5AB01',
    elevation: 1,
    borderTopWidth: 1,
    overflow: 'hidden',
    borderColor: '#17100B',
    borderWidth: 0.17,
    paddingTop: 30,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    height: height * 0.13,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
});

export default TabNav;
