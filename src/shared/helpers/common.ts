import { stockEntryDictionary, stockEntryFixedHeaders } from "./const.js";

function csvFileToArray(csvText: string): string[] {
  let outputArray = [];
  let currentText = "";

  for (let character of csvText) {
    if (character === '"') {
      continue;
    }

    if (character === "," || character === "\r" || character === "\n") {
      outputArray.push(currentText);
      currentText = "";
    } else {
      currentText += character;
    }
  }

  return outputArray;
}

export function filterByHeaders(inputData: string): string {
  return inputData;
}

export function establishColumns(stockEntryHeaders: string): string[] {
  let columnsToTake = [];

  const arrayOfHeaders = csvFileToArray(stockEntryHeaders);

  for (let header of arrayOfHeaders) {
    if (Object.keys(stockEntryFixedHeaders).includes(header) || header === "") {
      continue;
    }

    if (Object.keys(stockEntryDictionary).includes(header)) {
      columnsToTake.push(stockEntryDictionary[header]);
    } else {
      console.error(`Header ${header} not found in any of the constants`);
    }
  }

  return columnsToTake;
}

export function getColumnNumbers(columnNames: string[], inputData: string) {
  let currentLine = 1;
  let headerLineNumber = 2;
  let inputDataColumnNames: string[] = [];
  let currentText = "";
  let columnNumbers = [];

  for (let character of inputData) {
    if (character === '"') {
      continue;
    }

    if (currentLine === headerLineNumber) {
      if (character === ",") {
        inputDataColumnNames.push(currentText);
        currentText = "";
      } else {
        currentText += character;
      }
    }

    if (character === "\n") {
      currentLine++;
      continue;
    }

    if (currentLine > headerLineNumber) {
      break;
    }
  }
  console.log(columnNames);
  console.log(inputDataColumnNames);

  for (let column of inputDataColumnNames) {
    if (columnNames.includes(column)) {
      columnNumbers.push(inputDataColumnNames.indexOf(column))
    }
  }

  console.log(columnNumbers);
  return columnNumbers;
}

export function manipulateData(inputData: string): string {
  const headerLine = 2;
  const dataLine = 8;

  let headerText = [];
  let dataText = [];

  let currentLine = 1;
  let currentText = "";

  let outputText = "";

  for (let character of inputData) {
    if (character === '"') {
      continue;
    }

    if (currentLine === headerLine) {
      if (character === ",") {
        headerText.push(currentText);
        currentText = "";
      } else {
        currentText += character;
      }
    }

    if (currentLine === dataLine) {
      if (character === ",") {
        dataText.push(currentText);
        currentText = "";
      } else {
        currentText += character;
      }
    }

    if (character === "\n") {
      currentLine++;
    }
  }

  for (let i = 0; i < headerText.length; i++) {
    outputText += `${headerText[i]},${dataText[i]}\n`;
  }

  return outputText;
}
