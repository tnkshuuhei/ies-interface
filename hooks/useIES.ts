import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { useToast } from "@/components/ui/use-toast";

import { ies } from "@/constants/ies";
import { Project } from "@/utils/types";

export function useIES() {
  const { toast } = useToast();
  const { data: registerHash, writeContract: register } = useWriteContract();

  function registerIES(
    data: Project,
    imageUrl: string,
    metadata: string,
    owner: `0x${string}`
  ) {
    register(
      {
        address: ies.address,
        abi: ies.abi,
        functionName: "registerProject",
        args: [data.name, imageUrl, metadata, owner],
      },
      {
        onSuccess: () => {
          toast({
            title: "Tx sent!",
            description: "Transaction successfully sent",
          });
        },
        onError: (e) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: e.message,
          });
        },
      }
    );
  }

  const {
    isLoading: isRegistering,
    isSuccess: isRegistered,
    isError: IsErrorRegistered,
  } = useWaitForTransactionReceipt({
    hash: registerHash,
  });

  return {
    registerIES,
    registerHash,
    isRegistering,
    isRegistered,
    IsErrorRegistered,
  };
}
