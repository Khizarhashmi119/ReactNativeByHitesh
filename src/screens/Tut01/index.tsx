import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

const Tut01 = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? globalStyles.darkContainer : globalStyles.whiteContainer,
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.mainContent}
      >
        <Text
          style={[
            styles.title,
            isDarkMode ? globalStyles.whiteText : globalStyles.darkText,
          ]}
        >
          Hello World 👋 from react native with react-native-cli
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tut01;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});
