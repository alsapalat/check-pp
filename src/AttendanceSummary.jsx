import React, { useState } from 'react'
import { HiBell, HiCalendar, HiCash, HiClock, HiEmojiHappy, HiEmojiSad, HiFire, HiLightningBolt, HiOutlineClock, HiOutlineLightningBolt } from 'react-icons/hi';
import useCsvInfo from './attendance/useCsvInfo';
import FileButton from './FileButton';
import useGroupByEmployee from './attendance/useGroupByEmployee';
import Summary from './attendance/Summary';
import useAttendanceSummary from './attendance/useAttendanceSummary';
import dayjs from 'dayjs';
import clsx from 'clsx';

function CountCard({ label, value, icon, negative = false }) {
  return (
    <div className="flex items-start shadow-count-card p-4 rounded-[10px]">
      <div className="flex-1 min-w-0 space-y-[6px]">
        <div className="text-[#67748E] font-semibold leading-[18px]">{label}</div>
        <div className="text-[#252F40] font-bold text-xl leading-6">{value}</div>
      </div>
      <div className={clsx("flex-shrink-0 inline-block p-2 rounded-lg text-white", negative ? 'bg-danger' : 'bg-primary')}>
        {icon}
      </div>
    </div>
  )
}

function AttendanceSummary({ data, onReplace }) {
  const { renderCsvInfo, setShow } = useCsvInfo();
  const [groupedByEmployee, employeeList] = useGroupByEmployee(data);
  const [selected, setSelected] = useState(null);
  const employee = useAttendanceSummary(groupedByEmployee[selected || '-']);
  if (selected) {
    return (
      <>
        <div className="bg-white shadow-card m-auto w-full max-w-[1200px] px-8 py-10 flex flex-col">
          <div className="flex items-center">
            <div className="mr-4">
              <button type="button" onClick={() => {
                setSelected(null);
              }}>Back</button>
            </div>
            <div className="text-xl leading-6 font-bold text-primary">
              Employee Attendance Summary
            </div>
            <div className="ml-auto text-xl leading-6 font-bold">
              {dayjs(employee.earliest_date).format('MMM DD, YYYY')} - {dayjs(employee.latest_date).format('MMM DD, YYYY')}
            </div>
          </div>
          <hr className="border-[#E4E4E4] my-6" />
          <div className="space-y-6">
            <div>
              <div className="font-bold text-[32px] leading-10">{employee.name}</div>
            </div>
            <div className="grid grid-cols-4 gap-x-5 gap-y-4">
              <CountCard label="Total Time In" value={employee.time_in_count} icon={<HiClock className="h-8 w-8" />} />
              <CountCard label="Total Lates" value={employee.total_late_count} icon={<HiEmojiSad className="h-8 w-8" />} negative />
              <CountCard label="Total Leaves" value={employee.total_leaves} icon={<HiCalendar className="h-8 w-8" />} />
              <CountCard label="Total Holidays" value={employee.total_holiday} icon={<HiEmojiHappy className="h-8 w-8" />} />

              <CountCard label="Earliest Time-in" value={employee.earliest_time_in} icon={<HiClock className="h-8 w-8" />} />
              <CountCard label="Most Late Time-In" value={employee.latest_time_in} icon={<HiBell className="h-8 w-8" />} negative />
              <CountCard label="Average Time-In" value={employee.average_time_in} icon={<HiOutlineClock className="h-8 w-8" />} />
              <CountCard label="Total OT Hours" value={`${employee.total_ot_hours.toFixed(2)}hrs`} icon={<HiEmojiSad className="h-8 w-8" />} />

              <CountCard label="Total OT Count" value={employee.total_ot_count} icon={<HiFire className="h-8 w-8" />} />
              <CountCard label="Total Work Hours" value={`${employee.total_hours.toFixed(2)}hrs`} icon={<HiLightningBolt className="h-8 w-8" />} />
              <CountCard label="Average Work Hours" value={`${employee.average_hours_worked.toFixed(2)}hrs`} icon={<HiOutlineLightningBolt className="h-8 w-8" />} />
              <CountCard label="Total Billable Hours" value={`${employee.total_billable_hours.toFixed(2)}hrs`} icon={<HiCash className="h-8 w-8" />} />
            </div>
            <div className="w-full relative min-h-[400px]">
              <div className="absolute inset-0 overflow-auto w-full block">
                <table className="ds-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th className="text-center">Time In</th>
                      <th className="text-center">Hours Worked</th>
                      <th className="text-center">Leave</th>
                      <th className="text-center">OT</th>
                      <th className="text-center">Late</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(employee?.dates_list || []).map((item, i) => (
                      <tr key={i}>
                        <td width="140px">{employee?.dates_label?.[i] || item}</td>
                        <td width="220px" className="text-center">
                          <div>
                            <div>{employee?.leaves_list?.[i]}</div>
                            <div>{employee?.holiday_list?.[i]}</div>
                            <div>{employee?.time_in_list?.[i]}</div>
                          </div>
                        </td>
                        <td className="text-center">{employee?.hours_worked_list?.[i]}</td>
                        <td className="text-center">{(employee?.leave_dates || []).includes(item) ? (<span>Yes ({employee?.leave_hours?.[i]}hrs)</span>) : ' '}</td>
                        <td className="text-center">{(employee?.ot_dates || []).includes(item) ? (<span>Yes ({employee?.ot_hours?.[i]}hrs)</span>) : ' '}</td>
                        <td className="text-center">{(employee?.late_dates || []).includes(item) ? 'Yes' : ' '}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="bg-white shadow-card m-auto w-full max-w-6xl px-8 py-10 flex flex-col">
        <div className="text-xl leading-6 font-bold text-primary mb-6">
          Team Attendance Summary ({employeeList.length})
        </div>
        <div className="mb-6">
          <Summary grouped={groupedByEmployee} onSelect={(x) => {
            setSelected(x);
          }} />
        </div>
        <div className="flex items-center justify-end space-x-4">
          <a className="text-xs font-bold leading-4 text-primary hover:underline" href="/" onClick={(e) => {
            e.preventDefault();
            setShow(true);
          }}>
            (?) Attendance CSV
          </a>
          <FileButton onFileImport={onReplace} />
        </div>
      </div>
      {renderCsvInfo}
    </>
  )
}

export default AttendanceSummary