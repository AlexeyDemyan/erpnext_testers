import { dataForFixedHeaders } from "../index.js";

export function generateOutputCSVFileFromArray(
  columnsToTake: string[],
  itemLines: string[][],
  columnNumbers: number[]
): string {

  let totalOutput = '';

  for (let column in columnsToTake) {
    if (Object.keys(dataForFixedHeaders).includes(columnsToTake[column])) {
      totalOutput+= `"${columnsToTake[column]}",`;
      console.log(`key of ${columnsToTake[column]} is ${dataForFixedHeaders[columnsToTake[column]]}`)
    }
  }

  console.log(`columnsToTake in generateOutputCSVFileFromArray`);
  console.log(columnsToTake);
  console.log(`first line of items in generateOutputCSVFileFromArray`);
  console.log(itemLines[0])
  console.log(`column numbers in generateOutputCSVFileFromArray`);
  console.log(columnNumbers);

  return totalOutput;
}
