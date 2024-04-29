import { Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import MovieInfo from "./components/MovieInfo";

const TOKEN = "W667EEX-QTQ40ZE-NYPPDED-ME5970J";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main TOKEN={TOKEN} />} />
      <Route path="/movie/:id" element={<MovieInfo TOKEN={TOKEN} />} />
    </Routes>
  );
}

export default App;
