import { useFloatingCircleItem } from '@/hooks/useFloatingCircleItem';
import { Circle } from '@shopify/react-native-skia';

type Props = {
  id: string;
  x: number;
  y: number;
  r: number;
  color: string;
  animationSize: number;
  duration: number;
};

export const FloatingCircleItem: React.FC<Props> = ({
  x,
  y,
  r,
  color,
  animationSize,
  duration,
  id,
}) => {
  const { cx, cy } = useFloatingCircleItem({ x, y, animationSize, duration});

  return <Circle key={id} cx={cx} cy={cy} r={r} color={color} />;
};
