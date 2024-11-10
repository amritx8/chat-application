// libraries
import { useState, useCallback } from "react";
import { v4 } from "uuid";

// constants
import { ActionTypes } from "../constants/actionTypes";
import { OverlayTypes } from "../constants/overlayTypes";

// mocks
import { CONNECTIONS } from "../../constants/connections";

// types
import type { OnAction } from "../types";
import type { Conversation } from "../../types";

const INITIAL_STATE = {
  conversations: CONNECTIONS.map(({ id, name, profileImg }) => ({
    userId: id,
    name,
    profileImageUrl: profileImg,
  })),
};

type ViewState = {
  overlay: OverlayTypes;
  context?: Record<string, any>;
};

export type ActionState = {
  conversations: Conversation[];
  selectedConversationInfo?: {
    userId: string;
  };
};

type Return = {
  viewState: ViewState | undefined;
  actionState: ActionState;
  onAction: OnAction;
};

export const useActionHandler = (): Return => {
  const [viewState, setViewState] = useState<ViewState | undefined>(undefined);
  const [actionState, setActionState] = useState<ActionState>(INITIAL_STATE);

  const viewStateContext = viewState?.context;
  const { selectedConversationInfo } = actionState;

  const handleAction = useCallback<OnAction>(
    (action) => {
      const { type } = action;

      switch (type) {
        case ActionTypes.OPEN_CHAT: {
          const { payload } = action;
          const { userId } = payload;

          setActionState((prevState) => ({
            ...prevState,
            selectedConversationInfo: { userId },
          }));

          break;
        }
        case ActionTypes.CREATE_MESSAGE: {
          const { payload } = action;
          const { content } = payload;

          const createdMessage = {
            id: v4(),
            content,
            createdTime: Date.now(),
          };

          setActionState((prevState) => ({
            ...prevState,
            conversations: prevState.conversations.map((conversation) =>
              conversation.userId === selectedConversationInfo?.userId
                ? {
                    ...conversation,
                    messages: conversation.messages
                      ? [...conversation.messages, createdMessage]
                      : [createdMessage],
                  }
                : conversation
            ),
          }));
          break;
        }
        case ActionTypes.DELETE_MESSAGE: {
          const { payload } = action;
          const { messageId } = payload;

          setViewState({
            overlay: OverlayTypes.DELETE_CONFIRMATION,
            context: {
              messageId,
            },
          });
          break;
        }
        case ActionTypes.CONFIRM_DELETE_MESSAGE: {
          const { messageId } = viewStateContext;

          setActionState((prevState) => ({
            ...prevState,
            conversations: prevState.conversations.map((conversation) =>
              conversation.userId === selectedConversationInfo?.userId
                ? {
                    ...conversation,
                    messages: conversation.messages.filter(
                      (message) => message.id !== messageId
                    ),
                  }
                : conversation
            ),
          }));
          setViewState(undefined);
          break;
        }
        case ActionTypes.RESET_VIEW_STATE: {
          setViewState(undefined);
          break;
        }
        default:
      }
    },
    [viewStateContext, selectedConversationInfo]
  );

  return {
    viewState,
    actionState,
    onAction: handleAction,
  };
};
