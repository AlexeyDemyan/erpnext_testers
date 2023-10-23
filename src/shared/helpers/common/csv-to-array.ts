export function csvFileToArray(csvText: string): string[] {
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
