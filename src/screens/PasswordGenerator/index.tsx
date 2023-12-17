import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type TFormState = {
  isDigitsIncluded: boolean;
  isLowerCaseCharsIncluded: boolean;
  isSpecialCharsIncluded: boolean;
  isUpperCaseCharsIncluded: boolean;
  password: string;
  passwordLength: string;
  passwordLengthErrorMessage: string;
};

const PasswordGenerator = (): React.JSX.Element => {
  const [formState, setFormState] = useState<TFormState>({
    isDigitsIncluded: false,
    isLowerCaseCharsIncluded: true,
    isSpecialCharsIncluded: false,
    isUpperCaseCharsIncluded: false,
    password: '',
    passwordLength: '',
    passwordLengthErrorMessage: '',
  });

  const {
    isDigitsIncluded,
    isLowerCaseCharsIncluded,
    isSpecialCharsIncluded,
    isUpperCaseCharsIncluded,
    password,
    passwordLength,
    passwordLengthErrorMessage,
  } = formState;

  const handleChangeFormState = <T extends keyof TFormState>(
    key: T,
    value: TFormState[T],
  ) => {
    if (key === 'passwordLength') {
      let errorMessage = '';

      setFormState((prevState) => ({
        ...prevState,
        passwordLengthErrorMessage: errorMessage,
      }));

      if (Number(value) < 6) {
        errorMessage = 'Password must contain min 6 chars';
      } else if (Number(value) > 20) {
        errorMessage = 'Password must contain max 20 chars';
      }

      setFormState((prevState) => ({
        ...prevState,
        passwordLengthErrorMessage: errorMessage,
      }));
    }

    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const generateCharactersForPassword = () => {
    let characters = '';

    if (isLowerCaseCharsIncluded) {
      characters += 'abcdefghijklmnopqrstuvwxyz';
    }

    if (isUpperCaseCharsIncluded) {
      characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    if (isDigitsIncluded) {
      characters += '0123456789';
    }

    if (isSpecialCharsIncluded) {
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

  const handleClickGenerate = () => {
    const characters = generateCharactersForPassword();
    const password = generatePassword(characters, +passwordLength);
    handleChangeFormState('password', password);
  };

  const handleClickResetPassword = () =>
    setFormState({
      isDigitsIncluded: false,
      isLowerCaseCharsIncluded: true,
      isSpecialCharsIncluded: false,
      isUpperCaseCharsIncluded: false,
      password: '',
      passwordLength: '',
      passwordLengthErrorMessage: '',
    });

  const isGeneratePasswordButtonDisabled =
    !(
      isDigitsIncluded ||
      isLowerCaseCharsIncluded ||
      isSpecialCharsIncluded ||
      isUpperCaseCharsIncluded
    ) ||
    !passwordLength ||
    !!passwordLengthErrorMessage;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#141e46" />
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Password Generator</Text>
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Password length</Text>
            {passwordLengthErrorMessage && (
              <Text style={styles.errorMessage}>
                {passwordLengthErrorMessage}
              </Text>
            )}
          </View>
          <TextInput
            style={styles.passwordLengthInput}
            keyboardType="numeric"
            value={passwordLength}
            placeholder="Ex. 8"
            placeholderTextColor="#141e46"
            onChangeText={(value) =>
              handleChangeFormState('passwordLength', value)
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Lowercase characters</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#bb2525' }}
            thumbColor={'#fff5e0'}
            ios_backgroundColor="#767577"
            value={isLowerCaseCharsIncluded}
            onValueChange={(value) =>
              handleChangeFormState('isLowerCaseCharsIncluded', value)
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Uppercase characters</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#bb2525' }}
            thumbColor={'#fff5e0'}
            ios_backgroundColor="#767577"
            value={isUpperCaseCharsIncluded}
            onValueChange={(value) =>
              handleChangeFormState('isUpperCaseCharsIncluded', value)
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Digits</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#bb2525' }}
            thumbColor={'#fff5e0'}
            ios_backgroundColor="#767577"
            value={isDigitsIncluded}
            onValueChange={(value) =>
              handleChangeFormState('isDigitsIncluded', value)
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Special characters</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#bb2525' }}
            thumbColor={'#fff5e0'}
            ios_backgroundColor="#767577"
            value={isSpecialCharsIncluded}
            onValueChange={(value) =>
              handleChangeFormState('isSpecialCharsIncluded', value)
            }
          />
        </View>
        <TouchableOpacity
          style={[
            styles.generatePasswordButton,
            isGeneratePasswordButtonDisabled
              ? styles.disabledGeneratePasswordButton
              : null,
          ]}
          onPress={handleClickGenerate}
          disabled={isGeneratePasswordButtonDisabled}
        >
          <Text style={styles.generatePasswordButtonText}>Generate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleClickResetPassword}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        {password && (
          <View style={styles.passwordContainer}>
            <Text style={styles.password} selectable>
              {password}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141e46',
    flex: 1,
    padding: 16,
  },
  title: {
    color: '#fff5e0',
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  labelContainer: {
    justifyContent: 'center',
    flex: 4,
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
  },
  errorMessage: {
    color: '#bb2525',
    fontWeight: '500',
  },
  passwordLengthInput: {
    backgroundColor: '#fff5e0',
    borderRadius: 5,
    flex: 1,
    color: '#141E46',
    padding: 10,
  },
  generatePasswordButton: {
    alignItems: 'center',
    backgroundColor: '#ff6969',
    borderRadius: 40,
    marginVertical: 24,
    padding: 16,
  },
  disabledGeneratePasswordButton: {
    backgroundColor: '#c9c9c9',
  },
  generatePasswordButtonText: {
    fontSize: 18,
    fontWeight: '500',
  },
  resetButton: {
    alignItems: 'center',
    backgroundColor: '#141E46',
    borderRadius: 40,
    borderColor: '#ff6969',
    borderWidth: 1,
    marginBottom: 24,
    padding: 16,
  },
  resetButtonText: {
    color: '#ff6969',
    fontSize: 18,
    fontWeight: '500',
  },
  passwordContainer: {
    alignItems: 'center',
    backgroundColor: '#fff5e0',
    borderRadius: 5,
    padding: 20,
  },
  password: {
    color: '#141E46',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default PasswordGenerator;
