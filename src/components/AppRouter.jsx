import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const ExampleAnalysis = lazy(() =>
  import("../pages/ExampleAnalysis/ExampleAnalysis")
);
const DataAnalysis = lazy(() => import("../pages/DataAnalysis/DataAnalysis"));
const DataAnalysisHome = lazy(() =>
  import("../pages/DataAnalysisHome/DataAnalysisHome")
);
const ExampleAnalysisHome = lazy(() =>
  import("../pages/ExampleAnalysisHome/ExampleAnalysisHome")
);
const PwdResetPage = lazy(() => import("../pages/PwdResetPage/PwdResetPage"));

// const HoughTransform = lazy(() =>
//   import("../pages/HoughTransform/HoughTransform")
// );
// const Hough3DTransform = lazy(() =>
//   import("../pages/Hough3DTransform/Hough3DTransform")
// );
// const Hough2DTrajectory = lazy(() =>
//   import("../pages/Hough2DTrajectory/Hough2DTrajectory")
// );
const VerifiedSuccess = lazy(() =>
  import("../pages/VerifySuccessPage/VerifySuccessPage")
);
const VerifiedError = lazy(() =>
  import("../pages/VerifyErrorPage/VerifyErrorPage")
);
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";

function AppRouter() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/example"
          element={
            <RestrictedRoute
              redirectTo="/data"
              component={<ExampleAnalysisHome />}
            />
          }
        />

        <Route
          path="/example/:id"
          element={
            <RestrictedRoute
              redirectTo="/data"
              component={<ExampleAnalysis />}
            />
          }
        />

        <Route
          path="/data"
          element={
            <PrivateRoute
              redirectTo="/example"
              component={<DataAnalysisHome />}
            />
          }
        />
        <Route
          path="/data/:id"
          element={
            <PrivateRoute redirectTo="/example" component={<DataAnalysis />} />
          }
        />
        <Route
          path="password/reset/:token"
          element={
            <RestrictedRoute redirectTo="/data" component={<PwdResetPage />} />
          }
        />
        {/* <Route path="/hough" element={<HoughTransform />} />
        <Route path="/hough3d" element={<Hough3DTransform />} />
        <Route path="/houghtracks" element={<Hough2DTrajectory />} /> */}
        <Route path="/verified-success" element={<VerifiedSuccess />} />
        <Route path="/verified-error" element={<VerifiedError />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
