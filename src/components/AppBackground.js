import LinearGradient from 'react-native-linear-gradient';

const AppBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={['#18110C', '#3E1C08']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0.4 }}
      end={{ x: 0, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

export default AppBackground;
