import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { globalStyles } from '../../../../styles/globalStyles';

interface Props {
  title: string;
  uri: string;
}

const ImageCard = (props: Props): JSX.Element => {
  const { title, uri } = props;

  const openUrl = (url: string) => Linking.openURL(url);

  const handlePressImageCard = () => openUrl(uri);

  return (
    <TouchableOpacity onPress={handlePressImageCard}>
      <View style={styles.imageCard}>
        <Image
          style={styles.image}
          source={{
            uri,
            width: 300,
            height: 200,
          }}
        />
        <View style={styles.imageCardContent}>
          <Text style={[styles.imageCardTitle, globalStyles.darkText]}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  imageCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    width: 340,
  },
  image: {
    height: 300,
    width: '100%',
  },
  imageCardContent: {
    padding: 10,
  },
  imageCardTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
});
