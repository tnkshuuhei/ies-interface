import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { useToast } from "@/components/ui/use-toast";

import { ies } from "@/constants/ies";
import { Project } from "@/utils/types";

export function useIES() {
  const { toast } = useToast();
  const { data: registerHash, writeContract: register } = useWriteContract();
  const { data: reportHash, writeContract: createReport } = useWriteContract();

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

  function createImpactReport(
    projectHatId: bigint,
    contributors: `0x${string}`[],
    description: string,
    imageUrl: string,
    proposor: `0x${string}`,
    roleData: `0x${string}`[]
  ) {
    createReport(
      {
        abi: ies.abi,
        address: ies.address,
        functionName: "createReport",
        args: [
          projectHatId,
          contributors,
          description,
          imageUrl,
          proposor,
          roleData,
        ],
      },
      {
        onSuccess: () => {
          toast({
            title: "Tx sent!",
            description: "Transaction successfully sent",
          });
        },
        onError: (e) => {
          console.log(e.message);
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

  const {
    isLoading: isCreating,
    isSuccess: isCreated,
    isError: IsErrorCreated,
  } = useWaitForTransactionReceipt({
    hash: reportHash,
  });

  return {
    registerIES,
    registerHash,
    isRegistering,
    isRegistered,
    IsErrorRegistered,
    createImpactReport,
    reportHash,
    isCreating,
    isCreated,
    IsErrorCreated,
  };
}
