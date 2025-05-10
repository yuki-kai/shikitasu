import React, { createContext, ReactNode } from 'react';
import { Frame } from '@/types/Frame';
import { Frames } from '@/constants/Frames';

type FrameContextType = {
  frames: typeof Frames;
  getFrame: (key: keyof typeof Frames) => Frame;
};

export const FrameContext = createContext<FrameContextType>({
  frames: Frames,
  getFrame: (key: keyof typeof Frames) => Frames[key],
});

export function FrameProvider({ children }: { children: ReactNode }) {
  const frames = Frames;
  const getFrame = (key: keyof typeof Frames) => {
    return Frames[key];
  };

  return (
    <FrameContext.Provider value={{ frames, getFrame }}>
      {children}
    </FrameContext.Provider>
  );
}
