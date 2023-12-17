import React, { Fragment, useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import CurrencyButton from './components/CurrencyButton';

import { CURRENCIES } from './constants';

const CurrencyConvertor = (): React.JSX.Element => {
  const [amount, setAmount] = useState('');
  const [targetCurrency, setTargetCurrency] = useState<Currency>(CURRENCIES[1]);
  const [resultantAmount, setResultantAmount] = useState('');

  useEffect(() => {
    const resultantAmount = (targetCurrency.value * Number(amount)).toFixed(4);
    setResultantAmount(resultantAmount + '');
  }, [amount, targetCurrency]);

  const handleChangeAmount = (text: string) => setAmount(text);
  const setCurrency = (currency: Currency) => setTargetCurrency(currency);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" backgroundColor="#f39f5a" />
      <FlatList
        contentContainerStyle={styles.currencies}
        numColumns={2}
        data={CURRENCIES}
        ListHeaderComponent={
          <Fragment>
            <TextInput
              style={styles.input}
              cursorColor="#451952"
              placeholder="Enter amount"
              placeholderTextColor="#451952"
              keyboardType="numeric"
              onChangeText={handleChangeAmount}
            />
            {resultantAmount && (
              <View style={styles.resultantAmountContainer}>
                <Text style={styles.targetCurrencyFlag}>
                  {targetCurrency.flag}
                </Text>
                <Text style={styles.resultantAmount}>
                  {targetCurrency.symbol} {resultantAmount}
                </Text>
              </View>
            )}
          </Fragment>
        }
        keyExtractor={({ name }) => name}
        renderItem={({ item, index }) => (
          <CurrencyButton
            currency={item}
            index={index}
            totalNoOfCurrency={CURRENCIES.length}
            setCurrency={setCurrency}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f39f5a',
    flex: 1,
    padding: 16,
  },
  resultantAmountContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 16,
  },
  targetCurrencyFlag: {
    fontSize: 30,
  },
  resultantAmount: {
    color: '#451952',
    fontSize: 30,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#f39f5a',
    borderColor: '#451952',
    borderRadius: 8,
    borderWidth: 2,
    color: '#451952',
    fontWeight: '500',
    marginBottom: 16,
    padding: 10,
  },
  currencies: {
    gap: 20,
  },
});

export default CurrencyConvertor;
