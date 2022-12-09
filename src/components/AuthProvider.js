import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import {newKratosSdk} from '../helpers/sdk';
import {ProjectContext} from './ProjectProvider';
import {
  getAuthenticatedSession,
  killAuthenticatedSession,
  setAuthenticatedSession,
} from '../helpers/auth';

export const AuthContext = createContext({
  setSession: () => {},
  syncSession: () => Promise.resolve(),
  didFetch: false,
  isAuthenticated: false,
});

export default ({children}) => {
  const {project} = useContext(ProjectContext);
  const [sessionContext, setSessionContext] = useState();
  useEffect(() => {
    getAuthenticatedSession().then(syncSession);
  }, []);
  const syncSession = auth => {
    if (!auth) {
      return setAuth(null);
    }
    return newKratosSdk(project)
      .toSession(auth.session_token)
      .then(({data: session}) => {
        setSessionContext({session, session_token: auth.session_token});
        return Promise.resolve();
      })
      .catch(err => {
        if (
          ((_a = err.response) === null || _a === void 0
            ? void 0
            : _a.status) === 401
        ) {
          // user no longer authenticated
        } else {
          console.error(err);
        }
        setSessionContext(null);
      });
  };
  const setAuth = session => {
    if (!session) {
      return killAuthenticatedSession().then(() => setSessionContext(session));
    }
    setAuthenticatedSession(session).then(() => setSessionContext(session));
  };
  if (sessionContext === undefined) {
    return null;
  }
  return (
    <AuthContext.Provider
      value={{
        // The session information
        session: sessionContext?.session,
        sessionToken: sessionContext?.session_token,

        // Is true when the user has a session
        isAuthenticated: Boolean(sessionContext?.session_token),

        // Fetches the session from the server
        syncSession: () => getAuthenticatedSession().then(syncSession),

        // Allows to override the session
        setSession: setAuth,

        // Is true if we have fetched the session.
        didFetch: true,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
