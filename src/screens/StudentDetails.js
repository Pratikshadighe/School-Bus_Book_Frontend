import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
// import { Card } from 'react-native-paper'; // You might need to install react-native-paper for the Card component

const StudentDetails = () => {
  const route = useRoute();
  const { item } = route.params;
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.headerText}>Mobile Number:</Text>
          <Text style={styles.detailText}>{item.mobileNumber}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.headerText}>Total Amount:</Text>
          <Text style={styles.detailText}>${item.amount}</Text>
        </View>
      </View>
      <View style={styles.paymentsContainer}>
        <Text style={styles.subTitle}>Payment History</Text>
        {item.payments?.map((payment, index) => (
          <View key={index} style={styles.paymentCard}>
            <View style={styles.paymentContent}>
              <Text style={styles.headerText}>Payment Date:</Text>
              <Text style={styles.detailText}>{new Date(payment.paymentDate).toLocaleDateString()}</Text>
            </View>
            <View style={styles.paymentContent}>
              <Text style={styles.headerText}>Payment Method:</Text>
              <Text style={styles.detailText}>{payment.paymentMethod}</Text>
            </View>
            
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default StudentDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
  },
  cardContent: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  detailText: {
    fontSize: 16,
    color: '#333',
  },
  paymentsContainer: {
    marginTop: 20,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  paymentCard: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
  },
  paymentContent: {
    marginBottom: 10,
  },
});
