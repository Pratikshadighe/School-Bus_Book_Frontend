import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import MyButton from './MyButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createStudent, updateStudentDetails } from '../redux/actions/student';
import { useDispatch } from 'react-redux';

const EditStudentModal = () => {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (item) {
      console.log('Received item:', item);
      setName(item.name || '');
      setMobileNumber(item.mobileNumber?.toString() || '');
      setAmount(item.amount?.toString() || '');
    }
  }, [item]);

  const handleNext = () => {
    if (!name || !mobileNumber || !amount) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    const updatedStudent = {
      studentId: item._id,
      name,
      mobileNumber,
      amount,
    };

    dispatch(updateStudentDetails(updatedStudent));
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

export default EditStudentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
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
