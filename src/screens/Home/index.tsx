import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { TAppParamList } from '../../AppParamList';
import { BUTTONS } from '../../constants';

const Home = (): React.JSX.Element => {
  const navigate = useNavigation<NativeStackNavigationProp<TAppParamList>>();

  return (
    <>
      <StatusBar backgroundColor="#fff5e0" barStyle="dark-content" />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.buttons}
          data={BUTTONS}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                android_ripple={{
                  color: '#545e88',
                }}
                onPress={() => navigate.navigate(item.name)}
              >
                <Text style={styles.buttonText}>{item.text}</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff5e0',
    flex: 1,
    padding: 16,
  },
  buttons: {
    justifyContent: 'center',
    flex: 1,
    gap: 16,
  },
  buttonContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#141e46',
    fontWeight: '700',
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff5e0',
  },
});
