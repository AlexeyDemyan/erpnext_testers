import { dataForFixedHeaders, stockEntryDictionary } from "../index.js";

export function generateCSVFile(
  columnsToTake: string[],
  itemLines: string[][],
  columnNumbers: number[]
): string {
  let firstLine: string[] = [];
  let totalOutput: string[] = [];
  let headersToInsert: string[] = [];

  for (let column in columnsToTake) {
    if (Object.keys(dataForFixedHeaders).includes(columnsToTake[column])) {
      firstLine.push(columnsToTake[column]);
      headersToInsert.push(dataForFixedHeaders[columnsToTake[column]]);
    } else if (
      Object.values(stockEntryDictionary).includes(columnsToTake[column])
    ) {
      for (let entry of Object.entries(stockEntryDictionary)) {
        if (entry[1] === columnsToTake[column]) {
          firstLine.push(entry[0]);
        }
      }
    } else {
      console.error(`column is missing in all constant dictionaries`);
    }
  }

  totalOutput.push(firstLine.map((entry) => `"${entry}"`).join(","));

  for (let i = 0; i < itemLines.length; i++) {
    let line: string[] = [];

    if (i === 0) {
      line = [...headersToInsert];
      columnNumbers.forEach((elt) => {
        line.push(itemLines[i][elt]);
      });
    } else {
      line = [];
      headersToInsert.forEach(() => {
        line.push("");
      });
      columnNumbers.forEach((elt) => {
        line.push(itemLines[i][elt]);
      });
    }
    totalOutput.push(line.map((entry) => `"${entry}"`).join(","));
  }

  return totalOutput.map((line) => `${line}`).join("\n");
}
