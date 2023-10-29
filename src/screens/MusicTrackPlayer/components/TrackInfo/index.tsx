import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useProgress } from 'react-native-track-player';

import { useActiveTrack } from '../../trackContext';

const TrackInfo = (): JSX.Element => {
  const { activeTrack } = useActiveTrack();
  const { duration, position } = useProgress();

  return (
    <>
      {activeTrack && (
        <>
          <Image
            style={styles.artwork}
            source={{
              uri: activeTrack.artwork as string,
            }}
          />
          <View style={styles.trackInfoContainer}>
            <Text style={styles.title}>{activeTrack.title}</Text>
            <Text style={styles.artist}>{activeTrack.artist}</Text>
          </View>
        </>
      )}
      <View style={styles.timeContainer}>
        <Text style={styles.position}>
          {new Date(position * 1000).toISOString().slice(15, 19)}
        </Text>
        <Text style={styles.remaining}>
          -{new Date((duration - position) * 1000).toISOString().slice(15, 19)}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  artwork: {
    aspectRatio: '1/1',
    borderRadius: 5,
    width: '90%',
    marginBottom: 24,
  },
  trackInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#b3b3b3',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  artist: {
    color: '#b3b3b3',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 'auto',
    width: '90%',
  },
  position: {
    color: '#b3b3b3',
  },
  remaining: {
    color: '#b3b3b3',
  },
});

export default TrackInfo;
