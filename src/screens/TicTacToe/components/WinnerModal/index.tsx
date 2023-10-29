import LottieView from 'lottie-react-native';
import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import ReloadButton from '../ReloadButton';

import { TPlayerState } from '../../types';

import WinnerAnimation from '../../assets/winner-animation-2.json';

type Props = {
  isModalOpen: boolean;
  winner: TPlayerState | null;
  handlePressReload: () => void;
  handleClickCloseWinnerModal: () => void;
};

const WinnerModal = (props: Props): JSX.Element => {
  const {
    isModalOpen,
    winner,
    handlePressReload,
    handleClickCloseWinnerModal,
  } = props;

  const height = useSharedValue(400);

  const flingGesture = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      height.value = 0;
      handleClickCloseWinnerModal();
    });

  const winnerContainerStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <Modal animationType="slide" visible={isModalOpen} transparent>
      <GestureHandlerRootView style={styles.winnerModalContainer}>
        <GestureDetector gesture={flingGesture}>
          <Animated.View style={[styles.winnerContainer, winnerContainerStyle]}>
            <LottieView
              style={styles.animation}
              source={WinnerAnimation}
              autoPlay
              loop
            />
            <View style={styles.modalHandlerContainer}>
              <View style={styles.modalHandler} />
            </View>
            <View style={styles.winnerMainContent}>
              <Text
                style={[
                  styles.winnerText,
                  {
                    color: winner === 'X' ? '#bb2525' : '#2bb673',
                  },
                ]}
              >
                Winner is player {winner} 🥳
              </Text>
              <ReloadButton onPress={handlePressReload} />
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  winnerModalContainer: {
    backgroundColor: '#7c757568',
    flex: 1,
    justifyContent: 'flex-end',
  },
  winnerContainer: {
    backgroundColor: '#fff5e0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '50%',
    elevation: 5,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#141e46',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  animation: {
    flex: 1,
  },
  modalHandlerContainer: {
    alignItems: 'center',
    top: 16,
    position: 'absolute',
    width: '100%',
  },
  modalHandler: {
    backgroundColor: '#c9c9c9',
    borderRadius: 5,
    height: 5,
    marginBottom: 16,
    width: '15%',
  },
  winnerMainContent: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  winnerText: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 30,
    marginBottom: 24,
  },
});

export default WinnerModal;
