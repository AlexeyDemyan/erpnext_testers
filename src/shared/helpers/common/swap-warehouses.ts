import { csvLinesToArrayOfArrays } from "../index.js";

// WIP: add better checks for warehouses

export function swapWarehouses(inputData: string): string[][] {
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

  for (let i = 0; i < csvLinesToArray.length; i++) {

  }

  console.log(warehouseIndexes);

  return [['libba']]
}
