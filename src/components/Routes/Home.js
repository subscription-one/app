import React, {useState, useEffect} from 'react';
import {Text, ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const axios = require('axios');
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

//shift MMKVStorage Loader Initialize to main file

function NotGAuthorised({setGAuthorised}) {
  const gSign = () => {
    GoogleSignin.configure({
      //androidClientId: 'ADD_YOUR_ANDROID_CLIENT_ID_HERE',
      scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
      iosClientId:
        '7198244606-pe0il2s26m4jl74ark3r5aek3cfvg82p.apps.googleusercontent.com',
      //shift scope url and iosclient id to config file
      //'ADD_YOUR_iOS_CLIENT_ID_HERE',
    });
    storage.clearAll();

    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              console.log(userInfo);
              setGAuthorised(true);
              storage.clearAll();
              storage.set('gCredentials', JSON.stringify(userInfo));
            })
            .catch(e => {
              console.log('ERROR IS 1: ' + JSON.stringify(e));
            });
        }
      })
      .catch(e => {
        console.log('ERROR IS 2: ' + JSON.stringify(e));
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Please Authenticate to sync your subscription data</Text>
      <Button onPress={gSign}>Sign in with Google </Button>
    </View>
  );
}

function GAuthorised() {
  const fetchData = () => {
    const jsonUser = storage.getString('gCredentials'); // { 'username': 'Marc', 'age': 21 }
    const userObject = JSON.parse(jsonUser);
    //console.log('UserObject : ', userObject);
    axios
      .post('http://localhost:3000/api/v1/data-parser', {
        params: {
          USEROBJ: userObject,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  useEffect(fetchData, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Fetching subscriptions!</Text>
    </View>
  );
}

function Home() {
  const jsonUser = storage.getString('gCredentials');
  const [gAuthorised, setGAuthorised] = useState(jsonUser);

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
