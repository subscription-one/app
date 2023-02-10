import React, {useState} from 'react';
import {Text, ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

function NotGAuthorised({setGAuthorised}) {
  const gSign = () => {
    GoogleSignin.configure({
      //androidClientId: 'ADD_YOUR_ANDROID_CLIENT_ID_HERE',
      scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
      iosClientId:
        '7198244606-pe0il2s26m4jl74ark3r5aek3cfvg82p.apps.googleusercontent.com',

      //'ADD_YOUR_iOS_CLIENT_ID_HERE',
    });
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              console.log(JSON.stringify(userInfo));
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
    setGAuthorised(true);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Please Authenticate to sync your subscription data</Text>
      <Button onPress={gSign}>Sign in with Google </Button>
    </View>
  );
}

function GAuthorised() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Fetching subscriptions!</Text>
    </View>
  );
}

function Home() {
  //How to fetch data from backend is he has synced his gmail or not?
  //fetch("localhost:3000/make_request?maybe_some_query_param=whatever_you_are_translating")

  //Source: https://stackoverflow.com/questions/69977299
  const [gAuthorised, setGAuthorised] = useState(false);

  return (
    <>
      {gAuthorised ? (
        <GAuthorised />
      ) : (
        <NotGAuthorised setGAuthorised={setGAuthorised} />
      )}
    </>
  );
}

export default Home;
