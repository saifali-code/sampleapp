import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { ROUTES } from "./routes";

const Loading = () => <div className="route-loading" role="status" aria-label="Loading page"><i /></div>;

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        {(location) => (
          <Suspense fallback={<Loading />}>
            <Routes location={location}>
              {ROUTES.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
            </Routes>
          </Suspense>
        )}
      </Layout>
    </BrowserRouter>
  );
}
