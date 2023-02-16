import { AnimatePresence, m } from "framer-motion";
import { useContext, useEffect, useRef } from "react";

import {
  NotificationContext,
  NotificationDispatchContext,
} from "@context/notification";

import { fadeInLeft } from "@styles/animations";
import { cn } from "@lib/clsx";

const Toast: React.FC = (): JSX.Element => {
  const timerRef = useRef(0);
  const notificationRef = useRef<NotificationType>();

  const notification = useContext(NotificationContext);
  const dispatchNotification = useContext(NotificationDispatchContext);

  if (notification) {
    notificationRef.current = notification;
  }

  useEffect(() => {
    if (notification) {
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        dispatchNotification(null);
      }, 7000);
    }
  }, [dispatchNotification, notification]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleClose = () => {
    dispatchNotification(null);
  };

  return (
    <AnimatePresence>
      {notification && (
        <m.div
          variants={fadeInLeft}
          initial="initial"
          animate="animate"
          exit="exit"
          tabIndex={0}
          aria-atomic="true"
          role="status"
          aria-live="polite"
          aria-label="notification"
          className={cn(
            "width-full fixed right-4 left-4 bottom-4 grid max-w-[400px] grid-cols-[1fr_min-content] grid-rows-2 items-center justify-items-start rounded-md  border border-water-200/40 bg-water px-4 py-3 shadow-lg shadow-water/50 ",

            {
              "border-primary-200/40 bg-primary shadow-primary/50":
                notificationRef.current?.type === "error",
            }
          )}
        >
          <h4
            className="col-start-1 row-start-1 text-lg font-bold text-white"
            aria-label="notification title"
          >
            {notificationRef.current?.title}
          </h4>

          <p
            className={cn(
              "col-start-1 row-start-2 text-sm font-medium tracking-wide text-white-500",
              {
                "text-white-200": notificationRef.current?.type === "error",
              }
            )}
            aria-label="notification message"
          >
            {notificationRef.current?.message}
          </p>

          <button
            type="button"
            role="button"
            onClick={handleClose}
            aria-label="close button"
            className={cn(
              "border-text-water-600 col-start-2 row-span-2 row-start-1  rounded border-2  px-2 py-1 text-xs font-bold tracking-wide text-water-300 hover:bg-water-600 hover:text-white",
              {
                "text-primary-100 hover:bg-primary-400":
                  notificationRef.current?.type === "error",
              }
            )}
          >
            Close
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export { Toast };
