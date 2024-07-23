import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Stack = createNativeStackNavigator();

export default function Route() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [token, setToken] = useState(null);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
       
        setToken(storedToken);
      } catch (error) {
        console.error('Failed to load token from AsyncStorage:', error);
      } finally {
        setAppLoading(false);
      }
    };

    loadToken();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setToken(null);
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? MainStack(Stack) : AuthStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
