import React, { useMemo } from 'react'
import { summarize } from './useAttendanceSummary';
import dayjs from 'dayjs';
import { orderBy } from 'lodash';

type Props = {
  grouped: Record<string, any>
}

function Summary({ grouped, onSelect }) {
  const list = useMemo(() => {
    const sortedArray = orderBy(Object.values(grouped).map(summarize), ['name']);
    return sortedArray
  }, [grouped]);
  return (
    <div>
      <table className="table table-auto w-full text-left text-xs">
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
              <th>{dayjs(item.earliest_date).format('MMM YYYY')}</th>
              <th>{item.employee_number}</th>
              <th className="py-1"><a className="text-blue-600 underline" href="/" onClick={(e) => {
                e.preventDefault();
                onSelect(item?.employee_number)
              }}>{item.name}</a></th>
              <th>{item.total_holiday}</th>
              <th>{item?.total_leaves}</th>
              <th>{item?.total_ot_count}</th>
              <th>{item?.total_leaves}</th>
              <th>{item?.time_in_count}</th>
              <th>{item?.hours?.over}</th>
              <th>{item?.hours?.under}</th>
              <th>{item?.average_hours_worked.toFixed(2)}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Summary