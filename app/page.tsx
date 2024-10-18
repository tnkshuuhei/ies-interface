"use client";
import Link from "next/link";

import ProjectCard, { ProjectCardProps } from "@/components/ProjectCard";

const mockData: ProjectCardProps[] = [
  {
    id: "1",
    title: "Project 1",
    description: "Description 1",
    imageUrl: "https://picsum.photos/500/300",
    address: "0x1234567890abcdef",
    avatar: "https://picsum.photos/500/300",
    ens: "project1.eth",
    reportLength: 10,
  },
  {
    id: "2",
    title: "Project 2",
    description: "Description 2",
    imageUrl: "https://picsum.photos/500/300",
    address: "0x1234567890abcdef",
    avatar: "https://picsum.photos/500/300",
    ens: "project2.eth",
    reportLength: 20,
  },
  {
    id: "3",
    title: "Project 3",
    description: "Description 3",
    imageUrl: "https://picsum.photos/500/300",
    address: "0x1234567890abcdef",
    avatar: "https://picsum.photos/500/300",
    ens: "project3.eth",
    reportLength: 30,
  },
  {
    id: "4",
    title: "Project 4",
    description: "Description 4",
    imageUrl: "https://picsum.photos/500/300",
    address: "0x1234567890abcdef",
    avatar: "https://picsum.photos/500/300",
    ens: "project4.eth",
    reportLength: 40,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-12">
        {mockData.map((project, index) => (
          <Link href={`/project/${project.id}`} key={index}>
            <ProjectCard key={index} {...project} />
          </Link>
        ))}
      </div>
    </main>
  );
}
