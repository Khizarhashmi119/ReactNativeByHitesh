import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import ControlCenter from './components/ControlCenter';
import TrackInfo from './components/TrackInfo';

import { addTracks, setupPlayer } from './services/playbackService';
import { useActiveTrack } from './trackContext';

const MusicTrackPlayer = (): React.JSX.Element => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const { activeTrack, setActiveTrack } = useActiveTrack();

  useEffect(() => {
    const setup = async () => {
      const isSetupReady = await setupPlayer();
      const queue = await TrackPlayer.getQueue();

      if (isSetupReady && queue.length <= 0) {
        await addTracks();
      }

      setIsPlayerReady(isSetupReady);
    };

    setup();
  }, []);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (event.type === Event.PlaybackActiveTrackChanged) {
      setActiveTrack(event.track);
    }
  });

  console.log({ activeTrack });

  return (
    <>
      <StatusBar backgroundColor="#121212" />
      <View style={styles.container}>
        {isPlayerReady ? (
          <View style={styles.content}>
            <TrackInfo />
            <ControlCenter />
          </View>
        ) : (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator color="#1db954" size="large" />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#121212',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
});

export default MusicTrackPlayer;
