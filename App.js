// App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Route from './src/navigations/Route';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <View style={styles.container}>
       <Provider store={store}>
       <Route />
    </Provider>
    <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // Add any other styles here
  },
});

export default App;
