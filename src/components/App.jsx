import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "../redux/auth/selectors";
import { refreshUser } from "../redux/auth/operations";
import { resetRefreshState } from "../redux/auth/slice";
import { getAllData } from "../redux/data/operations";
import { selectIsLoading } from "../redux/data/selectors";
import { updateTrackNumbers } from "../redux/datafilters/slice";
import { Toaster } from "react-hot-toast";
import AppBar from "./AppBar/AppBar";
import AppRouter from "./AppRouter";
import AppLayout from "./AppLayout/AppLayout";
import Loader from "./UI/Loader/Loader";

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(refreshUser())
      .unwrap()
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        dispatch(resetRefreshState());
      });

    dispatch(getAllData())
      .unwrap()
      .then((data) => {
        const groupedData = data.reduce((acc, row) => {
          const trackNum = row.TrackNum;
          if (!acc[trackNum]) {
            acc[trackNum] = [];
          }
          acc[trackNum].push(row);
          return acc;
        }, {});

        const filteredTracks = Object.keys(groupedData).filter(
          (trackNum) => groupedData[trackNum].length >= 5
        );
        dispatch(updateTrackNumbers(filteredTracks));
      })
      .catch(() => {});
  }, [dispatch]);

  return (
    <React.Fragment>
      {isRefreshing || isLoading ? (
        <Loader />
      ) : (
        <AppLayout>
          <AppBar />
          <AppRouter />
        </AppLayout>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </React.Fragment>
  );
}
