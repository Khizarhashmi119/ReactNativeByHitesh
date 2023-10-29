import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Bars } from 'react-native-loader';
import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
} from 'react-native-track-player';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { useActiveTrack } from '../../../../../trackContext';

type Props = {
  index: number;
  track: Track;
};

const PlaylistItem = (props: Props): JSX.Element => {
  const { index, track } = props;
  const { artwork, title, artist } = track;

  const { activeTrack } = useActiveTrack();
  const playbackState = usePlaybackState();

  const isTrackActive = activeTrack && activeTrack?.title === track.title;

  const handlePressPlay = async () => await TrackPlayer.play();
  const handlePressPause = async () => await TrackPlayer.pause();

  const handlePressPlayInActiveTrack = async () => {
    await TrackPlayer.skip(index);
    await TrackPlayer.play();
  };

  const isPlayButtonVisible =
    playbackState.state === State.Ready ||
    playbackState.state === State.Paused ||
    playbackState.state === State.Stopped ||
    playbackState.state === State.Loading;

  const isPauseButtonVisible = playbackState.state === State.Playing;

  return (
    <View
      style={[styles.container, isTrackActive ? styles.activeContainer : null]}
    >
      <Image
        style={styles.artwork}
        source={{
          uri: artwork as string,
        }}
      />
      <View style={styles.trackInfo}>
        <Text>{title}</Text>
        <Text>{artist}</Text>
      </View>
      {isTrackActive && playbackState.state === State.Playing && (
        <Bars color="#1db954" size={6} />
      )}
      <View>
        {isTrackActive ? (
          <>
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
                    size={35}
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
                    size={35}
                  />
                </Pressable>
              </View>
            )}
          </>
        ) : (
          <View style={styles.controlButtonContainer}>
            <Pressable
              android_ripple={{
                color: '#535353',
              }}
              onPress={handlePressPlayInActiveTrack}
            >
              <MaterialIcon
                name="play-circle-outline"
                color="#b3b3b3"
                size={35}
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    padding: 16,
  },
  activeContainer: {
    backgroundColor: '#37704b',
  },
  artwork: {
    aspectRatio: '1/1',
    borderRadius: 3,
    width: 50,
  },
  trackInfo: {
    flex: 1,
  },
  controlButtonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
});

export default PlaylistItem;
