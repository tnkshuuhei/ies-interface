import { parseUnits } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { useToast } from "@/components/ui/use-toast";

import { tokenConfig } from "@/constants/token";

export function useVotingToken() {
  const { toast } = useToast();
  const { data: approveHash, writeContractAsync: writeApprove } =
    useWriteContract();

  async function approve(to: `0x${string}`, amount: string) {
    const approvalAmount = parseUnits(amount, tokenConfig.decimals);

    await writeApprove(
      {
        address: tokenConfig.address,
        abi: tokenConfig.abi,
        functionName: "approve",
        args: [to, BigInt(approvalAmount)],
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
    isLoading: isApproving,
    isSuccess: isApproved,
    isError: IsErrorApproved,
  } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  return {
    approve,
    isApproving,
    isApproved,
    IsErrorApproved,
    approveHash,
  };
}
