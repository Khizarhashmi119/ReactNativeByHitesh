import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import One from './assets/1.png';
import Two from './assets/2.png';
import Three from './assets/3.png';
import Four from './assets/4.png';
import Five from './assets/5.png';
import Six from './assets/6.png';

const DICE_MAPPING: Record<number, ImageSourcePropType> = {
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six,
};

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const RollTheDice = (): React.JSX.Element => {
  const [dice, setDice] = useState(6);

  const handlePressRoll = () => {
    const dice = Math.floor(Math.random() * 6 + 1);
    setDice(dice);
    ReactNativeHapticFeedback.trigger('impactHeavy', options);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff5e0" translucent />
      <Text style={styles.title}>Roll the Dice</Text>
      <Image style={styles.dice} source={DICE_MAPPING[dice]} />
      {/* <View style={styles.rollButtonContainer}>
        <TouchableOpacity style={styles.rollButton} onPress={handlePressRoll}>
          <Text style={styles.rollButtonText}>Let's roll</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.rollButtonContainer}>
        <Pressable
          style={styles.rollButton}
          android_ripple={{
            color: '#545e88',
          }}
          onPress={handlePressRoll}
        >
          <Text style={styles.rollButtonText}>Let's roll</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff5e0',
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight ?? 0 + 16,
  },
  title: {
    color: '#141e46',
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 32,
  },
  dice: {
    height: 150,
    width: 150,
    marginBottom: 24,
  },
  rollButtonContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    width: '40%',
    marginBottom: 16,
  },
  rollButton: {
    alignItems: 'center',
    backgroundColor: '#141e46',
    fontWeight: '700',
    paddingVertical: 10,
  },
  rollButtonText: {
    color: '#fff5e0',
  },
});

export default RollTheDice;
