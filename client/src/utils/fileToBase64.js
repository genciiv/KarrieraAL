export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // data:URL
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
