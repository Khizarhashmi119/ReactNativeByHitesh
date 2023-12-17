import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

import { TPlayerState, TTicTacToeGameState } from '../../types';

type Props = {
  gridNumber: keyof TTicTacToeGameState;
  player: TPlayerState | null;
  handlePressGridItem: (gridNumber: keyof TTicTacToeGameState) => void;
};

const GridItem = (props: Props): React.JSX.Element => {
  const { gridNumber, player, handlePressGridItem } = props;

  return (
    <View style={styles.gridItemContainer}>
      <Pressable
        style={styles.gridItem}
        android_ripple={{
          color: '#f3d6be',
        }}
        onPress={() => handlePressGridItem(gridNumber)}
      >
        {!player && <Icon name="pen" color="#451952" size={30} solid />}
        {player === 'O' && <Icon name="circle" color="#2bb673" size={30} />}
        {player === 'X' && (
          <Icon name="xmark" color="#bb2525" size={30} solid />
        )}
      </Pressable>
    </View>
  );
};

export default GridItem;

const styles = StyleSheet.create({
  gridItemContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    width: '31.4%',
  },
  gridItem: {
    alignItems: 'center',
    borderColor: '#f39f5a',
    borderRadius: 8,
    borderWidth: 3,
    paddingVertical: 30,
  },
});
