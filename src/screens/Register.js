import { StyleSheet, Text, TextInput, View, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import MyButton from '../components/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/auth';
// Adjust the import path as necessary

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber,setMobileNumber]=useState(null)
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = () => {
    if (!name || !mobileNumber || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    dispatch(registerUser({name,mobileNumber,email,password}))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Registration successful!');
      })
      .catch((err) => {
        Alert.alert('Error', err.error || 'Registration failed.');
        // dispatch(clearUserError()); // Clear error after showing alert
      });
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        value={name}
        placeholder="Enter Name"
        onChangeText={(text) => setName(text)}
        style={styles.input}
        placeholderTextColor="grey"
        autoCapitalize="none"
      />
      <TextInput
        value={mobileNumber}
        placeholder="Enter Mobile Number"
        onChangeText={(text) => setMobileNumber(text)}
        style={styles.input}
        placeholderTextColor="grey"
        autoCapitalize="none"
      />
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
        onChangeText={(text) =>setPassword(text)}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="grey"
      />
      <MyButton title="Register" onPress={handleRegister} />
    </View>
    </ScrollView>
  );
};

export default Register;

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
});
