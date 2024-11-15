// libraries
import { useRef, useEffect } from "react";

// components
import { ChatFallback } from "./ChatFallback";
import { MessageComposer } from "./MessageComposer";
import { ChatItem } from "./ChatItem";

// types
import type { ReactElement } from "react";
import type { Conversation } from "../types";
import type { OnAction } from "../actionHandler/types";

type Props = {
  selectedConversation: Conversation | undefined;
  onAction: OnAction;
};

export const ChatContainer = (props: Props): ReactElement => {
  const { selectedConversation, onAction } = props;

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [selectedConversation]);

  if (!selectedConversation) {
    return <ChatFallback />;
  }

  const { messages } = selectedConversation;

  return (
    <div className="flex flex-col w-full h-full bg-gray-800">
      {messages?.length ? (
        <div
          ref={messagesContainerRef}
          className="w-full h-full p-8 flex flex-col gap-4 items-end overflow-y-auto"
        >
          {messages.map((message) => (
            <ChatItem key={message.id} message={message} onAction={onAction} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full p-8 flex items-end justify-center">
          <div className="flex items-center justify-center w-full h-full p-8 text-center bg-gray-800 text-4xl text-white">
            No messages yet
          </div>
        </div>
      )}
      <MessageComposer onAction={onAction} />
    </div>
  );
};
