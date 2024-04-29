import React from "react";
import axios from "axios";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Pagination } from "@mui/material";

import Header from "./Header/Header";
import Movie from "./Movie/Movie";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Main({ TOKEN }) {
  const [movies, setMovies] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(1000);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    async function getMovies() {
      try {
        const { data } = await axios(
          `https://api.kinopoisk.dev/v1.4/movie/search?page=${currentPage}&limit=20&query=${searchValue}`,
          {
            headers: {
              "X-API-KEY": TOKEN,
            },
          }
        );
        setMovies(
          data.docs.reduce((acc, currItem) => {
            const category = currItem.isSeries ? "cериалы" : "фильмы";
            const existingCategory = acc.find(
              (item) => item.category === category
            );
            if (existingCategory) {
              existingCategory.data.push(currItem);
            } else {
              acc.push({ category, data: [currItem] });
            }
            return acc;
          }, [])
        );
        setTotalPage(data.pages);
        if (data.pages < currentPage) {
          setCurrentPage(1);
        }
      } catch {
        alert("Произошла какая-то ошибка");
      }
    }
    getMovies();
  }, [currentPage, searchValue]);

  return (
    <div className="wrapper">
      <Header setSearchValue={setSearchValue} />
      <main className="main">
        {movies.map(({ category, data }) => (
          <div key={category} className="movie__wrapper">
            <h3 className="title">{category}</h3>
            <ul className="movie">
              {data.map((movie) => (
                <Movie
                  key={movie.id}
                  img={movie.poster?.previewUrl}
                  genres={movie.genres}
                  rating={Math.floor(movie.rating?.kp)}
                  id={movie.id}
                />
              ))}
            </ul>
          </div>
        ))}
      </main>
      <footer>
        <ThemeProvider theme={darkTheme}>
          {!!totalPage && (
            <Pagination
              onChange={(_, v) => setCurrentPage(v)}
              size="large"
              page={currentPage}
              count={totalPage}
              variant="outlined"
            />
          )}
        </ThemeProvider>
      </footer>
    </div>
  );
}

export default Main;
