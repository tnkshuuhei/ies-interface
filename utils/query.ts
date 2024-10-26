import { gql } from "graphql-request";

export const reportQuery = gql`
  query GetImpactReportCreateds($hatId: BigInt!) {
    impactReportCreateds(first: 5, where: { projectHatId: $hatId }) {
      id
      projectHatId
      reportHatId
      proposalId
      proposer
      reportMetadata
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

export const profileQuery = gql`
  query GetProfileCreated($id: ID!) {
    profileCreated(id: $id) {
      id
      IES_id
      hatId
      name
      metadata
      imageURL
      owner
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;
export const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT!;