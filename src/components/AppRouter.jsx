import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const DataAnalysis = lazy(() =>
  import("../pages/ExampleAnalysis/ExampleAnalysis")
);
const HoughTransform = lazy(() =>
  import("../pages/HoughTransform/HoughTransform")
);
const Hough3DTransform = lazy(() =>
  import("../pages/Hough3DTransform/Hough3DTransform")
);
const Hough2DTrajectory = lazy(() =>
  import("../pages/Hough2DTrajectory/Hough2DTrajectory")
);
const VerifiedSuccess = lazy(() =>
  import("../pages/VerifiedSuccessPage/VerifiedSuccessPage")
);
const VerifiedError = lazy(() =>
  import("../pages/VerifiedErrorPage/VerifiedErrorPage")
);

import Loader from "../components/UI/Loader/Loader";
// import PrivateRoute from "./PrivateRoute";

function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/data" element={<DataAnalysis />} />
        <Route path="/hough" element={<HoughTransform />} />
        <Route path="/hough3d" element={<Hough3DTransform />} />
        <Route path="/houghtracks" element={<Hough2DTrajectory />} />
        {/* <Route
          path="/favorites"
          element={<PrivateRoute redirectTo="/" component={<Favorites />} />}
        /> */}
        <Route path="/verified-success" element={<VerifiedSuccess />} />
        <Route path="/verified-error" element={<VerifiedError />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
