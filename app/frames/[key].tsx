import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FrameContext } from '@/contexts/FrameContext';
import { Frames } from '@/constants/Frames';

export default function FrameScreen() {
  const { key }: { key: keyof typeof Frames } = useLocalSearchParams();
  const { getFrame } = useContext(FrameContext);
  const frame = getFrame(key);

  return (
    <View style={styles.container}>
      <Text>{frame?.name}</Text>
      <View style={{ width: '100%', height: '100%' }}>
        {frame?.element}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
