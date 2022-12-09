import React, {useEffect, useContext} from 'react';
import {AuthContext} from '../AuthProvider';
import {Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Home() {
  const navigation = useNavigation();
  const {isAuthenticated, session, sessionToken} = useContext(AuthContext);
  useEffect(() => {
    if (!isAuthenticated || !session || !sessionToken) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, session, sessionToken]);
  /*const {name: {first = String(session.identity.id)} = {}} =
    session.identity.traits;*/
  if (!isAuthenticated || !session) {
    return null;
  }
  const {name: {first = String(session.identity.id)} = {}} =
    session.identity.traits;

  return (
    <ScrollView>
      <Text>
        Welcome Back {first}
        Your Data
        {JSON.stringify(session.identity.traits || '{}', null, 2)}
        Session Token: {sessionToken}
        {JSON.stringify(session || '{}', null, 2)}
      </Text>
    </ScrollView>
  );
}

export default Home;
