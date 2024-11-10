// types
import type { ReactElement, ReactNode } from "react";

type SlotProps = {
  children: ReactNode;
};

const LeftSlot = ({ children }: SlotProps) => null;
const RightSlot = ({ children }: SlotProps) => null;

type Props = {
  children: ReactElement<SlotProps>[];
};
export const Layout = (props: Props): ReactElement => {
  const { children } = props;

  const leftSlot = children.find((child) => child.type === LeftSlot);
  const rightSlot = children.find((child) => child.type === RightSlot);

  return (
    <div className="flex w-full h-full">
      <div className="w-1/4 h-full">{leftSlot.props.children}</div>
      <div className="w-3/4 h-full">{rightSlot.props.children}</div>
    </div>
  );
};

Layout.LeftSlot = LeftSlot;
Layout.RightSlot = RightSlot;
