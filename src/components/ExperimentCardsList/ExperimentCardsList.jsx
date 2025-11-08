import ExperimentCard from "../ExperimentCard/ExperimentCard";
import css from "./ExperimentCardsList.module.css";

export default function ExperimentCardsList({ experiments }) {
  return (
    <ul className={css.container}>
      {experiments.map((card) => (
        <li key={card.source_number}>
          <ExperimentCard experiment={card} />
        </li>
      ))}
    </ul>
  );
}
