import React from "react";
import { Suspense, lazy } from "react";
import PageLoad from "./components/PageLoad";

const Main = lazy(() => import("./components/Main"));

function App() {
  return (
    <>
    <Suspense fallback={<PageLoad />}>
      <Main />
    </Suspense>
    </>
  );
}

export default App;
