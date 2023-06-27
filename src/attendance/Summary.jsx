import React, { useMemo } from 'react'
import { summarize } from './useAttendanceSummary';
import dayjs from 'dayjs';
import { orderBy } from 'lodash';

function Summary({ grouped, onSelect }) {
  const list = useMemo(() => {
    const sortedArray = orderBy(Object.values(grouped).map(summarize), ['name']);
    return sortedArray
  }, [grouped]);
  return (
    <div className="w-full relative min-h-[600px]">
      <div className="absolute inset-0 overflow-auto w-full block">
        <table className="ds-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Emp #</th>
              <th>Name</th>
              <th>Holidays</th>
              <th>Leaves</th>
              <th>OTs</th>
              <th>Lates</th>
              <th title="number of time-ins">Time Ins <sup>[i]</sup></th>
              <th title="incorrect time-in/out ratio">Over Hours <sup>[i]</sup></th>
              <th title="incorrect time-in/out ratio">Under Hours <sup>[i]</sup></th>
              <th>Average Hours Worked</th>
              <th className="freeze-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.employee_number}>
                <td>{dayjs(item.earliest_date).format('MMM YYYY')}</td>
                <td>{item.employee_number}</td>
                <td className="py-1">{item.name}</td>
                <td>{item.total_holiday}</td>
                <td>{item?.total_leaves}</td>
                <td>{item?.total_ot_count}</td>
                <td>{item?.total_leaves}</td>
                <td>{item?.time_in_count}</td>
                <td>{item?.hours?.over}</td>
                <td>{item?.hours?.under}</td>
                <td>{item?.average_hours_worked.toFixed(2)}</td>
                <td className="freeze-right">
                  <button className="sm" onClick={() => {
                    onSelect(item?.employee_number)
                  }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
  return (
    <div className="overflow-auto w-full block">
      <table className="ds-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Emp #</th>
            <th>Name</th>
            <th>Holidays</th>
            <th>Leaves</th>
            <th>OTs</th>
            <th>Lates</th>
            <th title="number of time-ins">Time Ins <sup>[i]</sup></th>
            <th title="incorrect time-in/out ratio">Over Hours <sup>[i]</sup></th>
            <th title="incorrect time-in/out ratio">Under Hours <sup>[i]</sup></th>
            <th>Average Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.employee_number}>
              <td>{dayjs(item.earliest_date).format('MMM YYYY')}</td>
              <td>{item.employee_number}</td>
              <td className="py-1"><a className="text-blue-600 underline" href="/" onClick={(e) => {
                e.preventDefault();
                onSelect(item?.employee_number)
              }}>{item.name}</a></td>
              <td>{item.total_holiday}</td>
              <td>{item?.total_leaves}</td>
              <td>{item?.total_ot_count}</td>
              <td>{item?.total_leaves}</td>
              <td>{item?.time_in_count}</td>
              <td>{item?.hours?.over}</td>
              <td>{item?.hours?.under}</td>
              <td>{item?.average_hours_worked.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Summary