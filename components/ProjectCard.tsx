"use client";

import React, { useEffect } from "react";

import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { fetchIPFSDATA, sliceAddress } from "@/utils";
import { HatsMetadata } from "@/utils/types";

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

export default function ProjectCard({
  id,
  IES_id,
  hatId,
  name,
  metadata,
  owner,
  blockNumber,
  blockTimestamp,
  transactionHash,
}: ProjectCardProps) {
  let addr = sliceAddress(owner);
  const [projectData, setProjectData] = React.useState<HatsMetadata | null>(
    null
  );

  useEffect(() => {
    async function fetchProjectData() {
      const projectData: HatsMetadata = await fetchIPFSDATA(metadata);
      console.log("projectData", projectData);
      setProjectData(projectData);
    }
    fetchProjectData();
  }, []);

  return (
    <div className="w-lg rounded-[15px] bg-white cursor-pointer shadow-lg">
      <AspectRatio ratio={18 / 9} className="bg-muted">
        <Image
          src={
            `https://ipfs.io/ipfs/${metadata}` ||
            "https://picsum.photos/500/300"
          }
          alt="Photo by Drew Beamer"
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>

      <div className="flex flex-col px-4 py-2 gap-2">
        <div className="flex flex-row items-center gap-2">
          <h3 className="font-epilogue font-semibold text-[16px] text-black text-left leading-[26px] truncate">
            {projectData?.data?.name}
          </h3>
        </div>
        <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
          {projectData?.data?.description}
        </p>
        <h4 className="font-epilogue font-semibold text-[14px] text-[#808191] leading-[22px]">
          0 reports submitted
        </h4>
      </div>
    </div>
  );
}
