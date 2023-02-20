import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeaderItem } from "../LeaderItem/LeaderItem";
import styles from "./leaders.module.scss";

export const Leaders = () => {
  const leaders = useSelector((store) => store.winners);
  const arrayEasy = leaders.filter((el) => el.level === 8);
  const arrayMiddle = leaders.filter((el) => el.level === 16);
  const navigate = useNavigate()
  
  const exitHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className={styles.wr}>
      <h1 className="logo">Лидеры игры</h1>
      <div className={styles.easy}>
        <h3>Уровень-простой</h3>
        <ul className="list-group list-group-numbered">
          {arrayEasy
            .sort((a, b) => a.time - b.time)
            .map((el, i) => (
              <LeaderItem key={i} {...el} />
            ))}
        </ul>
      </div>
      <div className={styles.middle}>
        <h3>Уровень-средний</h3>
        <ul className="list-group list-group-numbered">
          {arrayMiddle
            .sort((a, b) => a.time - b.time)
            .map((el, i) => (
              <LeaderItem key={i} {...el} />
            ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={exitHandler}
        className="btn my-2 btn-secondary"
      >
        Выйти в меню
      </button>
    </div>
  );
};
