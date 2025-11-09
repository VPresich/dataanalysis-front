// import { useSelector } from "react-redux";
// import Loader from "../../components/UI/Loader/Loader";
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
//           {isLoading ? (
//             <Loader />
//           ) : (
//             <>
//               {!error && dataForTrack.length > 0 ? (
//                 <DataTable data={dataForTrack} />
//               ) : (
//                 <p className={clsx(css.text, css[theme])}>Not found data.</p>
//               )}
//             </>
//           )}
//         </div>
//         <span>
//           Records: {dataForTrack.length} / {dataLength}
//         </span>
//       </div>
//     </>
//   );
// }

import { useSelector } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import clsx from "clsx";
import DataTable from "../../components/DataTable/DataTable";
import DataFilters from "../../components/DataFilters/DataFilters";
import ShowGraphModal from "../../components/ShowGraphModal/ShowGraphModal";
import {
  selectDataForAnalysisLength,
  selectFilteredData,
  selectIsLoading,
  selectError,
} from "../../redux/data/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import DocumentTitle from "../../components/DocumentTitle";
import css from "./DataAnalysis.module.css";

export default function DataAnalysis() {
  const dataLength = useSelector(selectDataForAnalysisLength);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dataForTrack = useSelector(selectFilteredData);
  const theme = useSelector(selectTheme);

  return (
    <>
      <DocumentTitle>Example Analysis</DocumentTitle>

      <div className={css.container}>
        <div className={css.auxLine}>
          <DataFilters />
          <ShowGraphModal dataForTrack={dataForTrack} />
        </div>

        <div className={css.tableContainer}>
          {isLoading ? (
            <Loader />
          ) : error ? (
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
