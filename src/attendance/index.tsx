import React, { useState } from 'react'
import { parse } from 'papaparse';
import WhereToDownloadCsv from './WhereToDownloadCsv';
import useGroupByEmployee from './useGroupByEmployee';
import buildData from './buildData';
import useAttendanceSummary from './useAttendanceSummary';
import Info from './Info';
import Summary from './Summary';

function Attendance() {
  const [raw, setRaw] = useState(null);
  const [groupedByEmployee, employeeList] = useGroupByEmployee(raw);
  const [showGuide, setShowGuide] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const count = employeeList.length;

  const data = useAttendanceSummary(groupedByEmployee[selected || '-']);

  const [tab, setTab] = useState<'summary' | 'individual'>('summary');

  return (
    <>
      <WhereToDownloadCsv show={showGuide} onClose={() => setShowGuide(false)} />
      <div className="space-y-4">
        <div className="flex space-x-4">
          <label>
            <span className="font-bold mr-3">Import Attendance Summary CSV</span>
            {!raw ? <input type="file" onChange={(e) => {
              parse(e?.target?.files?.[0], {
                complete: (parsed) => {
                  buildData(parsed.data)
                    .then(setRaw)
                    .catch((err) => {
                      alert(err.message);
                    });
                }
              })
            }} accept=".csv" /> : (
              <button type="button" onClick={() => setRaw(null)}>Replace File</button>
            )}
          </label>
          <div>
            <a className="text-blue-600 underline" href="/" onClick={(e) => {
              e.preventDefault();
              setShowGuide(true);
            }}>(?) Where to get Attendance CSV</a>
          </div>
        </div>
        {/* <div className="border-b">
          <button type="button" onClick={() => setTab('summary')}>Summary {tab === 'summary' ? '(Selected)' : ''}</button>
          <button type="button" onClick={() => setTab('individual')}>Individual {tab === 'individual' ? '(Selected)' : ''}</button>
        </div> */}
        {tab === 'individual' ? (
          <>
            <div>
              <button type="button" onClick={() => setTab('summary')}>Go Back</button>
            </div>
            {/* <div className="flex space-x-4 items-center">
              <select className="form-select" title="employee-dropdown" onChange={(e) => {
                setSelected(e?.target?.value);
              }}>
                <option value="">- Select Employee - </option>
                {employeeList.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
              <div className="text-lg font-bold">{count} Employee(s)</div>
            </div>
            <div>
              File Info: - no import file -
            </div> */}
            {!selected ? (
              <div>
                <div className="text-2xl font-bold text-slate-400">No Selected</div>
              </div>
            ) : (
              <div>
                <div className="text-2xl font-bold mb-3 uppercase">{data?.name}&apos;s Summary for {data?.earliest_date} ~ {data?.latest_date}</div>
                <div className="grid grid-cols-4 gap-3">
                  <Info label="Total Time In">{data?.time_in_count}</Info>
                  <Info label="Average Time-In">{data?.average_time_in}</Info>
                  <Info label="Earliest Time-In">{data?.earliest_time_in}</Info>
                  <Info label="Most late Time-In">{data?.latest_time_in}</Info>
                  <Info label="Total Lates">{data?.total_late_count}</Info>
                  <Info label="Total Hours (Worked)">{data?.total_hours.toFixed(2)}hrs</Info>
                  <Info label="Total Hours (Billable)">{data?.total_billable_hours}hrs</Info>
                  <Info label="Total Hours (OT)">{data?.total_ot_hours}hrs</Info>
                  <Info label="Total OT Count">{data?.total_ot_count}</Info>
                  <Info label="Total Leaves">{data?.total_leaves}</Info>
                  <Info label="Total Holidays">{data?.total_holiday}</Info>
                  <Info label="Average Hours Worked">{data?.average_hours_worked.toFixed(2)}</Info>
                </div>
                <table className="table-fixed w-full">
                  <thead>
                    <tr>
                      <th className="text-center border">Date</th>
                      <th className="text-center border">Time In</th>
                      <th className="text-center border">Hours Worked</th>
                      <th className="text-center border">Leave</th>
                      <th className="text-center border">OT</th>
                      <th className="text-center border">Late</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data?.dates_list || []).map((item, i) => (
                      <tr key={i}>
                        <td className="text-center border">{data?.dates_label?.[i] || item}</td>
                        <td className="text-center border space-x-1">
                          <span>{data?.leaves_list?.[i]}</span>
                          <span>{data?.holiday_list?.[i]}</span>
                          <span>{data?.time_in_list?.[i]}</span>
                        </td>
                        <td className="text-center border">{data?.hours_worked_list?.[i]}</td>
                        <td className="text-center border">{(data?.leave_dates || []).includes(item) ? (<span>Yes ({data?.leave_hours?.[i]}hrs)</span>) : ' '}</td>
                        <td className="text-center border">{(data?.ot_dates || []).includes(item) ? (<span>Yes ({data?.ot_hours?.[i]}hrs)</span>) : ' '}</td>
                        <td className="text-center border">{(data?.late_dates || []).includes(item) ? 'Yes' : ' '}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : null}
        {tab === 'summary' ? (
          <div>
            <Summary grouped={groupedByEmployee} onSelect={(x) => {
              setTab('individual');
              setSelected(x);
            }} />
          </div>
        ) : null}
      </div >
    </>
  )
}

export default Attendance