import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import User from './components/User';
import UserCard from './components/UserCard';

import { TUser } from './types/User';

import { globalStyles } from '../../styles/globalStyles';

const getUser = async () => {
  try {
    const res = await fetch('https://randomuser.me/api/?results=16&exc=login');

    if (res.ok) {
      const data = await res.json();
      return data.results as TUser[];
    }

    console.error(res.statusText);
    return null;
  } catch (err) {
    return null;
  }
};

const Tut03 = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [users, setUsers] = useState<TUser[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);

  useEffect(() => {
    getUser()
      .then((data) => {
        if (data) {
          setUsers(data);
        }
      })
      .finally(() => setIsUsersLoading(false));
  }, []);

  return (
    <SafeAreaView style={[styles.container, globalStyles.whiteContainer]}>
      <View style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        {!isUsersLoading ? (
          <>
            <View>
              <FlatList
                contentContainerStyle={styles.usersContainer}
                data={users}
                keyExtractor={({ name }) => `${name.first}-${name.last}`}
                renderItem={({ item, index }) => (
                  <User index={index} user={item} />
                )}
                showsHorizontalScrollIndicator={false}
                horizontal
              />
            </View>
            <View style={styles.container}>
              <FlatList
                contentContainerStyle={styles.usersCardContainer}
                data={users}
                keyExtractor={({ name }) => `${name.first}-${name.last}`}
                renderItem={({ item, index }) => (
                  <UserCard
                    index={index}
                    user={item}
                    totalNoOfUser={users.length}
                  />
                )}
                // ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                numColumns={2}
                scrollEnabled
              />
            </View>
          </>
        ) : (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator color="#ff6969" size="large" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Tut03;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicatorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  usersContainer: {
    gap: -30,
    marginTop: 30,
    padding: 20,
  },
  usersCardContainer: {
    gap: 20,
    padding: 20,
  },
  itemSeparator: {
    height: 20,
  },
});
