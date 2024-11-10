// types
import type { ReactElement } from "react";

export const ChatFallback = (): ReactElement => (
  <div className="flex items-center justify-center w-full h-full p-8 text-center bg-gray-800 text-4xl text-white">
    Select a conversation to get started!
  </div>
);
