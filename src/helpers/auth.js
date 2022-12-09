import AsyncStore from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const userSessionName = 'user_session';

export const getAuthenticatedSession = () => {
  const parse = sessionRaw => {
    if (!sessionRaw) {
      return null;
    }
    // sessionRaw is a JSON String that needs to be parsed.
    return JSON.parse(sessionRaw);
  };
  let p = AsyncStore.getItem(userSessionName);
  if (Platform.OS !== 'web') {
    // We can use SecureStore if not on web instead!
    p = SecureStore.getItemAsync(userSessionName);
  }
  return p.then(parse);
};

export const setAuthenticatedSession = session => {
  if (!session) {
    return killAuthenticatedSession();
  }
  if (Platform.OS === 'web') {
    // SecureStore is not available on the web platform. We need to use AsyncStore
    // instead.
    return AsyncStore.setItem(userSessionName, JSON.stringify(session));
  }
  return (
    SecureStore
      // The SecureStore only supports strings so we encode the session.
      .setItemAsync(userSessionName, JSON.stringify(session))
  );
};

export const killAuthenticatedSession = () => {
  if (Platform.OS === 'web') {
    // SecureStore is not available on the web platform. We need to use AsyncStore
    // instead.
    return AsyncStore.removeItem(userSessionName);
  }
  return SecureStore.deleteItemAsync(userSessionName);
};
