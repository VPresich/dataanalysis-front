import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { resetRefreshState } from "../redux/auth/slice";
import { refreshUser } from "../redux/auth/operations";
import AppRouter from "./AppRouter";
import AppLayout from "./AppLayout/AppLayout";
import {
  errNotify,
  successNotify,
} from "../auxiliary/notification/notification";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initApp = async () => {
      try {
        await dispatch(refreshUser()).unwrap();
        if (isDevMode) successNotify("Success refresh");
      } catch {
        if (isDevMode) errNotify("Error refresh");
      } finally {
        dispatch(resetRefreshState());
      }
    };

    initApp();
  }, [dispatch]);

  return (
    <>
      <AppLayout>
        <AppRouter />
      </AppLayout>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
