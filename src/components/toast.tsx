import {
  NotificationContext,
  NotificationDispatchContext,
} from "@context/notification";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { fadeInLeft } from "@styles/animations";
import { AnimatePresence, m } from "framer-motion";
import { useContext, useEffect, useMemo, useRef, useState } from "react";

const Toast: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(0);
  const notificationRef = useRef<NotificationType>();

  //   const notification = useContext(NotificationContext);
  const dispatchNotification = useContext(NotificationDispatchContext);

  const notification: NotificationType = useMemo(
    () => ({
      message: "This is a test message",
      title: "This is a test title",
    }),
    []
  );

  useEffect(() => {
    if (notification) {
      notificationRef.current = notification;
      setOpen(false);
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setOpen(true);
      }, 100);
    }
  }, []);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleClose = () => {
    setOpen(false);
    dispatchNotification(null);
  };

  return (
    <ToastPrimitive.Provider swipeDirection="left">
      <ToastPrimitive.Root
        className="grid grid-cols-[auto_max-content] items-center gap-x-4 rounded-md border border-black-400/50 bg-white-100 p-4 shadow-xl"
        open={open}
        onOpenChange={setOpen}
        asChild
      >
        <AnimatePresence>
          <m.div
            variants={fadeInLeft}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ToastPrimitive.Title className="col-start-1 row-start-1 text-lg font-bold text-black-900">
              {notification?.title}
            </ToastPrimitive.Title>
            <ToastPrimitive.Description
              asChild
              className="col-start-1 row-start-2 text-sm font-medium tracking-wide text-black-700"
            >
              <p>{notification?.message}</p>
            </ToastPrimitive.Description>
            <ToastPrimitive.Action
              asChild
              altText="Goto schedule to undo"
              onClick={handleClose}
            >
              <button className="border-text-water-600 col-start-2 row-span-2 row-start-1 rounded-sm border px-2 py-1 text-xs font-bold tracking-wide text-water-600 hover:bg-water-600 hover:text-white">
                Close
              </button>
            </ToastPrimitive.Action>
          </m.div>
        </AnimatePresence>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed bottom-0 left-0 z-[200] flex w-[min(100%,_400px)] flex-col gap-2 p-6" />
    </ToastPrimitive.Provider>
  );
};

export { Toast };
