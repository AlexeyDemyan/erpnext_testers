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
    outputText+= `${headerText[i]},${dataText[i]}\n`
  }

  return outputText;
}
