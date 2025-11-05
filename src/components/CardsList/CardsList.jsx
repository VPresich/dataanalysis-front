import CardExperiment from "../CardExperiment/CardExperiment";
import css from "./CardsList.module.css";

export default function CardsList({ cards }) {
  return (
    <ul className={css.container}>
      {cards.map((card) => (
        <li key={card.number}>
          <CardExperiment
            number={card.number}
            name={card.name}
            file_name={card.file_name}
            comment={card.comment}
          />
        </li>
      ))}
    </ul>
  );
}
