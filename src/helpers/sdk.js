import {Configuration, V0alpha2Api} from '@ory/kratos-client';
//import Constants from 'expo-constants';
import React from 'react';
import axiosFactory from 'axios';
import {resilience} from './axios';
import {KRATOS_URL} from '@env';

const axios = axiosFactory.create();
resilience(axios); // Adds retry mechanism to axios
// canonicalize removes the trailing slash from URLs.
const canonicalize = (url = '') => url.replace(/\/+$/, '');
// This value comes from ../../app.config.js
//KRATOS_URL = 'http://127.0.0.1:4433';
//'https://playground.projects.oryapis.com/';
//'http://127.0.0.1:4433';
export const kratosUrl = (project = 'playground') => {
  console.log('KRATOS_URL', KRATOS_URL);
  const url = canonicalize(KRATOS_URL) || '';

  if (url.indexOf(KRATOS_URL) == -1) {
    // The URL is not from Ory, so let's just return it.
    return url;
  }
  // We handle a special case where we allow the project to be changed
  // if you use an ory project.
  return url.replace('playground.', `${project}.`);
};

export const newKratosSdk = project =>
  new V0alpha2Api(
    new Configuration({
      basePath: kratosUrl(project),
      baseOptions: {
        // Setting this is very important as axios will send the CSRF cookie otherwise
        // which causes problems with ORY Kratos' security detection.
        withCredentials: false,
        // Timeout after 5 seconds.
        timeout: 10000,
      },
    }),
    '',
    // Ensure that we are using the axios client with retry.
    axios,
  );
