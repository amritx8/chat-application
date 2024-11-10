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
      <div
        ref={messagesContainerRef}
        className="w-full h-full p-8 flex flex-col gap-4 items-end overflow-y-auto"
      >
        {messages
          ? messages.map((message) => (
              <ChatItem
                key={message.id}
                message={message}
                onAction={onAction}
              />
            ))
          : null}
      </div>
      <MessageComposer onAction={onAction} />
    </div>
  );
};
