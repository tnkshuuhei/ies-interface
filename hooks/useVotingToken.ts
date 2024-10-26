import { parseUnits } from "viem";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
  useAccount,
} from "wagmi";

import { useToast } from "@/components/ui/use-toast";

import { ies } from "@/constants/ies";
import { tokenConfig } from "@/constants/token";

export function useVotingToken() {
  const { toast } = useToast();
  const account = useAccount();
  const { data: approveHash, writeContractAsync: writeApprove } =
    useWriteContract();

  const allowance = useReadContract({
    address: tokenConfig.address,
    abi: tokenConfig.abi,
    functionName: "allowance",
    args: [account.address!, ies.address!],
    query: {
      refetchInterval: 1000,
    },
  });

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
    allowance,
  };
}
