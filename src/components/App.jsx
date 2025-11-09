import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { resetRefreshState } from "../redux/auth/slice";
import { refreshUser } from "../redux/auth/operations";
import { getNonameSources } from "../redux/datasources/operations";
import { getNonameData } from "../redux/data/operations";
import { selectIsLoading } from "../redux/data/selectors";
import { updateTrackNumbers } from "../redux/datafilters/slice";
import { selectIsRefreshing } from "../redux/auth/selectors";
import processData from "../auxiliary/processData";
import AppRouter from "./AppRouter";
import AppLayout from "./AppLayout/AppLayout";
import Loader from "./UI/Loader/Loader";
import {
  errNotify,
  successNotify,
} from "../auxiliary/notification/notification";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const initApp = async () => {
      try {
        await dispatch(refreshUser()).unwrap();
      } catch {
        if (isDevMode) errNotify("Error refresh");
      } finally {
        dispatch(resetRefreshState());
      }
      try {
        const sources = await dispatch(getNonameSources()).unwrap();
        if (!sources || (Array.isArray(sources) && sources.length === 0)) {
          if (isDevMode) errNotify("No Noname sources found");
          return;
        }

        if (isDevMode) successNotify("Success loading Noname sources");
      } catch {
        if (isDevMode) errNotify("Error loading Noname sources");
      }

      try {
        const data = await dispatch(getNonameData()).unwrap();
        if (!data || (Array.isArray(data) && data.length === 0)) {
          if (isDevMode) errNotify("No Noname data found");
          return;
        }

        if (isDevMode) successNotify("Success loading Noname data");
        const filteredTracks = processData(data, 5);

        dispatch(updateTrackNumbers(filteredTracks));
        if (isDevMode)
          successNotify("Tracks successfully get trajectory of noname");
      } catch (error) {
        console.error(error);
        if (isDevMode) errNotify("Error loading Noname data");
      }
    };

    initApp();
  }, [dispatch]);

  if (isRefreshing || isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AppLayout>
        <AppRouter />
      </AppLayout>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
