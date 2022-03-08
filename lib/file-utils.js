
export const fileUtils = {
  readFileText
};

async function readFileText (file) {
  const promise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      resolve(text);
    };
    reader.readAsText(file);
  });
  return await promise;
}

