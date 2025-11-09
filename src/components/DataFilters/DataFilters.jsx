import { useDispatch, useSelector } from "react-redux";
import TimeForm from "../TimeForm/TimeForm";
import DropDownSelector from "../UI/DropDownSelector/DropDownSelector";
import MultySelector from "../UI/MultySelector/MultySelector";
import SearchForm from "../UI/SearchForm/SearchForm";
import Button from "../UI/Button/Button";
import ToggleButton from "../UI/ToggleButton/ToggleButton";
import clsx from "clsx";
import {
  saveImmConsistent,
  saveImmConsistentMaxValue,
  saveSelectedTrackNums,
  resetDataFilters,
  setIs3D,
  saveSourceNumber,
  saveTime,
} from "../../redux/datafilters/slice";
import {
  selectTrackNumbersForMultySelect,
  selectImmConsistent,
  selectImmConsistentValues,
  selectImmConsistentMaxValue,
  selectSourceNum,
  selectStartTime,
  selectEndTime,
  selectSelectedTrackNums,
  selectIs3D,
} from "../../redux/datafilters/selectors";
import { selectSourceNumbers } from "../../redux/datasources/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import { getNonameDataBySource } from "../../redux/data/operations";
import { updateTrackNumbers } from "../../redux/datafilters/slice";
import processData from "../../auxiliary/processData";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification";

import css from "./DataFilters.module.css";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

const DataFilters = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const selectedTrackNums = useSelector(selectSelectedTrackNums);
  const trackNumbersForMultySelect = useSelector(
    selectTrackNumbersForMultySelect
  );
  const immConsistentValues = useSelector(selectImmConsistentValues);
  const immConsistent = useSelector(selectImmConsistent);
  const immConsistentMaxValue = useSelector(selectImmConsistentMaxValue);
  const startTime = useSelector(selectStartTime);
  const endTime = useSelector(selectEndTime);
  const is3D = useSelector(selectIs3D);
  const sourceNumbers = useSelector(selectSourceNumbers);
  const sourceNumber = useSelector(selectSourceNum);

  const handleSourceChange = async (sourceNumber) => {
    try {
      const data = await dispatch(
        getNonameDataBySource({ sourceNumber })
      ).unwrap();

      if (isDevMode) successNotify("Success loading Noname data by source");

      const filteredTracks = processData(data, 5);
      dispatch(updateTrackNumbers(filteredTracks));
    } catch (error) {
      if (isDevMode) errNotify("Error while loading or processing Noname data");
      console.error(error);
    }
    dispatch(saveSourceNumber(sourceNumber));
  };

  const handleImmConsistent = (value) => {
    dispatch(saveImmConsistent(value));
  };

  const handleSearch = (value) => {
    dispatch(saveImmConsistentMaxValue(value));
  };

  const handleChangedTime = (value) => {
    dispatch(saveTime(value));
  };

  const handleReset = () => {
    dispatch(resetDataFilters());
    dispatch(saveSourceNumber(sourceNumber));
  };

  const handleSelectionChange = (options) => {
    dispatch(saveSelectedTrackNums(options));
  };

  const handleToggle = () => {
    dispatch(setIs3D(!is3D));
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <p className={clsx(css.label, css[theme])}>Track numbers:</p>
        <MultySelector
          btnLabel="Select  "
          options={trackNumbersForMultySelect}
          selectedOptions={selectedTrackNums}
          onChange={handleSelectionChange}
          dropdownCSSClass={css.dropdownMultyTrackNum}
        />
      </div>

      <div className={css.wrapper}>
        <p className={clsx(css.label, css[theme])}>IMM Consistent:</p>
        <DropDownSelector
          btnLabel={immConsistent}
          options={immConsistentValues}
          selectedOption={immConsistent}
          onChange={handleImmConsistent}
          btnCSSClass={css.btnTrackNum}
          dropdownCSSClass={css.dropdownTrackNum}
        />
      </div>
      <div className={css.searchWrapper}>
        <p className={clsx(css.label, css[theme])}>Consistent Value:</p>
        <SearchForm
          onSearch={handleSearch}
          initValue={immConsistentMaxValue}
          placeholder="Input Value"
        />
      </div>

      <div className={css.wrapper}>
        <p className={clsx(css.label, css[theme])}>Experiment N:</p>
        <DropDownSelector
          btnLabel={sourceNumber}
          options={sourceNumbers}
          selectedOption={sourceNumber}
          onChange={handleSourceChange}
          btnCSSClass={css.btnTrackNum}
          dropdownCSSClass={css.dropdownTrackNum}
        />
      </div>

      <div className={css.timeFormWrapper}>
        <p className={clsx(css.label, css[theme])}>Time:</p>
        <TimeForm
          initialValues={{ startTime, endTime }}
          onChange={handleChangedTime}
        />
      </div>
      <Button onClick={handleReset} btnAuxStyles={css.btnReset}>
        Reset
      </Button>
      <div className={css.wrapper}>
        <ToggleButton is3D={is3D} onToggle={handleToggle} />
      </div>
    </div>
  );
};

export default DataFilters;
