export function readFile(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      res(reader.result);
    };
    reader.onerror = () => {
      rej(reader.statusText);
    };
    reader.readAsArrayBuffer(file);
  });
}
