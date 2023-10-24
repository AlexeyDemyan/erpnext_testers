export function getColumnNumbers(columnNames: string[], inputData: string) {
  let currentLine = 1;
  let headerLineNumber = 2;
  let inputDataColumnNames: string[] = [];
  let currentText = "";
  let columnNumbers: number[] = [];

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

  // console.log(`Column names are:`);
  // console.log(columnNames);

  // console.log("input data columns are");
  // console.log(inputDataColumnNames);

  columnNames.forEach((name) => {
    if (inputDataColumnNames.indexOf(name) !== -1) {
      columnNumbers.push(inputDataColumnNames.indexOf(name));
    }
  });

  return columnNumbers;
}
