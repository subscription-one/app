import {StackActions} from '@react-navigation/native';
import React, {useContext} from 'react';
import {AuthContext} from './AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Routes/Login';
import Register from './Routes/Register';
import PostAuth from './Routes/PostAuth';
import Settings from './Routes/Settings';
import {View, Text} from 'react-native';
import Form from './Form';

const Stack = createStackNavigator();

export default () => {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="PostAuth" component={PostAuth} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Registration" component={Register} />
        <Stack.Screen name="Login" component={Login} initialParams={{}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
