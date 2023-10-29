import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import GridItem from './components/GridItem';
import ReloadButton from './components/ReloadButton';
import WinnerModal from './components/WinnerModal';

import { TPlayerState, TTicTacToeGameState } from './types';

const initTicTacToeGameState: TTicTacToeGameState = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
};

const TicTacToe = () => {
  const [playerState, setPlayerState] = useState<TPlayerState>('O');
  const [ticTacToeGame, setTicTacToeGame] = useState<TTicTacToeGameState>(
    initTicTacToeGameState,
  );
  const [winner, setWinner] = useState<TPlayerState | null>(null);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);

  useEffect(() => {
    if (
      ticTacToeGame[1] &&
      ticTacToeGame[1] === ticTacToeGame[2] &&
      ticTacToeGame[2] === ticTacToeGame[3]
    ) {
      setWinner(ticTacToeGame[1]);
    } else if (
      ticTacToeGame[4] &&
      ticTacToeGame[4] === ticTacToeGame[5] &&
      ticTacToeGame[5] === ticTacToeGame[6]
    ) {
      setWinner(ticTacToeGame[4]);
    } else if (
      ticTacToeGame[7] &&
      ticTacToeGame[7] === ticTacToeGame[8] &&
      ticTacToeGame[8] === ticTacToeGame[9]
    ) {
      setWinner(ticTacToeGame[7]);
    } else if (
      ticTacToeGame[1] &&
      ticTacToeGame[1] === ticTacToeGame[4] &&
      ticTacToeGame[4] === ticTacToeGame[7]
    ) {
      setWinner(ticTacToeGame[1]);
    } else if (
      ticTacToeGame[2] &&
      ticTacToeGame[2] === ticTacToeGame[5] &&
      ticTacToeGame[5] === ticTacToeGame[8]
    ) {
      setWinner(ticTacToeGame[2]);
    } else if (
      ticTacToeGame[3] &&
      ticTacToeGame[3] === ticTacToeGame[6] &&
      ticTacToeGame[6] === ticTacToeGame[9]
    ) {
      setWinner(ticTacToeGame[3]);
    } else if (
      ticTacToeGame[1] &&
      ticTacToeGame[1] === ticTacToeGame[5] &&
      ticTacToeGame[5] === ticTacToeGame[9]
    ) {
      setWinner(ticTacToeGame[1]);
    } else if (
      ticTacToeGame[3] &&
      ticTacToeGame[3] === ticTacToeGame[5] &&
      ticTacToeGame[5] === ticTacToeGame[7]
    ) {
      setWinner(ticTacToeGame[3]);
    }
  }, [ticTacToeGame]);

  useEffect(() => {
    if (winner) {
      setIsWinnerModalOpen(true);
    }
  }, [winner]);

  const togglePlayer = () =>
    setPlayerState((prevState) => (prevState === 'O' ? 'X' : 'O'));

  const handlePressGridItem = (gridNumber: keyof TTicTacToeGameState) => {
    if (!ticTacToeGame[gridNumber] && !winner) {
      setTicTacToeGame((prevState) => ({
        ...prevState,
        [gridNumber]: playerState,
      }));

      togglePlayer();
    }
  };

  const handleClickCloseWinnerModal = () => {
    setIsWinnerModalOpen(false);
  };

  const handlePressReload = () => {
    setIsWinnerModalOpen(false);
    setTicTacToeGame(initTicTacToeGameState);
    setPlayerState('O');
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff5e0" />
      <WinnerModal
        winner={winner}
        handlePressReload={handlePressReload}
        handleClickCloseWinnerModal={handleClickCloseWinnerModal}
        isModalOpen={isWinnerModalOpen}
      />
      <View style={styles.main}>
        {!Object.values(ticTacToeGame).every((value) => value) && !winner && (
          <Text
            style={[
              styles.title,
              {
                backgroundColor: playerState === 'X' ? '#bb2525' : '#2bb673',
              },
            ]}
          >
            Player {playerState}'s turn
          </Text>
        )}
        <View style={styles.grid}>
          {Array.from({ length: 9 }).map((_, index) => (
            <GridItem
              key={index}
              gridNumber={(index + 1) as keyof TTicTacToeGameState}
              player={ticTacToeGame[(index + 1) as keyof TTicTacToeGameState]}
              handlePressGridItem={handlePressGridItem}
            />
          ))}
        </View>
        {Object.values(ticTacToeGame).every((value) => value) && !winner && (
          <ReloadButton onPress={handlePressReload} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff5e0',
    flex: 1,
  },

  main: {
    padding: 16,
  },
  title: {
    borderRadius: 8,
    color: '#fff5e0',
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginBottom: 24,
    padding: 16,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
});

export default TicTacToe;
