import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { TUser } from '../../types/User';

interface Props {
  index: number;
  user: TUser;
}

const User = (props: Props): JSX.Element => {
  const { user } = props;
  const { name, picture } = user;

  return (
    <View>
      <Image
        style={styles.avatar}
        source={{
          uri: `https://robohash.org/${name.first}?size=300x300&set=set5`,
        }}
      />
      <Text style={styles.name}>{name.first}</Text>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#fab5b5',
    borderColor: '#ff6969',
    borderRadius: 50,
    borderWidth: 3,
    height: 100,
    width: 100,
  },
  name: {
    color: '#bb2525',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center',
  },
});
