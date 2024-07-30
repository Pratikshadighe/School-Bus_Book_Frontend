import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/auth';
import { deleteStudent, getAllStudent } from '../redux/actions/student';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.student);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleAddStudent = () => {
    navigate('AddStudent');
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllStudent());
    }, [])
  );


  const handleDeleteStudent = (studentId) => {
    Alert.alert(
      "Delete Student",
      "Are you sure you want to delete this student?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await dispatch(deleteStudent(studentId));
              // Optionally, refresh the student list after deletion
              dispatch(getAllStudent());
            } catch (error) {
              console.error("Error deleting student:", error);
            }
          }
        }
      ]
    );
  };

  const logoutHandler = async () => {
    try {
      await dispatch(logout());
      navigate('Login');
    } catch (error) {
      console.log("Error during logout: ", error);
    }
  };

  const changeMonth = (increment) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + increment));
    setCurrentDate(newDate);
  };

  const filterPaymentsByMonth = (payments) => {
    return payments?.filter(payment => {
      const paymentDate = new Date(payment.paymentDate);
      return paymentDate.getMonth() === currentDate.getMonth() && paymentDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const renderItem = ({ item }) => {
    const payments = filterPaymentsByMonth(item.payments);
    return (
      
      <TouchableOpacity
      style={styles.studentItem}
      onPress={() => navigate('StudentDetails', { item })} // Replace 'StudentDetails' with your desired screen
    >
      
        <View style={styles.subContainer}>
          <Text style={styles.columnHeader}>Name:</Text>
          <Text style={styles.studentData}>{item.name}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.columnHeader}>Mobile Number:</Text>
          <Text style={styles.studentData}>{item.mobileNumber}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.columnHeader}>Amount:</Text>
          <Text style={styles.studentData}>{item.amount}</Text>
        </View>
        {payments?.map((payment, index) => (
          <View key={index}>
            <View style={styles.subContainer}>
              <Text style={styles.columnHeader}>Payment Date:</Text>
              <Text style={styles.studentData}>{new Date(payment.paymentDate).toLocaleDateString()}</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.columnHeader}>Payment Method:</Text>
              <Text style={styles.studentData}>{payment.paymentMethod}</Text>
            </View>
          </View>
        ))}
       
        
        <View style={styles.iconContainer}>
         
        <View style={styles.iconWrapper}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigate('AddStudentPaymentDetails', { item })}>
            <Icon name="payment" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Payment</Text>
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigate('EditStudentDetails', { item })}>
            <Icon name="edit" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Edit</Text>
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity style={styles.iconButton} onPress={() => handleDeleteStudent(item._id)}>
            <Icon name="delete" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Delete</Text>
        </View>
        </View>
        </TouchableOpacity>
    );
  };

  const currentMonthYear = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Students</Text>
          <TouchableOpacity onPress={logoutHandler} style={styles.logoutButton}>
            <Icon name="logout" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.monthContainer}>
          <Pressable style={styles.navButton} onPress={() => changeMonth(-1)}>
            <Icon name="chevron-left" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.currentMonth}>{currentMonthYear}</Text>
          <Pressable style={styles.navButton} onPress={() => changeMonth(1)}>
            <Icon name="chevron-right" size={24} color="#fff" />
          </Pressable>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="lightcoral" />
        ) : (
          <FlatList
            data={students}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        )}
        <Pressable style={styles.addButton} onPress={handleAddStudent}>
          <Icon name="add" size={30} color="#fff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  iconLabel: {
    color: '#333',
    fontSize: 12,
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'lightcoral',
  },
  logoutButton: {
    backgroundColor: 'lightcoral',
    padding: 10,
    borderRadius: 5,
  },
  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentMonth: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'lightcoral',
  },
  navButton: {
    backgroundColor: 'lightcoral',
    padding: 10,
    borderRadius: 5,
  },
  listContainer: {
    paddingBottom: 100,
  },
  studentItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  columnHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
  },
  studentData: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
    marginTop: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'lightcoral',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth:1,
    borderColor:"lightgray",
  },
  iconButton: {
    backgroundColor: 'lightcoral',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop:10
  },
});
