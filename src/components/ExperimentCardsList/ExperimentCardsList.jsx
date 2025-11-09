import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExperimentCard from "../ExperimentCard/ExperimentCard";
import { setCurrentSource } from "../../redux/datasources/slice";
import { selectCurrentSource } from "../../redux/datasources/selectors";

import css from "./ExperimentCardsList.module.css";

export default function ExperimentCardsList({ experiments }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentSource = useSelector(selectCurrentSource);

  const handleSelect = (source_number) => {
    dispatch(setCurrentSource(source_number));
    navigate(`/data/${source_number}`);
  };

  return (
    <ul className={css.container}>
      {experiments.map((card) => (
        <li key={card.source_number}>
          <ExperimentCard
            experiment={card}
            selected={currentSource === card.source_number}
            onSelect={() => handleSelect(card.source_number)}
          />
        </li>
      ))}
    </ul>
  );
}
