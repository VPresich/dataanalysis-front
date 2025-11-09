// import { useSelector } from "react-redux";
// import clsx from "clsx";
// import DataTable from "../../components/DataTable/DataTable";
// import DataFilters from "../../components/DataFilters/DataFilters";
// import ShowGraphModal from "../../components/ShowGraphModal/ShowGraphModal";
// import {
//   selectDataForAnalysisLength,
//   selectFilteredData,
//   selectIsLoading,
//   selectError,
// } from "../../redux/data/selectors";
// import { selectTheme } from "../../redux/auth/selectors";
// import DocumentTitle from "../../components/DocumentTitle";
// import css from "./DataAnalysis.module.css";

// export default function DataAnalysis() {
//   const dataLength = useSelector(selectDataForAnalysisLength);
//   const isLoading = useSelector(selectIsLoading);
//   const error = useSelector(selectError);
//   const dataForTrack = useSelector(selectFilteredData);
//   const theme = useSelector(selectTheme);
//   return (
//     <>
//       <DocumentTitle>Example Analysis</DocumentTitle>
//       <div className={css.container}>
//         <div className={css.auxLine}>
//           <DataFilters />
//           <ShowGraphModal dataForTrack={dataForTrack} />
//         </div>
//         <div className={css.tableContainer}>
//
//               {!error && dataForTrack.length > 0 ? (
//                 <DataTable data={dataForTrack} />
//               ) : (
//                 <p className={clsx(css.text, css[theme])}>Not found data.</p>
//               )}
//
//         </div>
//         <span>
//           Records: {dataForTrack.length} / {dataLength}
//         </span>
//       </div>
//     </>
//   );
// }

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import DocumentTitle from "../../components/DocumentTitle";
import DataTable from "../../components/DataTable/DataTable";
import DataFilters from "../../components/DataFilters/DataFilters";
import { selectCurrentSource } from "../../redux/datasources/selectors";
import ShowGraphModal from "../../components/ShowGraphModal/ShowGraphModal";
import processData from "../../auxiliary/processData";
import { updateTrackNumbers } from "../../redux/datafilters/slice";
import {
  selectDataForAnalysisLength,
  selectFilteredData,
  selectError,
} from "../../redux/data/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import { getDataBySource } from "../../redux/data/operations";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification";
import css from "./DataAnalysis.module.css";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function DataAnalysis() {
  const dataLength = useSelector(selectDataForAnalysisLength);
  const error = useSelector(selectError);
  const dataForTrack = useSelector(selectFilteredData);
  const theme = useSelector(selectTheme);

  const dispatch = useDispatch();
  const { id: sourceNumber } = useParams();

  const currSource = useSelector(selectCurrentSource);

  console.log("DataAnalysis", sourceNumber, currSource);

  useEffect(() => {
    const initApp = async () => {
      try {
        const data = await dispatch(getDataBySource(sourceNumber)).unwrap();
        if (!data || (Array.isArray(data) && data.length === 0)) {
          if (isDevMode) errNotify("No User data found");
          return;
        }
        if (isDevMode) successNotify("Success loading User data");
        const filteredTracks = processData(data, 5);
        dispatch(updateTrackNumbers(filteredTracks));
        if (isDevMode)
          successNotify("Tracks successfully get trajectory of noname");
      } catch (error) {
        console.error(error);
        if (isDevMode) errNotify("Error loading User data");
      }
    };

    initApp();
  }, [dispatch, sourceNumber]);

  return (
    <>
      <DocumentTitle>Example Analysis</DocumentTitle>

      <div className={css.container}>
        <div className={css.auxLine}>
          <DataFilters />
          <ShowGraphModal dataForTrack={dataForTrack} />
        </div>

        <div className={css.tableContainer}>
          {error ? (
            <p className={clsx(css.text, css[theme])}>
              Failed to load data. Please try again.
            </p>
          ) : dataForTrack.length > 0 ? (
            <DataTable data={dataForTrack} />
          ) : (
            <p className={clsx(css.text, css[theme])}>No data found.</p>
          )}
        </div>

        <span>
          Records: {dataForTrack.length} / {dataLength}
        </span>
      </div>
    </>
  );
}
