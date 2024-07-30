import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

const MyButton = ({title, onPress, loading}) => {
  console.log("loading",loading)
  return (
    <Pressable onPress={onPress} style={styles.container}>
      
      {loading ? <ActivityIndicator size="small" color={'white'} /> : <Text style={styles.title}>{title}</Text>}
    </Pressable>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightcoral',
    borderRadius: 25,
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // gap: 10,
    marginTop:20
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
});
