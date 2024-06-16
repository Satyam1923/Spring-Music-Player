import "./App.css";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import PagenotFound from "./components/PagenotFound";
import Search from "./components/Search/Search";
import Home from "./components/Home/Home";
import Aboutus from "./pages/Aboutus"
import Blog from "./pages/Blog"
import Terms from "./pages/Terms"
import Contactus from "./pages/Contactus"
import Culture from "./pages/Culture"
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/search" element={<Search />} />
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contactus" element={<Contactus />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/culture" element={<Culture />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="*" element={<PagenotFound />} /> 
    </Routes>
  </BrowserRouter>  
  );
};

export default App;
