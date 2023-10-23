import { stockEntryDictionary, stockEntryFixedHeaders } from "../const.js";

import { csvFileToArray } from "../index.js";

export function establishColumns(stockEntryHeaders: string): string[] {
  let columnsToTake = [];

  const arrayOfHeaders = csvFileToArray(stockEntryHeaders);

  for (let header of arrayOfHeaders) {
    if (header === "") {
      continue;
    }

    if (Object.keys(stockEntryFixedHeaders).includes(header))  {
      columnsToTake.push(stockEntryFixedHeaders[header]);
    } else if (Object.keys(stockEntryDictionary).includes(header)) {
      columnsToTake.push(stockEntryDictionary[header]);
    } else {
      console.error(`Header ${header} not found in any of the constants`);
    }
  }

  return columnsToTake;
}
