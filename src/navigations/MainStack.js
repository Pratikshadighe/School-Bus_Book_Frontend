import React from 'react';

import TabRoutes from './TabRoutes';
// import AddStudentModal from '../components/AddStudentModal';
import AddStudentBasicDetails from '../components/AddStudentModal';
import AddStudentPaymentDetails from '../components/AddPaymentDetails';
import EditStudentModal from '../components/EditStudentModal';
import StudentDetails from '../screens/StudentDetails';

export default function (Stack) {
  return (
    <>
      <Stack.Screen name="Home" component={TabRoutes} />
      <Stack.Screen name="AddStudent" component={AddStudentBasicDetails} />
      <Stack.Screen
        name="AddStudentPaymentDetails"
        component={AddStudentPaymentDetails}
        options={{title: 'Payment Details'}}
      />
      <Stack.Screen
        name="EditStudentDetails"
        component={EditStudentModal}
        options={{title: 'Student Details'}}
      />
        <Stack.Screen
        name="StudentDetails"
        component={StudentDetails}
        options={{title: 'Student Details'}}
      />
    </>
  );
}
