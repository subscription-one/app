import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput as Input, Button} from 'react-native-paper';

const Login = ({navigation}) => {
  const [text, setText] = React.useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login </Text>
      <Input label="Email" mode="outlined" activeOutlineColor="white" />
      <Input
        label="Password"
        mode="outlined"
        activeOutlineColor="white"
        secureTextEntry
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => console.log('Trying Login')}>
        Login
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('Registration')}>
        Register
      </Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
  button: {
    marginTop: 10,
  },
});
