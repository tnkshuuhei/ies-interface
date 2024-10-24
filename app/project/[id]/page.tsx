"use client";
import React from "react";

import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { ExternalLink, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { ENSResolver } from "@/lib/ens";
import { fetchIPFSDATA, formatBlockTimestamp, sliceAddress } from "@/utils";
import { Profile, ProfileData, ReportData, Reports } from "@/utils/types";

const reportQuery = gql`
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

const profileQuery = gql`
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
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT!;

export default function ProjectDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const resolver = new ENSResolver();

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", params.id],
    queryFn: async (): Promise<ProfileData> => {
      try {
        const res: Profile = await request(ENDPOINT, profileQuery, {
          id: params.id,
        });

        const metadata = res.profileCreated.metadata;
        const data = await fetchIPFSDATA(metadata);

        let newData: ProfileData;
        const imageCID = res.profileCreated.imageURL.replace(/^ipfs:\/\//, "");
        const ownerENS = await resolver.resolveAddress(
          res.profileCreated.owner
        );

        newData = {
          ...res.profileCreated,
          imageURL: imageCID,
          hatsData: data,
          ownerENS: ownerENS,
        };
        return newData;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching profile");
      }
    },
    enabled: !!params.id,
  });

  const {
    data: reportData,
    isLoading: reportLoading,
    error: reportError,
  } = useQuery({
    queryKey: ["reports", data?.hatId],
    queryFn: async (): Promise<ReportData[]> => {
      try {
        const res: Reports = await request(ENDPOINT, reportQuery, {
          hatId: data?.hatId,
        });

        for (let i = 0; i < res.impactReportCreateds.length; i++) {
          const metadata = res.impactReportCreateds[i].reportMetadata;
          const data = await fetchIPFSDATA(metadata);
          res.impactReportCreateds[i].rawReportData = data;
        }

        return res.impactReportCreateds;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching reports");
      }
    },
    enabled: !!data?.hatId,
  });
  if (reportLoading || isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-9 w-36" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Avatar and Name Skeleton */}
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              {/* Image Skeleton */}
              <div className="aspect-video relative">
                <Skeleton className="w-full h-full rounded-lg" />
              </div>

              {/* Description Skeleton */}
              <div>
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>

              <Separator />

              {/* Reports Section Skeleton */}
              <div>
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-5 w-5" />
                        <div>
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24 mt-1" />
                        </div>
                      </div>
                      <Skeleton className="h-9 w-28" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-32" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{data?.hatsData.data.name}</CardTitle>
            <a
              href={`${process.env.NEXT_PUBLIC_HATS_URL!}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                View on Hats tree
              </Button>
            </a>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://picsum.photos/500/300" alt="Author" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  {data?.ownerENS || sliceAddress(data?.owner!)}
                </p>
                {data?.ownerENS && (
                  <p className="text-sm text-muted-foreground">
                    {sliceAddress(data?.owner!)}
                  </p>
                )}
              </div>
            </div>

            <div className="aspect-video relative">
              <Image
                src={
                  `https://ipfs.io/ipfs/${data?.imageURL}` ||
                  "https://picsum.photos/640/360"
                }
                alt="Project Overview"
                className="rounded-lg object-cover w-full h-full"
                width={640}
                height={360}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold">Project Description</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {data?.hatsData.data.description}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Project Reports</h3>
              <ul className="space-y-4">
                {reportData?.map((report) => (
                  <li
                    key={report.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {report.rawReportData.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatBlockTimestamp(report.blockTimestamp)}
                        </p>
                      </div>
                    </div>
                    <a
                      href={`https://www.tally.xyz/gov/${process.env.NEXT_PUBLIC_TALLY}/proposal/${report.proposalId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View on Tally
                      </Button>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View All Reports</Button>
          <Link
            href={`/create/${data?.hatId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Create New Report</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
