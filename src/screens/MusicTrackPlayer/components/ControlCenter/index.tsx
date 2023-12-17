import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import PlaylistModal from './PlaylistModal';

const ControlCenter = (): React.JSX.Element => {
  const playbackState = usePlaybackState();
  const { duration, position } = useProgress();

  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  const handleChangePosition = (value: number) => TrackPlayer.seekTo(value);

  const handlePressShuffle = async () => {
    const queue = await TrackPlayer.getQueue();
    await TrackPlayer.reset();
    queue.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(queue);
  };

  const handlePressPrevious = async () => await TrackPlayer.skipToPrevious();
  const handlePressPlay = async () => await TrackPlayer.play();
  const handlePressPause = async () => await TrackPlayer.pause();
  const handlePressNext = async () => await TrackPlayer.skipToNext();
  const handlePressMore = () => setIsPlaylistModalOpen(true);
  const closeModal = () => setIsPlaylistModalOpen(false);

  const isPlayButtonVisible =
    playbackState.state === State.Ready ||
    playbackState.state === State.Paused ||
    playbackState.state === State.Stopped ||
    playbackState.state === State.Loading;

  const isPauseButtonVisible = playbackState.state === State.Playing;

  return (
    <>
      <Slider
        style={styles.slider}
        minimumTrackTintColor="#1db954"
        maximumTrackTintColor="#b3b3b3"
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={handleChangePosition}
      />
      <View style={styles.controlButtonsContainer}>
        <View style={styles.controlButtonContainer}>
          <Pressable
            android_ripple={{
              color: '#535353',
            }}
            onPress={handlePressShuffle}
          >
            <MaterialIcon name="shuffle" color="#b3b3b3" size={40} />
          </Pressable>
        </View>
        <View style={styles.controlButtonContainer}>
          <Pressable
            android_ripple={{
              color: '#535353',
            }}
            onPress={handlePressPrevious}
          >
            <MaterialIcon name="skip-previous" color="#b3b3b3" size={40} />
          </Pressable>
        </View>
        {isPlayButtonVisible && (
          <View style={styles.controlButtonContainer}>
            <Pressable
              android_ripple={{
                color: '#535353',
              }}
              onPress={handlePressPlay}
              disabled={playbackState.state === State.Loading}
            >
              <MaterialIcon
                name="play-circle-outline"
                color="#b3b3b3"
                size={50}
              />
            </Pressable>
          </View>
        )}
        {isPauseButtonVisible && (
          <View style={styles.controlButtonContainer}>
            <Pressable
              android_ripple={{
                color: '#535353',
              }}
              onPress={handlePressPause}
            >
              <MaterialIcon
                name="pause-circle-outline"
                color="#b3b3b3"
                size={50}
              />
            </Pressable>
          </View>
        )}
        <View style={styles.controlButtonContainer}>
          <Pressable
            android_ripple={{
              color: '#535353',
            }}
            onPress={handlePressNext}
          >
            <MaterialIcon name="skip-next" color="#b3b3b3" size={40} />
          </Pressable>
        </View>
        <View style={styles.controlButtonContainer}>
          <Pressable
            android_ripple={{
              color: '#535353',
            }}
            onPress={handlePressMore}
          >
            <MaterialIcon name="more-vert" color="#b3b3b3" size={40} />
          </Pressable>
        </View>
      </View>
      {isPlaylistModalOpen && (
        <PlaylistModal
          closeModal={closeModal}
          isPlaylistModalOpen={isPlaylistModalOpen}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  slider: {
    height: 40,
    width: '98%',
  },
  controlButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },
  controlButtonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
});

export default ControlCenter;
