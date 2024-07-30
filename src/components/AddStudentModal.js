import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import MyButton from './MyButton';
import { useNavigation } from '@react-navigation/native';
import { createStudent } from '../redux/actions/student';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const AddStudentBasicDetails = () => {
  const navigation = useNavigation();
  const dispatch=useDispatch();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const { students, loading,error } = useSelector((state) => state.student);

  const handleNext = () => {
    if (!name || !mobileNumber || !amount) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "Please fill out all fields"
      });
      return;
    }
    const newStudent = {
      name,
      mobileNumber,
     amount
    };
   
    dispatch(createStudent(newStudent));
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: error
      });
    }
    navigation.goBack();
   
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <MyButton title="Next" style={styles.btn} onPress={handleNext} />
      </View>
    </ScrollView>
  );
};

export default AddStudentBasicDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    color:'black'
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'coral',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  btn: {
    marginTop: 20,
  },
});
