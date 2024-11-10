// components
import { DeleteConfirmation } from "./components/DeleteConfirmation";

// hooks
import { useActionHandler } from "./hooks/useActionHandler";

// constants
import { OverlayTypes } from "./constants/overlayTypes";

// types
import type { ReactElement, ReactNode } from "react";
import type { OnAction } from "./types";
import type { ActionState } from "./hooks/useActionHandler";

type Props = {
  children: ({
    actionState,
    onAction,
  }: {
    actionState: ActionState;
    onAction: OnAction;
  }) => ReactNode;
};

export const ActionHandler = (props: Props): ReactElement => {
  const { children } = props;

  const { viewState, actionState, onAction } = useActionHandler();

  return (
    <>
      {viewState?.overlay === OverlayTypes.DELETE_CONFIRMATION ? (
        <DeleteConfirmation onAction={onAction} />
      ) : null}
      {children({ actionState, onAction })}
    </>
  );
};
