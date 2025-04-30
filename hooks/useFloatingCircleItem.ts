import { useCallback } from 'react';
import {
  useSharedValue,
  withRepeat,
  withTiming,
  useDerivedValue,
  Easing,
} from 'react-native-reanimated';

type Props = {
  x: number;
  y: number;
  animationSize: number;
  duration: number;
};

export const useFloatingCircleItem = ({
  x,
  y,
  animationSize,
  duration,
}: Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const memoizedWithRepeat = useCallback(
    () =>
      withRepeat(
        withTiming(animationSize, {
          duration,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      ),
    [animationSize, duration]
  );

  // X軸のアニメーション
  translateX.value = memoizedWithRepeat();

  // Y軸のアニメーション
  translateY.value = memoizedWithRepeat();

  const cx = useDerivedValue(() => translateX.value + x);
  const cy = useDerivedValue(() => translateY.value + y);

  return { cx, cy };
};
