"use client";

import React, { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { fetchIPFSDATA, sliceAddress } from "@/utils";
import { ENDPOINT, reportQuery } from "@/utils/query";
import { HatsMetadata, ProjectCardProps } from "@/utils/types";

export default function ProjectCard({
  hatId,
  metadata,
  imageURL,
  owner,
}: ProjectCardProps) {
  let addr = sliceAddress(owner);
  const [projectData, setProjectData] = React.useState<HatsMetadata | null>(
    null
  );
  const cid = imageURL.replace(/^ipfs:\/\//, "");

  useEffect(() => {
    async function fetchProjectData() {
      const projectData: HatsMetadata = await fetchIPFSDATA(metadata);
      setProjectData(projectData);
    }
    fetchProjectData();
  }, [metadata]);

  const { data: reportData } = useQuery({
    queryKey: ["reports", hatId],
    queryFn: async () => {
      try {
        return await request(ENDPOINT, reportQuery, {
          hatId: hatId,
        }).then((data: any) => data.impactReportCreateds);
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching reports");
      }
    },
    enabled: !!hatId,
  });
  return (
    <div className="w-lg rounded-[15px] bg-white cursor-pointer shadow-lg">
      <AspectRatio ratio={18 / 9} className="bg-muted">
        <Image
          src={`https://ipfs.io/ipfs/${cid}` || "https://picsum.photos/500/300"}
          alt="project image"
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
          {reportData.length || "0"} reports submitted
        </h4>
      </div>
    </div>
  );
}
