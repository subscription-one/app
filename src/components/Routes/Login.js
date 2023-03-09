import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput as Input, Button} from 'react-native-paper';
import {AuthContext} from '../AuthProvider';
import {useFocusEffect} from '@react-navigation/native';
import {ProjectContext} from '../ProjectProvider';
import {newKratosSdk} from '../../helpers/sdk';
import {getNodeId, handleFormSubmitError} from '../../helpers/form';
/*import {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
} from '@ory/kratos-client';*/

const Login = ({navigation, route}) => {
  const {setSession, session, sessionToken} = useContext(AuthContext);
  const [flow, setFlow] = useState(undefined);
  const {project} = useContext(ProjectContext);
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
  const initializeFlow = () =>
    newKratosSdk(project)
      .initializeSelfServiceLoginFlowWithoutBrowser(
        route.params.refresh,
        route.params.aal,
        sessionToken,
      )
      .then(response => {
        const {data: flow} = response;
        // The flow was initialized successfully, let's set the form data:
        setFlow(flow);
      })
      .catch(console.error);

  useFocusEffect(
    React.useCallback(() => {
      initializeFlow();
      return () => {
        setFlow(undefined);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project]),
  );

  function onSubmit(payload) {
    flow
      ? newKratosSdk(project)
          .submitSelfServiceLoginFlow(flow.id, payload, sessionToken)
          .then(({data}) => Promise.resolve(data))
          // Looks like everything worked and we have a session!
          .then(session => {
            setSession(session);
            setTimeout(() => {
              navigation.navigate('PostAuth');
            }, 100);
          })
          .catch(handleFormSubmitError(setFlow, initializeFlow))
      : Promise.resolve();
  }
  const onSubmitPress = () => {
    //console.log('OnSubmitPress : ', key);
    //change payload to value derived from  flow
    const payload = {
      identifier: state.email,
      csrf_token: '',
      method: 'password',
      password: state.password,
    };
    //console.log('Payload : ', payload);
    onSubmit(payload);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login </Text>
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
        value={state.password}
        onChangeText={handlePasswordChange}
      />
      <Text style={styles.errorText}>
        {/*console.log('Check :', flow?.ui.nodes)
         */}
        {flow?.ui?.nodes.map(element => {
          if (element.messages.length > 0) {
            return element?.messages[0].text;
          }
        })}
        {flow?.ui?.messages?.[0]?.text}
      </Text>

      <Button style={styles.button} mode="contained" onPress={onSubmitPress}>
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
  errorText: {
    fontSize: 15,
    color: 'red',
  },
  button: {
    marginTop: 10,
  },
});
