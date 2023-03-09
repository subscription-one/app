# Pending

Theming
\
Error Boundary
\
If Flash message is needed
add flash in navigation as last compenent(for global)
\
<https://www.npmjs.com/package/react-native-flash-message>
\
Memoization to optimise performance

# Don't

    Don't upgrade above Axios 1.0 till https://github.com/facebook/react-native/issues/34868 is resolved


    Dont remove import react-native-url-polyfill/auto from index.js
    https://stackoverflow.com/questions/62183745/url-pathname-or-url-searchparams-is-not-a-function-in-android-react-native

# Pending

    Rendering error and elements using flow in Register.js

# Technical Debt

    In Register/Login
        add option to view password
        add option to view email
        Improve code of rendering of error message
    After register/login/logout delete gcredentials from key value storage using react-native-mmkv
    Merge key value store and context global api
    shift scope url and iosclient id to config file from Home.js

# Idea Bucket

    Multiple Email support
