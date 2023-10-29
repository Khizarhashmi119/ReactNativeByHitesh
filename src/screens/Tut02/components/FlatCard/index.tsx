import React from 'react';
import {
  ColorValue,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import { globalStyles } from '../../../../styles/globalStyles';

interface Props {
  backgroundColor: ColorValue;
  cardNo: number;
}

const FlatCard = (props: Props): JSX.Element => {
  const { backgroundColor, cardNo } = props;

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          styles.cardText,
          isDarkMode ? globalStyles.whiteText : globalStyles.darkText,
        ]}
      >
        {cardNo}
      </Text>
    </View>
  );
};

export default FlatCard;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 6,
    elevation: 10,
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
