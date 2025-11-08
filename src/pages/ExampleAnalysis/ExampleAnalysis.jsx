import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import DocumentTitle from "../../components/DocumentTitle";
import Loader from "../../components/UI/Loader/Loader";
import clsx from "clsx";
import DataTable from "../../components/DataTable/DataTable";
import DataFilters from "../../components/DataFilters/DataFilters";
import ModalWrapper from "../../components/UI/ModalWrapper/ModalWrapper";
import Button from "../../components/UI/Button/Button";
import GraphComponent from "../../components/GraphComponent/GraphComponent";
import { getNonameDataBySource } from "../../redux/data/operations";
import processData from "../../auxiliary/processData";
import { updateTrackNumbers } from "../../redux/datafilters/slice";
import {
  selectDataForAnalysisLength,
  selectFilteredData,
  selectIsLoading,
  selectError,
} from "../../redux/data/selectors";
import { selectSourceNum } from "../../redux/datafilters/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification";
import css from "./ExampleAnalysis.module.css";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function ExampleAnalysis() {
  const [showGraph, setShowGraph] = useState(false);
  const dispatch = useDispatch();
  const sourceNumber = useSelector(selectSourceNum);
  const dataLength = useSelector(selectDataForAnalysisLength);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dataForTrack = useSelector(selectFilteredData);
  const theme = useSelector(selectTheme);

  const loadedSourceRef = useRef(null);

  const handleClick = () => setShowGraph(true);
  const handleClose = () => setShowGraph(false);

  // useEffect(() => {
  //   if (!sourceNumber) return;
  //   if (loadedSourceRef.current === sourceNumber) return;

  //   const loadData = async () => {
  //     try {
  //       const data = await dispatch(
  //         getNonameDataBySource({ sourceNumber })
  //       ).unwrap();

  //       if (isDevMode) successNotify("Success loading Noname data by source");

  //       const filteredTracks = processData(data, 5);
  //       dispatch(updateTrackNumbers(filteredTracks));

  //       loadedSourceRef.current = sourceNumber;
  //     } catch (error) {
  //       if (isDevMode)
  //         errNotify("Error while loading or processing Noname data");
  //       console.error(error);
  //     }
  //   };

  //   loadData();
  // }, [dispatch, sourceNumber]);

  return (
    <>
      <DocumentTitle>Example Analysis</DocumentTitle>

      <section className={css.container}>
        <h2 className="visually-hidden">Example Analysis</h2>

        <div className={css.auxLine}>
          <DataFilters />
          <Button btnAuxStyles={css.auxBtn} onClick={handleClick}>
            Line graph
          </Button>
        </div>

        <div className={css.tableContainer}>
          {isLoading ? (
            <Loader />
          ) : !error && dataForTrack.length > 0 ? (
            <DataTable data={dataForTrack} />
          ) : (
            <p className={clsx(css.text, css[theme])}>No data found.</p>
          )}
        </div>

        <span>
          Records: {dataForTrack.length} / {dataLength}
        </span>
      </section>

      {showGraph && (
        <ModalWrapper onClose={handleClose} isGraph>
          <GraphComponent data={dataForTrack} />
        </ModalWrapper>
      )}
    </>
  );
}
