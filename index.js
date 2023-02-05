/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-url-polyfill/auto';
//import 'react-native-gesture-handler';
//Don't remove react-native-url-polyfill/auto app will break

AppRegistry.registerComponent(appName, () => App);
