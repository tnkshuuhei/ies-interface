export function sliceAddress(address: string) {
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
