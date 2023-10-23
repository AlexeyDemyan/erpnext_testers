export function csvLinesToArrayOfArrays(inputData: string): string[][] {
  let lineItems: string[] = [];
  let lines: string[][] = [];

  let currentText = "";

  for (let character of inputData) {
    if (character === "\n") {
      if (lineItems.length > 0) {
        lineItems.push(currentText);
        lines.push(lineItems);
      }
      currentText = "";
      lineItems = [];
      continue;
    }

    if (character === ",") {
      lineItems.push(currentText);
      currentText = "";
    } else {
      currentText += character;
    }
  }
  return lines;
}
