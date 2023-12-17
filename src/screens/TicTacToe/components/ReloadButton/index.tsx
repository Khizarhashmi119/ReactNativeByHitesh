import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

type Props = PressableProps & {};

const ReloadButton = (props: Props): React.JSX.Element => {
  const { ...otherProps } = props;

  return (
    <View style={styles.reloadButtonContainer}>
      <Pressable
        style={styles.reloadButton}
        android_ripple={{
          color: '#545e81',
        }}
        {...otherProps}
      >
        <Icon name="repeat" color="#fff5e0" size={20} solid />
        <Text style={styles.reloadButtonText}>Reload</Text>
      </Pressable>
    </View>
  );
};

export default ReloadButton;

const styles = StyleSheet.create({
  reloadButtonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  reloadButton: {
    backgroundColor: '#141e46',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    padding: 16,
  },
  reloadButtonText: {
    color: '#fff5e0',
    fontFamily: 'Poppins-Bold',
  },
});
