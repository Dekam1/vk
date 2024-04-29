import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Movieinfo({ TOKEN }) {
  const { id } = useParams();
  const [movie, setMovie] = React.useState({});

  React.useEffect(() => {
    async function getMovieById() {
      try {
        const { data } = await axios(
          `https://api.kinopoisk.dev/v1.4/movie/${+id}`,
          {
            headers: {
              "X-API-KEY": TOKEN,
            },
          }
        );
        setMovie(data);
      } catch {
        alert("Произошла какая-то ошибка");
      }
    }
    getMovieById();
  }, []);

  return (
    <main className="main">
      <div className="info-block">
        <div className="info-block__left">
          <img src={movie.poster?.previewUrl} alt="movie img" />
        </div>
        <div className="info-block__right">
          <h1 className="info-block__title">{movie.name}</h1>
          <p className="info-block__text">{movie.description}</p>
        </div>
      </div>
    </main>
  );
}

export default Movieinfo;
