import { z } from "zod";

export type HatsMetadata = {
  type: string;
  data: {
    name: string;
    description: string;
    responsibilities: any;
    authorities: any;
  };
};

export const projectSchema = z.object({
  name: z.string(),
  description: z.string().max(100),
});
export type Project = z.infer<typeof projectSchema>;

export interface ProjectCardProps {
  id: string;
  IES_id: string;
  hatId: any;
  name: string;
  metadata: string;
  owner: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}
