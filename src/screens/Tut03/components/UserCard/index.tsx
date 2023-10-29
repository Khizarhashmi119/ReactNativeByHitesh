import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

import { TUser } from '../../types/User';

interface Props {
  index: number;
  user: TUser;
  totalNoOfUser: number;
}

const UserCard = (props: Props): JSX.Element => {
  const { index, user, totalNoOfUser } = props;
  const { name, picture } = user;

  return (
    <View
      style={[
        styles.container,
        {
          marginRight: index % 2 !== 0 || index === totalNoOfUser - 1 ? 0 : 20,
        },
      ]}
    >
      <ImageBackground
        style={styles.image}
        source={{
          uri: `https://robohash.org/${name.first}?size=300x300&set=set5`,
        }}
        resizeMode="cover"
      >
        <Text style={styles.name}>
          {name.first} {name.last}
        </Text>
      </ImageBackground>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    borderColor: '#ff6969',
    borderRadius: 15,
    borderWidth: 3,
    flexGrow: 1,
    height: 250,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    backgroundColor: '#fab5b5',
    flex: 1,
  },
  name: {
    color: '#fff',
    bottom: 16,
    fontSize: 16,
    fontWeight: '700',
    left: 16,
    marginTop: 10,
    position: 'absolute',
    textAlign: 'center',
  },
});
