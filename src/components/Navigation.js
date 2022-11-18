import {StackActions} from '@react-navigation/native';
import React, {useContext} from 'react';
import {AuthContext} from './AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Routes/Login';
import Register from './Routes/Register';
import {View, Text} from 'react-native';

const Stack = createStackNavigator();

export default () => {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        {isAuthenticated ? (
          <Stack.Screen name="Auth" component={Register} />
        ) : (
          <Stack.Screen name="notAuth" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
