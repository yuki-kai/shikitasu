import React from 'react';
import { useFloatingCircleItem } from '@/hooks/useFloatingCircleItem';
import { Canvas, Circle } from '@shopify/react-native-skia';
import { StyleSheet } from 'react-native';

const FLOATING_CIRCLE_ITEMS = [
  {
    id: '1',
    x: 50,
    y: 50,
    r: 50,
    color: 'yellow',
    animationSize: 20,
    duration: 2000,
  },
] as const satisfies readonly React.ComponentProps<typeof FloatingCircleItem>[];

export const FloatingCircleItem: React.FC = () => {
  return (
    <Canvas style={styles.canvas}>
      {FLOATING_CIRCLE_ITEMS.map(item => {
        const { cx, cy } = useFloatingCircleItem({
          x: item.x,
          y: item.y,
          animationSize: item.animationSize,
          duration: item.duration,
        });
        return (
          <Circle
            key={item.id}
            cx={cx}
            cy={cy}
            r={item.r}
            color={item.color}
          />
        );
      })}
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});
