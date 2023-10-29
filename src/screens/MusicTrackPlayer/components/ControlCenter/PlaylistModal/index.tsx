import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, View } from 'react-native';
import TrackPlayer, { Track } from 'react-native-track-player';

import PlaylistItem from './components/PlaylistItem';

type Props = {
  isPlaylistModalOpen: boolean;
  closeModal: () => void;
};

const PlaylistModal = (props: Props): JSX.Element => {
  const { closeModal, isPlaylistModalOpen } = props;

  const [playlist, setPlaylist] = useState<Track[]>([]);

  useEffect(() => {
    const loadPlaylist = async () => {
      const queue = await TrackPlayer.getQueue();
      setPlaylist(queue);
    };

    loadPlaylist();
  }, []);

  return (
    <Modal
      animationType="slide"
      onRequestClose={closeModal}
      visible={isPlaylistModalOpen}
      transparent
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.modalHandler} />
          <View style={styles.playlistContainer}>
            <FlatList
              contentContainerStyle={styles.playlist}
              data={playlist}
              renderItem={({ item, index }) => (
                <PlaylistItem index={index} track={item} />
              )}
              keyExtractor={({ title }) => title as string}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#21212188',
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#212121',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    height: '50%',
    paddingBottom: 20,
    paddingVertical: 16,
    shadowColor: '	#535353',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: '100%',
  },
  modalHandler: {
    backgroundColor: '#b3b3b3',
    borderRadius: 5,
    height: 5,
    marginBottom: 16,
    width: '15%',
  },
  playlistContainer: {
    width: '100%',
    gap: 16,
  },
  playlist: {
    gap: 10,
  },
});

export default PlaylistModal;
