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

export const formatBlockTimestamp = (blockTimestamp: string): string => {
  // Convert string to number and multiply by 1000 to get milliseconds
  const date = new Date(Number(blockTimestamp) * 1000);

  // Get month, day, and year
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 because months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  // Return formatted date string
  return `${month}/${day}/${year}`;
};

export const getStatusColor = (status: string) => {
  const colors = {
    ACTIVE: "bg-blue-100 text-blue-800 border-blue-200",
    PENDING: "bg-gray-100 text-gray-800 border-gray-200",
    SUCCEEDED: "bg-green-100 text-green-800 border-green-200",
    QUEUED: "bg-yellow-100 text-yellow-800 border-yellow-200",
    EXECUTED: "bg-purple-100 text-purple-800 border-purple-200",
    DEFEATED: "bg-red-100 text-red-800 border-red-200",
    EXPIRED: "bg-gray-100 text-gray-800 border-gray-200",
    CANCELED: "bg-red-100 text-red-800 border-red-200",
  };
  return colors[status as keyof typeof colors] || colors.PENDING;
};
