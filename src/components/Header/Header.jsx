import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import style from "./style.module.scss";

function Header({ setSearchValue }) {
  const [openInput, setOpenInput] = React.useState(false);

  const handleChange = () => {
    setOpenInput((prev) => !prev);
  };

  return (
    <header className={style.header}>
      <a className={style.logo} href="/">
        Кинопоиск
      </a>
      <div className={style.switch}>
        {openInput && (
          <form className={style.form}>
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Фильмы и сериалы"
              className={style.input}
            />
          </form>
        )}
        <button onClick={handleChange} className={style.button}>
          {openInput ? (
            <CloseIcon sx={{ marginLeft: "5px" }} fontSize="medium" />
          ) : (
            <SearchIcon fontSize="large" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
