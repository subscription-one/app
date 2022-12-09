/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Navigation from './src/components/Navigation';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Register from './src/components/Routes/Register';
import {Provider as PaperProvider} from 'react-native-paper';
import AuthProvider from './src/components/AuthProvider';

const Stack = createStackNavigator();

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'black',
          }}
          edges={['top', 'left', 'right']}>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
