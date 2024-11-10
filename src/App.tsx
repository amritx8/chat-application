// components
import { ActionHandler } from "./actionHandler";
import { ConversationList } from "./components/ConversationList";
import { ChatContainer } from "./components/ChatContainer";
import { Layout } from "./components/Layout";

// types
import type { ReactElement } from "react";

export const App = (): ReactElement => {
  return (
    <ActionHandler>
      {({
        actionState: { conversations, selectedConversationInfo },
        onAction,
      }) => (
        <Layout>
          <Layout.LeftSlot>
            <ConversationList
              conversations={conversations ?? []}
              onAction={onAction}
              selectedUserId={selectedConversationInfo?.userId}
            />
          </Layout.LeftSlot>
          <Layout.RightSlot>
            <ChatContainer
              selectedConversation={conversations.find(
                ({ userId }) => userId === selectedConversationInfo?.userId
              )}
              onAction={onAction}
            />
          </Layout.RightSlot>
        </Layout>
      )}
    </ActionHandler>
  );
};
