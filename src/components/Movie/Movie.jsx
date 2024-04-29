import React from "react";
import style from "./style.module.scss";
import notImage from "./images/notImage.jpg";
import { Link } from "react-router-dom";

function Movie({ img = null, genres, rating, id }) {
  const classNames = [style.menu, style.menu__active];
  const [active, setActive] = React.useState(false);

  return (
    <Link to={`/movie/${id}`}>
      <li
        onMouseLeave={() => setActive(false)}
        onMouseEnter={() => setActive(true)}
        className={style.item}
      >
        <div className={style.img}>
          <img src={img ? img : notImage} alt="poster" />
          <div className={style.overlay}></div>
        </div>
        <span className={style.rating}>{rating}</span>
        <div className={active ? classNames.join(" ") : style.menu}>
          {genres.map((item, i) => (
            <span key={i}>{item.name}</span>
          ))}
        </div>
      </li>
    </Link>
  );
}

export default Movie;
