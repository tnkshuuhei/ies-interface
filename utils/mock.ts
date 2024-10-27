export const defaultValues = {
  name: "# Protcol Guild Impact Report.",
  description:
    "## Protocol Guild has distributed more than 33M dollars to Ethereum Core Developers and Researchers.",
  contributors: [
    { address: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614" },
    {
      address: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
    },
  ],
  links: [{ url: "https://dune.com/protocolguild/protocol-guild" }],
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
