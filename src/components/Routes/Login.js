import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Not Authenticatedaaaaaaaaaaaa </Text>
    </View>
  );
};

export default Login;

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
