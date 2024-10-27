import { toast } from "@/components/ui/use-toast";

interface Props {
  file: File;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  message?: string;
}

export async function pinToPinata({
  file,
  isLoading,
  setIsLoading,
  message,
}: Props) {
  try {
    setIsLoading(true);
    toast({ title: message || "Uploading to IPFS" });
    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({
      name: file.name,
    });

    formData.append("pinataMetadata", metadata);
    const options = JSON.stringify({
      cidVersion: 0,
    });

    formData.append("pinataOptions", options);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_API_JWT!}`,
      },
      body: formData,
    });

    const resData = await res.json();
    return resData.IpfsHash;
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}
