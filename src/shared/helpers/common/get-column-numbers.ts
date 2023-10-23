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
      if (character === "," || character === "\r" || character === "\n") {
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
      columnNumbers.push(inputDataColumnNames.indexOf(column));
    }
  }

  console.log(columnNumbers);
  return columnNumbers;
}
