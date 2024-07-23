import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyButton from '../components/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import validate from '../utils/validator';
import { loginUser } from '../redux/actions/auth';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Home"); // Changed from "/Home" to "Home"
    }
  }, [isAuthenticated]);

  const isValidData = () => {
    const error = validate({
      email,
      password
    });
    if (error) {
      alert(error);
      return false;
    }
    return true;
  }

  const onLogin = () => {
    const isValid = isValidData();
    if (isValid) {
      const formData = { email, password };
      dispatch(loginUser(formData));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        value={email}
        placeholder="Enter Email"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        placeholderTextColor="grey"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        placeholder="Enter Password"
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        placeholderTextColor="grey"
        secureTextEntry
      />
      <MyButton title="Login" onPress={onLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.registerText}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingTop: 150,
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: 36,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'coral',
    paddingHorizontal: 20,
  },
  registerText: {
    fontSize: 16,
    color: 'lightcoral',
    textAlign: 'center',
    marginTop: 10,
  },
});
