"use client";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import Link from "next/link";

import ProjectCard from "@/components/ProjectCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

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
const ProjectCardSkeleton = () => {
  return (
    <div className="w-lg rounded-[15px] bg-white cursor-pointer shadow-lg">
      <AspectRatio ratio={18 / 9} className="bg-muted">
        <Skeleton className="w-full h-full rounded-md" />
      </AspectRatio>

      <div className="flex flex-col px-4 py-2 gap-2">
        <div className="flex flex-row items-center gap-2">
          <Skeleton className="h-[26px] w-3/4" />
        </div>
        <Skeleton className="h-[18px] w-full" />
        <Skeleton className="h-[22px] w-1/2" />
      </div>
    </div>
  );
};
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
    refetchInterval: 100,
  });

  if (isLoadingProfiles) {
    return (
      <main className="min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-12">
          {Array.from({ length: 12 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </main>
    );
  }

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
