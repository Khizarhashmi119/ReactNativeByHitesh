import React, { useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Animation = () => {
  const animation = useRef(new Animated.Value(0)).current;

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const startAnimation = () => {
    // Animated.timing(animation, {
    //   duration: 600,
    //   toValue: !isButtonClicked ? 1 : 0,
    //   useNativeDriver: true,
    // }).start();

    Animated.spring(animation, {
      // bounciness: 10,
      damping: 10,
      toValue: !isButtonClicked ? 1 : 0,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffcc70" />
      <Animated.View
        style={[
          styles.box,
          {
            borderRadius: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [8, 75],
            }),
            transform: [
              {
                rotateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
              // {
              //   rotateY: animation.interpolate({
              //     inputRange: [0, 1],
              //     outputRange: ['0deg', '360deg'],
              //   }),
              // },
              // {
              //   rotateZ: animation.interpolate({
              //     inputRange: [0, 1],
              //     outputRange: ['0deg', '360deg'],
              //   }),
              // },
              {
                scale: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.5],
                }),
              },
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
              },
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -200],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            width: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [200, 50],
            }),
          },
        ]}
      >
        <Pressable
          style={styles.button}
          android_ripple={{
            color: '#c58793',
          }}
          onPress={() => {
            setIsButtonClicked((prevState) => !prevState);
            startAnimation();
          }}
        >
          {isButtonClicked ? (
            <Icon name="done" color="#fff5e0" size={28} />
          ) : (
            <Text style={styles.buttonText}>Start</Text>
          )}
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ffcc70',
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  box: {
    backgroundColor: '#071952',
    height: 150,
    marginBottom: 48,
    width: 150,
  },
  buttonContainer: {
    borderRadius: 40,
    overflow: 'hidden',
    width: 200,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ae445a',
    height: 50,
    paddingVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff5e0',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
});

export default Animation;
