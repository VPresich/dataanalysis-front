import React from "react";
// import Loader from "../../components/UI/Loader/Loader";
import ExperimentNotSelected from "../../components/ExperimentNotSelected/ExperimentNotSelected";
import DocumentTitle from "../../components/DocumentTitle";

export default function DataAnalysisHome() {
  return (
    <React.Fragment>
      <DocumentTitle>Data Analysis Home</DocumentTitle>
      <ExperimentNotSelected />
    </React.Fragment>
  );
}
