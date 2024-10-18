import React from "react";

import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import sliceAddress from "@/utils";

export interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  address: `0x${string}`;
  avatar: string;
  ens: string;
  reportLength: number;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  address,
  avatar,
  ens,
  reportLength,
}: ProjectCardProps) {
  let addr = ens ? ens : sliceAddress(address);

  return (
    <div className="w-[400px] rounded-[15px] bg-white cursor-pointer shadow-lg">
      <AspectRatio ratio={18 / 9} className="bg-muted">
        <Image
          src={imageUrl || "https://picsum.photos/500/300"}
          alt="Photo by Drew Beamer"
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>

      <div className="flex flex-col px-4 py-2 gap-2">
        <div className="flex flex-row items-center gap-2">
          <Avatar>
            <AvatarImage src={avatar || "https://picsum.photos/500/300"} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <h3 className="font-epilogue font-semibold text-[16px] text-black text-left leading-[26px] truncate">
            {title}
          </h3>
        </div>
        <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
          {description}
        </p>
        <h4 className="font-epilogue font-semibold text-[14px] text-[#808191] leading-[22px]">
          {reportLength} reports submitted
        </h4>
      </div>
    </div>
  );
}
