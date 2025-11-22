import { createSelector } from "@reduxjs/toolkit";

export const selectSources = (state) => state.sources.items;
export const selectIsLoading = (state) => state.sources.selectIsLoading;
export const selectUploadProgress = (state) => state.sources.uploadProgress;

export const selectSourceNumbers = createSelector([selectSources], (sources) =>
  sources.map((source) => source.source_number)
);

export const selectSourceByNumber = (sourceNumber) =>
  createSelector([selectSources], (sources) =>
    sources.find((source) => source.source_number === sourceNumber)
  );
