import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, Platform } from 'react-native';
import MyButton from './MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { addPayment, createStudent, getStudentDetails } from '../redux/actions/student';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import {formatDate } from 'date-fns';
import Toast from 'react-native-toast-message';
const paymentOptions = ['cash', 'online'];

const AddStudentPaymentDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item} = route.params; // Get params from previous screen
  const { students, loading } = useSelector((state) => state.student);
  const [paid, setPaid] = useState(false);
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [existingPayment, setExistingPayment] = useState(null);

  const dispatch = useDispatch();
console.log("item",students)

  useEffect(()=>{
  dispatch(getStudentDetails(item._id))
  },[])

  useEffect(() => {
    if (students) {
      const formattedDate = formatDate(paymentDate, 'yyyy-MM');
      const paymentForMonth = students?.payments?.find(payment => formatDate(new Date(payment.paymentDate), 'yyyy-MM') === formattedDate);
      setExistingPayment(paymentForMonth);
    }
  }, [students, paymentDate]);

  const handleSubmit = () => {
    if (!paymentDate || !paymentMethod) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "Please fill out all fields"
      });
      return;
    }
  
    if (existingPayment) {
     
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "Payment details already exist for this month"
      });
      return;
    }
    dispatch(addPayment({ studentId: item._id, 
      paid: true,
      paymentDate, // Date object is already set
      paymentMethod,
     }));
    navigation.goBack(); // Navigate back to the previous screen
  };
  

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || paymentDate;
    setShowDatePicker(Platform.OS === 'ios');
    setPaymentDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Payment Date</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput
            style={styles.input}
            value={paymentDate.toLocaleDateString()}
            editable={false} // Make the TextInput read-only
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={paymentDate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}

        <Text style={styles.label}>Payment Method</Text>
        <SelectList
          placeholder={"Select"}
          style={styles.input}
          boxStyles={styles.input}
          dropdownStyles={{ borderWidth: 0 }}
          setSelected={(val) => setPaymentMethod(val)}
          data={paymentOptions}
          save="value"
          search={false}
        />

{existingPayment ? (
          <Text style={styles.errorText}>Payment details already exist for this month</Text>
        ) : (
          <MyButton title="Submit" style={styles.btn} onPress={handleSubmit} />
        )}
      </View>
    </ScrollView>
  );
};

export default AddStudentPaymentDetails;

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
