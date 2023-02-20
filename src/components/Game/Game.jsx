import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  refreshTimer,
  removePlayer,
  setTimeWin,
} from "../../redux/slices/gameSlices/gameSlices";
import { addWinner } from "../../redux/slices/winnersSlices/winnerSlice";
import { MINE } from "../../utils/constants";
import { Timer } from "../Timer/Timer";
import styles from "./game.module.scss";

function createField(size) {
  const field = new Array(size * size).fill(0);
  const mineCount = size === 8 ? 10 : 40;

  function inc(x, y) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      if (field[y * size + x] === MINE) return;

      field[y * size + x] += 1;
    }
  }

  for (let i = 0; i < mineCount; ) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    if (field[y * size + x] === MINE) continue;

    field[y * size + x] = MINE;

    i += 1;

    inc(x + 1, y);
    inc(x - 1, y);
    inc(x, y + 1);
    inc(x, y - 1);
    inc(x + 1, y - 1);
    inc(x - 1, y - 1);
    inc(x + 1, y + 1);
    inc(x - 1, y + 1);
  }

  return field;
}

const Mask = {
  Transparent: "Transparent",
  Fill: "Fill",
  Flag: "Flag",
  Question: "Question",
};

const mapMaskToView = {
  [Mask.Transparent]: null,
  [Mask.Fill]: "🌫️",
  [Mask.Flag]: "🏴",
  [Mask.Question]: "❓",
};

export const Game = () => {
  const player = useSelector((store) => store.game);
  const size = +player.level;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dimension = new Array(size).fill(null);
  const [death, setDeath] = useState(false);
  const [field, setField] = useState(() => createField(size));
  const [mask, setMask] = useState(() =>
    new Array(size * size).fill(Mask.Fill)
  );
  const exitHandler = (e) => {
    e.preventDefault();
    dispatch(removePlayer());
    navigate("/");
  };
  const restartHandler = (e) => {
    e.preventDefault();
    setField(() => createField(size));
    setMask(() => new Array(size * size).fill(Mask.Fill));
    setDeath(false);
    dispatch(refreshTimer());
  };
  const win = useMemo(
    () =>
      !field.some(
        (f, i) =>
          f === MINE && mask[i] !== Mask.Flag && mask[i] !== Mask.Transparent
      ),
    [field, mask]
  );
  useEffect(() => {
    if (win && !death) {
      dispatch(setTimeWin());
      const preparedWinner = {
        name: player.name,
        level: +player.level,
        time: Math.floor((Date.now() - player.timeStart) / 1000),
      };
      dispatch(addWinner(preparedWinner));
    }
  }, [death, win]);
  const mineOfField =
    field.filter((el) => el === -1).length -
    mask.filter((el) => el === "Flag").length;
  console.log({ mask });
  return (
    <div className={styles.wr}>
      <div className={styles.wr_header}>
        <h1>Игрок: {player.name}</h1>
        <div className="d-flex justify-content-between">
          <Timer death={death} win={win} />
          <h4>Mine: {mineOfField}</h4>
        </div>
      </div>
      <div>
        {dimension.map((_, y) => {
          return (
            <div key={y} className={styles.y}>
              {dimension.map((_, x) => {
                return (
                  <div
                    className={styles.x}
                    key={x}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 24,
                      height: 24,
                      border: "2px solid gray",
                      margin: 1,
                      backgroundColor: death
                        ? "#FAA"
                        : win
                        ? "#FFB"
                        : "#a2a3a2",
                    }}
                    onClick={() => {
                      if (win || death) return;

                      if (mask[y * size + x] === Mask.Transparent) return;

                      const clearing = [];

                      function clear(x, y) {
                        if (x >= 0 && x < size && y >= 0 && y < size) {
                          if (mask[y * size + x] === Mask.Transparent) return;

                          clearing.push([x, y]);
                        }
                      }

                      clear(x, y);

                      while (clearing.length) {
                        const [x, y] = clearing.pop();

                        mask[y * size + x] = Mask.Transparent;

                        if (field[y * size + x] !== 0) continue;

                        clear(x + 1, y);
                        clear(x - 1, y);
                        clear(x, y + 1);
                        clear(x, y - 1);
                        clear(x + 1, y - 1);
                        clear(x - 1, y - 1);
                        clear(x + 1, y + 1);
                        clear(x - 1, y + 1);
                      }

                      if (field[y * size + x] === MINE) {
                        mask.forEach((_, i) => (mask[i] = Mask.Transparent));

                        setDeath(true);
                      }

                      setMask((prev) => [...prev]);
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      if (win || death) return;

                      if (mask[y * size + x] === Mask.Transparent) return;

                      if (mask[y * size + x] === Mask.Fill) {
                        mask[y * size + x] = Mask.Flag;
                      } else if (mask[y * size + x] === Mask.Flag) {
                        mask[y * size + x] = Mask.Question;
                      } else if (mask[y * size + x] === Mask.Question) {
                        mask[y * size + x] = Mask.Fill;
                      }

                      setMask((prev) => [...prev]);
                    }}
                  >
                    {mask[y * size + x] !== Mask.Transparent
                      ? mapMaskToView[mask[y * size + x]]
                      : field[y * size + x] === MINE
                      ? "💣"
                      : field[y * size + x]}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className={death || win ? "hidden" : "d-flex flex-column my-2"}>
        <button
          type="button"
          onClick={exitHandler}
          className="btn my-2 btn-secondary"
        >
          Выйти в меню
        </button>
      </div>
      <div>
        {death && (
          <div className={styles.gameOver}>
            <h2>GAME OVER</h2>
            <button
              type="button"
              onClick={restartHandler}
              className="btn btn-warning"
            >
              Начать заново?
            </button>
            <button
              type="button"
              onClick={exitHandler}
              className="btn my-2 btn-secondary"
            >
              Выйти в меню
            </button>
          </div>
        )}
      </div>
      <div>
        {win && !death && (
          <div className={styles.win}>
            <h2>ВЫ ПОБЕДИЛИ!!!</h2>
            <h2>
              ВАШЕ ВРЕМЯ:{" "}
              {Math.floor((player.timeWin - player.timeStart) / 1000)} сек.
            </h2>
            <button
              type="button"
              onClick={restartHandler}
              className="btn btn-warning"
            >
              Начать заново?
            </button>
            <button
              type="button"
              onClick={exitHandler}
              className="btn my-2 btn-secondary"
            >
              Выйти в меню
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
