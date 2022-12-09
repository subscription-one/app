import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {SelfServiceFlow} from '../Ory/Ui';
import {newKratosSdk} from '../../helpers/sdk';
import {getNodeId, handleFormSubmitError} from '../../helpers/form';
import {Platform} from 'react-native';
import {ProjectContext} from '../ProjectProvider';
import {DataTable} from 'react-native-paper';
import {TextInput as Input, Button} from 'react-native-paper';
import {AuthContext} from '../AuthProvider';

const Register = ({navigation}) => {
  const [flow, setConfig] = useState(null);
  const {project} = useContext(ProjectContext);
  //console.log('Project : ', project);
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const handleEmailChange = event => {
    setState({
      ...state,
      ['email']: event,
    });
  };
  const handlePasswordChange = event => {
    setState({
      ...state,
      ['password']: event,
    });
  };

  const {setSession, isAuthenticated} = useContext(AuthContext);
  const initializeFlow = () =>
    newKratosSdk(project)
      .initializeSelfServiceRegistrationFlowWithoutBrowser()
      .then(({data: flow}) => {
        setConfig(flow);
      })
      .catch(console.error);

  useFocusEffect(
    React.useCallback(() => {
      initializeFlow();
      return () => {
        setConfig(undefined);
      };
    }, [project]),
  );

  useEffect(() => {
    console.log('Auth : ', isAuthenticated);

    if (isAuthenticated) {
      navigation.navigate('Home');
    }
  }, [isAuthenticated]);
  if (isAuthenticated) {
    return null;
  }

  const onSubmitPress = () => {
    //console.log('OnSubmitPress : ', key);

    const payload = {
      csrf_token: '',
      method: 'password',
      password: state.password,
      traits: {
        email: state.email,
      },
    };
    console.log('Payload : ', payload);
    onSubmit(payload);
  };
  function onSubmit(payload) {
    console.log('Payload : ', payload);
    flow
      ? newKratosSdk(project)
          .submitSelfServiceRegistrationFlow(flow.id, payload)
          .then(({data}) => {
            if (!data.session_token || !data.session) {
              const err = new Errror(
                'New session after registration is disabled Learn More : https://www.ory.sh/kratos/docs/next/self-service/flows/user-registration#successful-registration',
              );
              return Promise.reject(err);
            }
            return Promise.resolve({
              session: data.session,
              session_token: data.session_token,
            });
          })
          .then(setSession)
          .catch(handleFormSubmitError(setConfig, initializeFlow))
      : Promise.resolve();
  }
  /*const onSubmit = payload =>
    flow
      ? newKratosSdk(project)
          .submitSelfServiceRegistrationFlow(flow.id, payload)
          .then(({data}) => {
            if (!dataTable.session_token || !data.session) {
              const err = new Errror(
                'New session after registration is disabled Learn More : https://www.ory.sh/kratos/docs/next/self-service/flows/user-registration#successful-registration',
              );
              return Promise.reject(err);
            }
            return Promise.resolve({
              session: data.session,
              session_token: data.session_token,
            });
          })
          .then(setSession)
          .catch(handleFormSubmitError(setConfig, initializeFlow))
      : Promise.resolve();*/
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register </Text>
      {/*netInfo.isConnected ? (
        <Text style={styles.text}>Conntected</Text>
      ) : (
        <Text style={styles.text}>Not Connected</Text>
      )*/}
      <Input
        label="Email"
        mode="outlined"
        activeOutlineColor="white"
        value={state.email}
        onChangeText={handleEmailChange}
      />
      <Input
        label="Password"
        mode="outlined"
        activeOutlineColor="white"
        secureTextEntry
        name={'password'}
        value={state.password}
        onChangeText={handlePasswordChange}
      />
      <Button style={styles.button} mode="contained" onPress={onSubmitPress}>
        Register
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
    </View>
  );
};

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

export default Register;
