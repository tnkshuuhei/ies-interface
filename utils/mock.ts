export const defaultValues = {
  name: "Protocol Guild Analysis Report.",
  description:
    "## Protocol Guild Analysis Report\n## Executive Summary\nProtocol Guild has emerged as a crucial funding mechanism for Ethereum L1 development, having received over $100M in donations. This report analyzes its structure, impact, and financial metrics as of 2024.\n## Key Metrics\n- Total Members: 177\n- Total Donations Received: $100M+\n- Median Member Donation (Past 12 Months): $54,000\n- Projected Median Member Donation (Next 12 Months): $81,000\n- Vesting Timeline: 4 years\n- Committed Funds for Release: $57M\n## Membership Composition\n### Client Distribution\n- Core Ethereum Clients Represented:\n  - Geth\n  - EthereumJS\n  - Erigon\n  - Hyperledger Besu\n  - Lighthouse\n  - Lodestar\n  - Nethermind\n  - Prysm\n  - Reth\n  - Nimbus\n  - Teku\nClient teams comprise approximately 60% of total membership, with 6-15 contributors per client.\n### Notable Teams\n- Ethereum Foundation Application Research Group (ARG)\n- ethPandaOps\n- Ipsilon R&D\n- Portal Network\n- Protocol Support\n- Cryptography\n- Consensus R&D\n- Testing Teams\n## Major Donations Analysis\n### Top Contributors\n1. ether.fi - Committed 1% of token supply\n2. Taiko - Committed 1% of token supply\n3. LayerZero Foundation - $18.5M + matching up to $10M\n### Token Donations\n- Uniswap (UNI): 500,000 tokens\n- ENS: 200,000 tokens\n- Lido (LDO): 2 million tokens\n- Arbitrum (ARB): 3 million tokens\n### Institutional Support\n- Bitwise: 50% of Ethereum NFT ad revenue\n- VanEck: 10% of ETH futures ETF profits\n## Membership Requirements\n### Core Criteria\n1. Open Source Commitment\n   - Project/organization must be completely open source\n   - Regular active participation in Ethereum specifications\n2. Time Commitment\n   - Minimum 6 consecutive months of work\n   - Maximum 1 quarter interruption period\n   - Part-time contributions weighted accordingly\n3. Focus Areas\n   - Protocol specifications research\n   - Core protocol maintenance\n   - Feature prototyping\n   - Ethereum protocol calls participation\n## Financial Distribution Mechanism\n### Smart Contract Architecture\n- Primary Contract: 4-year vesting contract\n- Management: Splits smart contracts\n- Distribution: Pass-Through Wallet → Split Contract\n- Governance: DAOhaus Moloch V3 contract\n### Update Frequency\n- Quarterly updates to split contract\n- Reflects membership changes\n- Adjusts individual weight allocations\n## Future Projections\n- Vesting Schedule: $57M to be released over 4 years\n- Expected Annual Member Benefits: $500K-$1M (at 33-66% project adoption)\n- Growing institutional support trend\n- Expanding membership base\n## Recommendations for Projects\n1. Consider 1% token allocation to Protocol Guild\n2. Implement long-term vesting schedules\n3. Engage with governance processes\n4. Support ongoing development initiatives\n## Risks and Considerations\n1. Token price volatility impact on donation values\n2. Vesting period limitations\n3. Membership growth management\n4. Governance scalability\n---\n*Data sources: Protocol Guild documentation, Dune Analytics, public announcements as of 2024*",
  contributors: [
    { address: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614" as `0x${string}` },
    {
      address: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669" as `0x${string}`,
    },
  ],
  links: [
    { url: "https://dune.com/protocolguild/protocol-guild" },
    { url: "https://www.bitget.com/news/detail/12560604067048" },
  ],
  roles: [
    {
      parentHatId:
        "16796047185010987922379060937955525549013567220926743064122515022413824",
      name: "Developer",
      description: "Developers are responsible for building the protocol.",
      wearers: ["0xc3593524E2744E547f013E17E6b0776Bc27Fc614" as `0x${string}`],
      imageUrl: "ipfs://QmRZ9ULzLKC1uzAvLyxAAhYoXyQMS413zPviGLu6vG4Bzw",
    },
    {
      parentHatId:
        "16796047185010987922379060937955525549013567220926743064122515022413824",
      name: "Researcher",
      description: "Researchers are responsible for researching the protocol.",
      wearers: [
        "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
        "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
      ],
      imageUrl: "ipfs://QmTRGCnTfwHhyr64aSNZqpP68ABFNQu9W9TJZEo4vL3FRu",
    },
  ],
};
