// Fungsi utilitas untuk mengubah data URL menjadi File
const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(",");
  if (arr.length < 2 || !arr[0] || !arr[1]) {
    throw new Error("Invalid data URL format");
  }
  const mimeMatch = /:(.*?);/.exec(arr[0]);
  if (!mimeMatch?.[1]) {
    throw new Error("Could not determine MIME type from data URL");
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export default dataURLtoFile;
