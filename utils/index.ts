export function sliceAddress(address: string) {
  if (typeof address !== "string") return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export async function fetchIPFSDATA(metadata: string) {
  try {
    const cid = metadata.replace(/^ipfs:\/\//, "");
    const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const readAsBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
  });
};
