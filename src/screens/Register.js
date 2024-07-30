import { StyleSheet, Text, TextInput, View, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyButton from '../components/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/auth';
import Toast from 'react-native-toast-message';
import { clearUserError } from '../redux/reducers/authSlice';
// Adjust the import path as necessary

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber,setMobileNumber]=useState(null)
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  console.log("error",error)

  const handleRegister =async () => {
    if (!name || !mobileNumber || !email || !password) {
     
        Toast.show({
          type: 'error',
          text1: 'Register Error',
          text2: 'All Fields are Required'
        });
      
      return;
    }

    await dispatch(registerUser({name,mobileNumber,email,password}))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Registration successful!');
      })
      .catch((err) => {

       
          Toast.show({
            type: 'error',
            text1: 'Register Error',
            text2: err.message
          });
        
        // dispatch(clearUserError()); // Clear error after showing alert
      });
  };

  useEffect(()=>{
    dispatch(clearUserError());
  },[error])

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
