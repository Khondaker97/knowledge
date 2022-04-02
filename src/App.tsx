import React, { FC } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import ArticlePlans from "./pages/ArticlePlans";
import Articles from "./pages/Articles";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const App: FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/articles" element={<ProtectedRoutes />}>
            <Route path="/articles" element={<Articles />} />
          </Route>
          <Route path="/article-plans" element={<ProtectedRoutes />}>
            <Route path="/article-plans" element={<ArticlePlans />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
