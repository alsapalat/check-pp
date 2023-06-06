import { orderBy, uniqWith } from "lodash";
import { useMemo } from "react";

const formatLabel = (raw) => {
  return (`${raw?.['Last Name']} ${raw?.['First Name']} [${raw.EN}]`).toUpperCase()
}

type IList = Array<{ label: string, value: string }>;

function useGroupByEmployee(raw): [Record<string, any>, IList] {
  return useMemo(() => {
    if (!Array.isArray(raw)) return [{}, []];
    const obj = {};
    const list: IList = [];
    raw.map((x) => {
      if (!x.EN) return;
      const temp = [...(obj[x.EN] || [])];
      temp.push(x)
      obj[x.EN] = temp;
      list.push({ label: formatLabel(x), value: x.EN });
    })
    const sortedArray = orderBy(list, ['label']);
    const uniqueArray = uniqWith(sortedArray, (a, b) => a.label === b.label);
    return [obj, uniqueArray];
  }, [raw]);
}

export default useGroupByEmployee;
