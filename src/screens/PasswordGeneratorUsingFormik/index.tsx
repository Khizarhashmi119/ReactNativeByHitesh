import { Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as yup from 'yup';

type TValues = {
  passwordLength: string;
  isLowercaseCharactersIncluded: boolean;
  isUppercaseCharactersIncluded: boolean;
  isDigitsCharactersIncluded: boolean;
  isSpecialCharactersIncluded: boolean;
};

const ValuesValidationSchema = yup.object().shape({
  passwordLength: yup
    .number()
    .min(4, 'Should be min of 4 chars')
    .max(20, 'Should be max of 20 chars')
    .required('Length is required'),
});

const PasswordGeneratorUsingFormik = (): React.JSX.Element => {
  const [password, setPassword] = useState('');

  const initValues: TValues = {
    passwordLength: '',
    isLowercaseCharactersIncluded: true,
    isUppercaseCharactersIncluded: false,
    isDigitsCharactersIncluded: false,
    isSpecialCharactersIncluded: false,
  };

  const generateCharactersForPassword = (values: TValues) => {
    const {
      isDigitsCharactersIncluded,
      isLowercaseCharactersIncluded,
      isSpecialCharactersIncluded,
      isUppercaseCharactersIncluded,
    } = values;

    let characters = '';

    if (isLowercaseCharactersIncluded) {
      characters += 'abcdefghijklmnopqrstuvwxyz';
    }

    if (isUppercaseCharactersIncluded) {
      characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    if (isDigitsCharactersIncluded) {
      characters += '0123456789';
    }

    if (isSpecialCharactersIncluded) {
      characters += '`~!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?';
    }

    return characters;
  };

  const generatePassword = (characters: string, passwordLength: number) => {
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      const character = characters.at(characterIndex);
      password += character;
    }

    return password;
  };

  const resetPassword = () => setPassword('');

  const handleSubmit: (
    values: TValues,
    formikHelpers: FormikHelpers<TValues>,
  ) => void | Promise<any> = (values) => {
    const length = +values.passwordLength;
    const characters = generateCharactersForPassword(values);
    const password = generatePassword(characters, length);
    setPassword(password);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Password Generator</Text>
        <Formik
          initialValues={initValues}
          validationSchema={ValuesValidationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <View>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Password length</Text>
                  {props.errors.passwordLength && (
                    <Text style={styles.errorText}>
                      {props.errors.passwordLength}
                    </Text>
                  )}
                </View>
                <TextInput
                  style={styles.inputStyle}
                  value={props.values.passwordLength}
                  placeholder="Ex. 8"
                  keyboardType="numeric"
                  onChangeText={props.handleChange('passwordLength')}
                />
              </View>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text>Include lowercase</Text>
                </View>
                <BouncyCheckbox
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={() =>
                    props.setFieldValue(
                      'isLowercaseCharactersIncluded',
                      !props.values.isLowercaseCharactersIncluded,
                    )
                  }
                  isChecked={props.values.isLowercaseCharactersIncluded}
                  disableBuiltInState
                />
              </View>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text>Include uppercase</Text>
                </View>
                <BouncyCheckbox
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={() =>
                    props.setFieldValue(
                      'isUppercaseCharactersIncluded',
                      !props.values.isUppercaseCharactersIncluded,
                    )
                  }
                  isChecked={props.values.isUppercaseCharactersIncluded}
                  disableBuiltInState
                />
              </View>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text>Include digits</Text>
                </View>
                <BouncyCheckbox
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={() =>
                    props.setFieldValue(
                      'isDigitsCharactersIncluded',
                      !props.values.isDigitsCharactersIncluded,
                    )
                  }
                  isChecked={props.values.isDigitsCharactersIncluded}
                  disableBuiltInState
                />
              </View>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text>Include special characters</Text>
                </View>
                <BouncyCheckbox
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={() =>
                    props.setFieldValue(
                      'isSpecialCharactersIncluded',
                      !props.values.isSpecialCharactersIncluded,
                    )
                  }
                  isChecked={props.values.isSpecialCharactersIncluded}
                  disableBuiltInState
                />
              </View>
              <View style={styles.formActions}>
                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={() => {
                    props.handleSubmit();
                  }}
                  disabled={!props.isValid}
                >
                  <Text style={styles.primaryBtnTxt}>Generate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.secondaryBtn}
                  onPress={() => {
                    props.handleReset();
                    resetPassword();
                  }}
                >
                  <Text style={styles.secondaryBtnTxt}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
      {password && (
        <View style={[styles.card, styles.cardElevated]}>
          <Text style={styles.description}>Long Press to copy</Text>
          <Text style={styles.generatedPassword} selectable>
            {password}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default PasswordGeneratorUsingFormik;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141e46',
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});
