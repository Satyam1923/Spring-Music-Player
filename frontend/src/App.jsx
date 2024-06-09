import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PagenotFound from "./components/PagenotFound";
import Search from "./components/Search/Search";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
