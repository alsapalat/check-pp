import React, { useRef } from 'react'
import { parse } from 'papaparse';
import buildData from './attendance/buildData';

const FileButton = ({ onFileImport }) => {
  const inputRef = useRef();
  return (
    <>
      <button type="button" onClick={() => {
        inputRef.current.click();
      }}>Select CSV File</button>
      <input className="hidden" ref={inputRef} type="file" onChange={(e) => {
        parse(e?.target?.files?.[0], {
          complete: (parsed) => {
            buildData(parsed.data)
              .then(onFileImport)
              .catch((err) => {
                alert(err.message);
              });
          }
        })
      }} accept=".csv" />
    </>
  )
}

export default FileButton