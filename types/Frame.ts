import { ReactElement } from "react";

export type Frame = {
  id: string;
  name: string;
  icon: string;
  description: string;
  element: ReactElement;
};
