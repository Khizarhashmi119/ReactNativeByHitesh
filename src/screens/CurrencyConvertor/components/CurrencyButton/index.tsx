import React, { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Snackbar from 'react-native-snackbar';

type Props = PropsWithChildren<{
  currency: Currency;
  index: number;
  totalNoOfCurrency: number;
  setCurrency: (currency: Currency) => void;
}>;

const CurrencyButton = (props: Props): JSX.Element => {
  const { currency, index, totalNoOfCurrency, setCurrency } = props;
  const { flag, name } = currency;

  const handlePressCurrency = () => {
    Snackbar.show({
      backgroundColor: '#662549',
      duration: Snackbar.LENGTH_SHORT,
      text: name,
      textColor: '#f39f5a',
    });

    setCurrency(currency);
  };

  return (
    <Pressable
      style={[
        styles.container,
        {
          marginRight:
            index % 2 !== 0 || index === totalNoOfCurrency - 1 ? 0 : 20,
        },
      ]}
      onPress={handlePressCurrency}
      android_ripple={{
        color: '#865296',
        radius: 100,
      }}
    >
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.flag}>{flag}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#451952',
    borderRadius: 8,
    borderLeftColor: '#ae445a',
    borderLeftWidth: 8,
    elevation: 10,
    // flex: 1,
    paddingVertical: 10,
    shadowColor: '#451952',
    width: '47.3%',
  },
  name: {
    color: '#f39f5a',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  flag: {
    fontSize: 20,
  },
});

export default CurrencyButton;
