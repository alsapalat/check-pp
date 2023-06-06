import { pick } from "lodash";

const requiredKeys = [
  'EN',
  'Last Name',
  'First Name',
  'Department',
  'Attendance Date',
  'Leave Type',
  'Leave Hours',
  'Holiday Type',
  'Holiday',
  'Actual Time In',
  'Actual Time In',
  'Required Work Hours',
  'Actual Hours Worked',
  'Actual Late',
  'Actual Undertime',
  'Approved Undertime',
  'Approved OT',
  'Billable Hours'
]

function arrayToObject(arr) {
  const [keys, ...values] = arr;
  return values.reduce((acc, curr) => {
    const obj = curr.reduce((a, c, i) => {
      a[keys[i]] = c;
      return a;
    }, {});
    acc.push(obj);
    return acc;
  }, []);
}

function clean(x) {
  return pick(x, requiredKeys);
}

async function buildData(raw: Array<any>) {
  const headers = raw[0];
  const fileCheck = requiredKeys.every(element => headers.includes(element));
  if (!fileCheck) throw new Error("Invalid file!");
  return arrayToObject(raw).map(clean);
}

export default buildData;