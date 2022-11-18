import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Register = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Authenticated</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  text: {
    fontSize: 30,
  },
});

export default Register;
