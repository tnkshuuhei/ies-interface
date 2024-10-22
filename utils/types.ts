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
  imageURL: string;
  owner: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  ownerENS?: any;
}

export interface Profile {
  profileCreated: ProjectCardProps;
}

export interface ProfileData {
  id: string;
  IES_id: string;
  hatId: any;
  name: string;
  metadata: string;
  imageURL: string;
  hatsData: HatsMetadata;
  owner: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  ownerENS?: any;
}

export interface Profiles {
  profileCreateds: ProjectCardProps[];
}
