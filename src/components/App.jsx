// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { selectIsRefreshing } from "../redux/auth/selectors";
// import { refreshUser } from "../redux/auth/operations";
// import { resetRefreshState } from "../redux/auth/slice";
// import { getAllData } from "../redux/data/operations";
// import { getNonameData } from "../redux/data/operations";
// import { selectIsLoading } from "../redux/data/selectors";
// import { updateTrackNumbers } from "../redux/datafilters/slice";
// import { selectUser } from "../redux/auth/selectors";
// import { Toaster } from "react-hot-toast";
// import AppRouter from "./AppRouter";
// import AppLayout from "./AppLayout/AppLayout";
// import Loader from "./UI/Loader/Loader";
// import {
//   errNotify,
//   successNotify,
// } from "../auxiliary/notification/notification";

// const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

// export default function App() {
//   const dispatch = useDispatch();
//   const isRefreshing = useSelector(selectIsRefreshing);
//   const isLoading = useSelector(selectIsLoading);

//   useEffect(() => {
//     dispatch(refreshUser())
//       .unwrap()
//       .finally(() => dispatch(resetRefreshState()));

//     dispatch(getNonameData())
//       .unwrap()
//       .then((data) => {
//         const groupedData = data.reduce((acc, row) => {
//           const trackNum = row.TrackNum;
//           if (!acc[trackNum]) acc[trackNum] = [];
//           acc[trackNum].push(row);
//           return acc;
//         }, {});

//         const filteredTracks = Object.keys(groupedData).filter(
//           (trackNum) => groupedData[trackNum].length >= 5
//         );
//         dispatch(updateTrackNumbers(filteredTracks));
//       })
//       .catch(() => {
//         if (isDevMode) errNotify("Error loading data");
//       });
//   }, [dispatch]);

//   return (
//     <React.Fragment>
//       {isRefreshing || isLoading ? (
//         <Loader />
//       ) : (
//         <AppLayout>
//           <AppRouter />
//         </AppLayout>
//       )}
//       <Toaster position="top-right" reverseOrder={false} />
//     </React.Fragment>
//   );
// }

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { resetRefreshState } from "../redux/auth/slice";
import { refreshUser } from "../redux/auth/operations";
import { getAllData } from "../redux/data/operations";
import { getNonameData } from "../redux/data/operations";
import { selectIsLoading } from "../redux/data/selectors";
import { updateTrackNumbers } from "../redux/datafilters/slice";
import { selectIsRefreshing } from "../redux/auth/selectors";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { filterTrackNumbers } from "../auxiliary/filteredTrackNumbers";
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
  const isLoggedIn = useSelector(selectIsLoggedIn);

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
        const data = await dispatch(getNonameData()).unwrap(() => {
          if (isDevMode) successNotify("Success loading data");
        });
        // const groupedData = data.reduce((acc, row) => {
        //   const trackNum = row.TrackNum;
        //   if (!acc[trackNum]) acc[trackNum] = [];
        //   acc[trackNum].push(row);
        //   return acc;
        // }, {});
        // const filteredTracks = Object.keys(groupedData).filter(
        //   (trackNum) => groupedData[trackNum].length >= 5
        // );
        const filteredTracks = processData(data, 5);
        dispatch(updateTrackNumbers(filteredTracks)).unwrap(() => {
          if (isDevMode) successNotify("Success loading data");
        });
      } catch {
        if (isDevMode) errNotify("Error loading data");
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
