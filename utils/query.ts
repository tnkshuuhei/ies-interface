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
export const initializedQuery = gql`
  query GetInitialized {
    initializeds {
      id
      owner
      treasury
      governor
      token
      schemaUID
      topHatId
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

export const PROPOSAL_STATUS_QUERY = `
  query Proposal($input: ProposalInput!) {
    proposal(input: $input) {
      id
      status
      metadata {
        title
        description
      }
      voteStats {
        type
        votesCount
        votersCount
        percent
      }
    }
  }
`;

export const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT!;
export const TALLY_API_ENDPOINT = "https://api.tally.xyz/query";
