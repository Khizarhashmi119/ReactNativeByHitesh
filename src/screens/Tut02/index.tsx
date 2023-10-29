import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import FlatCard from './components/FlatCard';
import ImageCard from './components/ImageCard';

import { globalStyles } from '../../styles/globalStyles';

const FLAT_CARDS = ['#ee3636', '#5a44db', '#f06a10', '#999842', '#ccccdd'];

const Tut02 = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? globalStyles.darkContainer : globalStyles.whiteContainer,
      ]}
    >
      <ScrollView>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <Text
          style={[
            styles.title,
            isDarkMode ? globalStyles.whiteText : globalStyles.darkText,
          ]}
        >
          Flat cards
        </Text>
        <View>
          <Text
            style={[
              styles.subtitle,
              isDarkMode ? globalStyles.whiteText : globalStyles.darkText,
            ]}
          >
            Using map
          </Text>
          <ScrollView
            contentContainerStyle={styles.flatCardsContainer}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            {FLAT_CARDS.map((color, index) => (
              <FlatCard
                key={index}
                backgroundColor={color}
                cardNo={index + 1}
              />
            ))}
          </ScrollView>
          <Text
            style={[
              styles.subtitle,
              isDarkMode ? globalStyles.whiteText : globalStyles.darkText,
            ]}
          >
            Using FlatList
          </Text>
          <FlatList
            contentContainerStyle={styles.flatCardsContainer}
            data={FLAT_CARDS}
            keyExtractor={(_, index) => String(index + 1)}
            renderItem={({ item, index }) => (
              <FlatCard backgroundColor={item} cardNo={index + 1} />
            )}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
        <View>
          <ScrollView
            contentContainerStyle={styles.imageCardsContainer}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            <ImageCard
              title="Little Kitten"
              uri="http://unsplash.it/300/200?random"
            />
            <ImageCard title="Little puppy" uri="http://unsplash.it/300/200" />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tut02;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    height: 'auto',
  },
  flatCardsContainer: {
    gap: 20,
    padding: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  imageCardsContainer: {
    gap: 15,
    padding: 20,
  },
});
