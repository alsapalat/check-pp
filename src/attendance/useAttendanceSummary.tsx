import { useMemo } from "react";
import dayjs from 'dayjs';

function averageHours(arrRaw) {
  const arr = arrRaw.filter((x) => x > 0);
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}

function analyzeTimes(timeArrayRaw) {
  const timeArray = timeArrayRaw.filter((x) => x);
  // Extract total seconds from each time value and find earliest and latest
  var earliestSeconds = Infinity;
  var latestSeconds = -Infinity;
  for (var i = 0; i < timeArray.length; i++) {
    var timeParts = timeArray[i].split(":");
    var totalSeconds = Number(timeParts[0]) * 3600 + Number(timeParts[1]) * 60 + Number(timeParts[2]);
    if (totalSeconds < earliestSeconds) {
      earliestSeconds = totalSeconds;
    }
    if (totalSeconds > latestSeconds) {
      latestSeconds = totalSeconds;
    }
  }

  // Calculate earliest and latest time strings
  var earliestTime = secondsToTimeString(earliestSeconds);
  var latestTime = secondsToTimeString(latestSeconds);

  // Calculate average time string
  var averageTime = secondsToTimeString(Math.round((earliestSeconds + latestSeconds) / 2));

  // Return an object with the results
  return {
    earliest_time_in: earliestTime,
    latest_time_in: latestTime,
    average_time_in: averageTime
  };
}

function secondsToTimeString(totalSeconds) {
  // Convert total seconds to time string format
  var hh = Math.floor(totalSeconds / 3600);
  var mm = Math.floor((totalSeconds % 3600) / 60);
  var ss = Math.floor(totalSeconds % 60);
  return hh + ":" + mm.toString().padStart(2, "0") + ":" + ss.toString().padStart(2, "0");
}

export const summarize = (raw: any) => {
  if (!raw) return undefined;
  let total_leaves = 0;
  let leaves_list: any[] = [];
  let leave_dates: any[] = [];
  let leave_hours: any[] = [];
  let total_holiday = 0;
  let days_count = 0
  let total_hours = 0;
  let hours_worked_list: any[] = [];
  let total_late_count = 0;
  let total_late_hours = 0;
  let dates_list: any[] = [];
  let dates_label: any[] = [];
  let late_dates: any[] = [];
  let total_billable_hours = 0;
  let time_in_list: any[] = [];
  let holiday_list: any[] = [];
  let total_ot_count = 0;
  let total_ot_hours = 0;
  let ot_dates: any[] = [];
  let ot_hours: any[] = [];
  raw.map((item) => {
    if (item['Leave Type']) {
      total_leaves +=1;
      leave_dates.push(item['Attendance Date'])
    }
    leaves_list.push(item['Leave Type']);
    leave_hours.push(item['Leave Hours'])
    if (item['Holiday']) total_holiday += 1;
    days_count += 1;
    const _hours_worked = +(item['Actual Hours Worked'] || "0")
    total_hours += _hours_worked;
    hours_worked_list.push(+(item['Actual Hours Worked'] || "0"))
    dates_list.push(item['Attendance Date'])
    dates_label.push(dayjs(item['Attendance Date']).format('MMM DD(ddd)'))

    const _late = +(item['Actual Late'] || "0");
    total_late_hours += _late;
    if (_late > 0) {
      total_late_count += 1;
      late_dates.push(item['Attendance Date'])
    }

    total_billable_hours += +(item['Billable Hours'] || "0");
    time_in_list.push((item['Actual Time In'] || "").substring(12,20))
    holiday_list.push((item['Holiday']))

    const _ot = +(item['Approved OT'] || "0");
    if (_ot > 0) {
      total_ot_count += 1;
      ot_dates.push(item['Attendance Date']);
    }
    ot_hours.push(_ot);
    total_ot_hours += +(item['Approved OT'] || "0");
  });
  const {
    earliest_time_in,
    latest_time_in,
    average_time_in,
  } = analyzeTimes(time_in_list);
  const time_in_count = time_in_list.filter((x) => x).length;
  const earliest_date = raw[0]?.['Attendance Date']
  const latest_date = raw[raw.length - 1]?.['Attendance Date']

  const hours = (() => {
    let under = 0; // < 8.50
    let normal = 0; // 8.51 ~ 10
    let over = 0; // > 10.0
    const arr = hours_worked_list.filter((x) => x > 0);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < 8.5) {
        under += 1;
        continue;
      }
      if (arr[i] > 10) {
        over += 1;
        continue;
      }
      normal += 1;
    }
    return {
      under,
      normal,
      over,
    }
  })();

  return {
    name: (`${raw?.[0]?.['First Name']} ${raw?.[0]?.['Last Name']}`).toUpperCase(),
    employee_number: raw?.[0]?.['EN'],
    total_leaves,
    leaves_list,
    leave_dates,
    leave_hours,
    total_holiday,
    days_count,
    total_hours,
    hours_worked_list,
    hours,
    average_hours_worked: averageHours(hours_worked_list),
    total_late_count,
    total_late_hours,
    dates_list,
    dates_label,
    late_dates,
    total_billable_hours,
    time_in_list,
    time_in_count,
    holiday_list,
    total_ot_count,
    total_ot_hours,
    ot_hours,
    ot_dates,
    earliest_time_in,
    latest_time_in,
    average_time_in,
    earliest_date,
    latest_date,
  };
}

function useAttendanceSummary(raw: any | undefined) {
  const data = useMemo(() => summarize(raw), [raw]);
  return data;
}

export default useAttendanceSummary;