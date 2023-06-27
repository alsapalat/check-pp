import { useState } from 'react';
import useCsvInfo from './attendance/useCsvInfo';
import AttendanceSummary from './AttendanceSummary';
import FileButton from './FileButton';


function App() {
  const [importData, setImportData] = useState(null);
  const { renderCsvInfo, setShow } = useCsvInfo();
  if (importData) return (
    <AttendanceSummary data={importData} onReplace={setImportData} />
  )
  return (
    <>
      <div className="m-auto bg-white p-10 rounded-lg shadow-card space-y-2.5 text-center flex flex-col items-center justify-center">
        <div><img className="w-[200px]" src="/images/logo.png" /></div>
        <div className="text-xl leading-6 font-bold text-primary">
          Attendance Summary
        </div>
        <div className="text-sm leading-4">
          To view your attendance data, simply import your CSV file
        </div>
        <div>
          <FileButton onFileImport={setImportData} />
        </div>
        <div>
          <a className="text-xs font-bold leading-4 text-primary hover:underline" href="/" onClick={(e) => {
            e.preventDefault();
            setShow(true);
          }}>
            (?) Where to get Attendance CSV
          </a>
        </div>
      </div>
      {renderCsvInfo}
    </>
  );
}

export default App
