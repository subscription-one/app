import {showMessage} from 'react-native-flash-message';

export function camelize(str) {
  return str.replace(/_([a-z])/g, g => g[1].toUpperCase());
}
export function isUiNodeAnchorAttributes(pet) {
  return pet.href !== undefined;
}
export function isUiNodeImageAttributes(pet) {
  return pet.src !== undefined;
}
export function isUiNodeInputAttributes(pet) {
  return pet.name !== undefined;
}
export function isUiNodeTextAttributes(pet) {
  return pet.text !== undefined;
}

export function getNodeId({attributes}) {
  if (isUiNodeInputAttributes(attributes)) {
    return attributes.name;
  } else {
    return attributes.id;
  }
}
export function getNodeValue({attributes}) {
  if (isUiNodeInputAttributes(attributes)) {
    return attributes.value;
  }
  return '';
}
export const getNodeTitle = ({attributes, meta}) => {
  var _a, _b;
  if (isUiNodeInputAttributes(attributes)) {
    if (
      (_a = meta === null || meta === void 0 ? void 0 : meta.label) === null ||
      _a === void 0
        ? void 0
        : _a.text
    ) {
      return meta.label.text;
    }
    return attributes.name;
  }
  if (
    (_b = meta === null || meta === void 0 ? void 0 : meta.label) === null ||
    _b === void 0
      ? void 0
      : _b.text
  ) {
    return meta.label.text;
  }
  return '';
};
export function handleFlowInitError(err) {
  return;
}
export function handleFormSubmitError(setConfig, initialize, logout) {
  return err => {
    var _a;
    if (err.response) {
      switch (err.response.status) {
        case 400:
          if (typeof err.response.data.error === 'object') {
            const ge = err.response.data;
            showMessage({
              message: `${ge.message}: ${ge.reason}`,
              type: 'danger',
            });
            return Promise.resolve();
          }
          console.debug(
            `Form validation failed : ${JSON.stringify(err.response.data)}`,
          );
          setConfig(err.response.data);
          return Promise.resolve();
        case 404:
        case 410:
          // This happens when the flow is, for example, expired or was deleted.
          // We simply re-initialize the flow if that happens!
          console.debug('Flow could not be found, reloading page.');
          initialize();
          return Promise.resolve();
        case 403:
        case 401:
          if (!logout) {
            console.error(
              `Received unexpected 401/403 status code: `,
              err,
              err.response.data,
            );
            return Promise.resolve();
          }
          // This happens when the privileged session is expired but the user tried
          // to modify a privileged field (e.g. change the password).
          console.warn(
            'The server indicated that this action is not allowed for you. The most likely cause of that is that you modified a privileged field (e.g. your password) but your ORY Kratos Login Session is too old.',
          );
          showMessage({
            message: 'Please re-authenticate before making these changes.',
            type: 'warning',
          });
          logout();
          return Promise.resolve();
      }
    }
    console.error(
      err,
      (_a = err.response) === null || _a === void 0 ? void 0 : _a.data,
    );
    return Promise.resolve();
  };
}
