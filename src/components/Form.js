import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput, Button, Switch, HelperText} from 'react-native-paper';

import {useForm, Controller, SubmitHandler} from 'react-hook-form';

const Form = () => {
  const {control, errors, formState, handleSubmit} = useForm({
    mode: 'onChange',
  });

  const submit = data => console.log(data);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        defaultValue=""
        name="name"
        render={({onChange, onBlur, value}) => (
          <>
            <TextInput
              label="Name"
              style={styles.input}
              value={value}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
            />
            {
              //<HelperText type="error">{errors.name?.message}</HelperText>
            }
          </>
        )}
      />
      <Controller
        control={control}
        name="surname"
        defaultValue=""
        render={({onBlur, onChange, value}) => (
          <>
            <TextInput
              label="Last Name"
              style={styles.input}
              onBlur={onBlur}
              value={value}
              onChangeText={value => onChange(value)}
            />
            {
              //<HelperText type="error">{errors.surname?.message}</HelperText>
            }
          </>
        )}
      />
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({onBlur, onChange, value}) => (
          <>
            <TextInput
              value={value}
              label="Email"
              style={styles.input}
              onBlur={onBlur}
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={value => onChange(value)}
            />
            {
              // <HelperText type="error">{errors.email?.message}</HelperText>
            }
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({onBlur, onChange, value}) => (
          <>
            <TextInput
              value={value}
              label="Password"
              style={styles.input}
              onBlur={onBlur}
              secureTextEntry
              textContentType="password"
              onChangeText={value => onChange(value)}
            />
          </>
        )}
      />
      {/*<HelperText type="error">{errors.password?.message}</HelperText>*/}
      <View style={styles.row}>
        <Text>Terms Accept</Text>
        <Controller
          control={control}
          defaultValue={false}
          name="termsAccepted"
          render={({value, onChange}) => (
            <>
              <Switch value={value} onValueChange={value => onChange(value)} />
            </>
          )}
        />
      </View>
      {
        //<HelperText type="error">{errors}.termsAccepted?.message}</HelperText>}
      }
      <Button
        mode="contained"
        onPress={handleSubmit(submit)}
        disabled={!formState.isValid}>
        Submit
      </Button>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', marginHorizontal: 30},
  input: {marginVertical: 5},
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
});
