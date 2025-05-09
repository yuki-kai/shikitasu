import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function FrameScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>{ id }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
