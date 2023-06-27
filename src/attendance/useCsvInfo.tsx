import React, { useMemo, useState } from "react";
import WhereToDownloadCsv from "./WhereToDownloadCsv";

function useCsvInfo() {
  const [showGuide, setShowGuide] = useState(false);
  const render = useMemo(() => (
    <WhereToDownloadCsv show={showGuide} onClose={() => setShowGuide(false)} />
  ), [showGuide])
  return {
    renderCsvInfo: render,
    setShow: setShowGuide,
  }
}

export default useCsvInfo;