import React from "react";
import Main from "./components/Main";
// import { Suspense, lazy } from "react";
// import PageLoad from "./components/PageLoad";

// const Main = lazy(() => import("./components/Main"));

function App() {
  return (
    <Main />
    // <>
    // <Suspense fallback={<PageLoad />}>
    //   <Main />
    // </Suspense>
    // </>
  );
}

export default App;
