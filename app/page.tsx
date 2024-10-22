"use client";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import Link from "next/link";

import ProjectCard from "@/components/ProjectCard";

import { Profiles } from "@/utils/types";

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT!;

const query = gql`
  {
    profileCreateds(first: 12) {
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

export default function Home() {
  const {
    data: profiles,
    isLoading: isLoadingProfiles,
    error: errorFetchingProfiles,
  } = useQuery<Profiles>({
    queryKey: ["profiles"],
    async queryFn() {
      try {
        return await request(ENDPOINT, query);
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching profiles");
      }
    },
  });

  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-12">
        {profiles?.profileCreateds.map((project, index) => (
          <Link href={`/project/${project.id}`} key={index}>
            <ProjectCard key={index} {...project} />
          </Link>
        ))}
      </div>
    </main>
  );
}
