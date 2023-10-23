export function generateLinesForCSV(itemsData: string): string[][] {
  const dataLines = {
    firstLine: 8,
    lastLine: 9,
  };

  let lineItems: string[] = [];
  let lines: string[][] = [];

  let currentLine = 1;
  let currentText = "";

  for (let character of itemsData) {
    if (character === '"') {
      continue;
    }

    if (character === "\n") {
      if (lineItems.length > 0) {
        lines.push(lineItems);
      }
      lineItems = [];
      currentLine++;
      continue;
    }

    if (currentLine >= dataLines.firstLine) {
      if (character === ",") {
        lineItems.push(currentText);
        currentText = "";
      } else {
        currentText += character;
      }
    }
  }
  return lines;
}
