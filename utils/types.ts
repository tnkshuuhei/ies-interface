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
  name: z
    .string()
    .min(1, {
      message: "Name must be at least 1 character long",
    })
    .max(20, {
      message: "Name must be less than 20 characters long",
    }),

  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters long",
    })
    .max(1000, {
      message: "Description must be less than 1000 characters long",
    }),
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
  avatar?: any;
}

export interface Reports {
  impactReportCreateds: ReportData[];
}

export interface ReportData {
  id: string;
  projectHatId: string;
  reportHatId: string;
  proposalId: string;
  proposer: string;
  reportMetadata: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  rawReportData: {
    name: string;
    description: string;
    contributores: {
      address: string;
    }[];
    links?: {
      url: string;
    }[];
    roles?: any;
  };
}

export interface Profiles {
  profileCreateds: ProjectCardProps[];
}

export interface RoleImage {
  file: File;
  preview: string;
  name: string;
}

export interface InitializedData {
  id: string;
  owner: string;
  treasury: string;
  governor: string;
  token: string;
  schemaUID: string;
  topHatId: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}
