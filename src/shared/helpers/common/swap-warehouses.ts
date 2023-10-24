import { csvLinesToArrayOfArrays } from "../index.js";

// WIP: add better checks for warehouses

export function swapWarehouses(inputData: string): string {
  const warehouseIndexes: number[] = [];

  const csvLinesToArray = csvLinesToArrayOfArrays(inputData);

  for (let i = 0; i < csvLinesToArray[0].length; i++) {
    if (
      csvLinesToArray[0][i].includes("warehouse") ||
      csvLinesToArray[0][i].includes("Warehouse")
    ) {
      warehouseIndexes.push(i);
    }
  }

  if (warehouseIndexes.length !== 2) {
    console.error('Found more than 2 warehouses in the header');
  }

  let bufferWarehouse = csvLinesToArray[0][warehouseIndexes[0]];
  csvLinesToArray[0][warehouseIndexes[0]] = csvLinesToArray[0][warehouseIndexes[1]];
  csvLinesToArray[0][warehouseIndexes[1]] = bufferWarehouse;

  let outputItems: string[] = [];

  csvLinesToArray.forEach((line) => {
    outputItems.push(line.join(','));
  })

  return outputItems.join('\n');

  // return csvLinesToArray.map((line) => {line.join(',')}).join('\n');
}
