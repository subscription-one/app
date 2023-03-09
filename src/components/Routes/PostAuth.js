import React, {useEffect, useContext} from 'react';
import {AuthContext} from '../AuthProvider';
import {Text, ScrollView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

function Profile() {
  const {isAuthenticated, session, sessionToken, setSession} =
    useContext(AuthContext);
  const logout = () => {
    storage.clearAll();
    setSession(null);
  };
  const {name: {first = String(session.identity.id)} = {}} =
    session.identity.traits;
  return (
    <ScrollView>
      <Button onPress={logout}>Logout</Button>
      <Text>
        Welcome Back {first}
        Your Data
        {JSON.stringify(session.identity.traits || '{}', null, 2)}
        Session Token: {sessionToken}
        {
          //logger.info('Session Token :', sessionToken)
        }
        {JSON.stringify(session || '{}', null, 2)}
      </Text>
    </ScrollView>
  );
}

const Tab = createBottomTabNavigator();

function PostAuth() {
  const navigation = useNavigation();
  const {isAuthenticated, session, sessionToken, setSession} =
    useContext(AuthContext);
  const logout = () => {
    storage.clearAll();
    setSession(null);
  };
  useEffect(() => {
    if (!isAuthenticated || !session || !sessionToken) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation, session, sessionToken]);
  /*const {name: {first = String(session.identity.id)} = {}} =
    session.identity.traits;*/
  if (!isAuthenticated || !session) {
    return null;
  }
  const {name: {first = String(session.identity.id)} = {}} =
    session.identity.traits;

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home3" component={Home} />
      <Tab.Screen name="Profile" component={Profile} options={{}} />
    </Tab.Navigator>
  );
}

export default PostAuth;
