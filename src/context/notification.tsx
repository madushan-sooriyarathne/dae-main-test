import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";

const NotificationContext = createContext<NotificationType | null>(null);
const NotificationDispatchContext = createContext<
  Dispatch<SetStateAction<NotificationType | null>>
>(() => null);

interface Props {
  children: ReactNode | ReactNode[];
}

const NotificationProvider: React.FC<Props> = ({ children }): JSX.Element => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  return (
    <NotificationContext.Provider value={notification}>
      <NotificationDispatchContext.Provider value={setNotification}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationContext.Provider>
  );
};

export {
  NotificationProvider,
  NotificationContext,
  NotificationDispatchContext,
};
