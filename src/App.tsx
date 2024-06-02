import { Component, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { classNames } from "./helpers/classNames/classNames";
import Header from "./shared/components/UI/Header";
import MainPage from "./pages/MainPage/MainPage";
import AboutPage from "./pages/AboutPage/AboutPage";

class App extends Component {
  render() {
    return (
      <div
        className={classNames("app", { hovered: true, selected: false }, [
          "light",
          "cls2",
          "cls3",
        ])}
        style={{
          backgroundImage: `url(/assets/images/bg-app.jpg)`,
        }}
      >
        <Header />
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            <Route path={"/about"} element={<AboutPage />} />
            <Route path={"/"} element={<MainPage />} />
          </Routes>
        </Suspense>
      </div>
    );
  }
}

export default App;
