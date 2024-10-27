"use client";
import React from "react";

import { hatIdDecimalToIp, hatIdToTreeId } from "@hatsprotocol/sdk-v1-core";
import { useQueries, useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { ExternalLink, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import {
  fetchIPFSDATA,
  formatBlockTimestamp,
  getStatusColor,
  sliceAddress,
} from "@/utils";
import {
  ENDPOINT,
  initializedQuery,
  profileQuery,
  PROPOSAL_STATUS_QUERY,
  reportQuery,
  TALLY_API_ENDPOINT,
} from "@/utils/query";
import {
  InitializedData,
  Profile,
  ProfileData,
  ReportData,
  Reports,
} from "@/utils/types";

export default function ProjectDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const resolver = new ENSResolver();
  const [topHatTreeId, setTopHatTreeId] = React.useState<number>(0);
  const [hatIdIp, setHatIdIp] = React.useState<string>("");

  const { data: initilizedData } = useQuery({
    queryKey: ["initialized"],
    queryFn: async (): Promise<InitializedData> => {
      try {
        return await request(ENDPOINT, initializedQuery).then((res: any) => {
          const treeId = hatIdToTreeId(BigInt(res.initializeds[0]?.topHatId!));
          setTopHatTreeId(treeId);

          return res.initializeds[0];
        });
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching initialized data");
      }
    },
  });

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
        const avatar = await resolver.resolveENSAvatar(ownerENS!);

        const hatIdIp = hatIdDecimalToIp(BigInt(res.profileCreated.hatId));
        setHatIdIp(hatIdIp);

        newData = {
          ...res.profileCreated,
          imageURL: imageCID,
          hatsData: data,
          ownerENS: ownerENS,
          avatar: avatar,
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
    refetchInterval: 100,
  });

  const proposalQueries = useQueries({
    queries: (reportData ?? []).map((report) => ({
      queryKey: ["proposal", report.proposalId],
      queryFn: async () => {
        try {
          const response = await fetch(TALLY_API_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Api-key": process.env.NEXT_PUBLIC_TALLY_API_KEY as string,
            },
            body: JSON.stringify({
              query: PROPOSAL_STATUS_QUERY,
              variables: {
                input: {
                  onchainId: report.proposalId,
                  governorId: `eip155:11155111:${initilizedData?.governor}`,
                  includeArchived: true,
                  isLatest: true,
                },
              },
            }),
          });

          const data = await response.json();

          if (data.errors) {
            console.error("GraphQL Errors:", data.errors);
            throw new Error(data.errors[0].message);
          }

          return data.data.proposal;
        } catch (error) {
          console.error(
            "Error fetching proposal status for proposalId:",
            report.proposalId,
            {
              error,
              message: error instanceof Error ? error.message : "Unknown error",
            }
          );
          throw error;
        }
      },
      enabled: !!report.proposalId && !!initilizedData?.governor,
    })),
  });

  if (reportLoading || isLoading || !reportData || !data) {
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
  } else {
    return (
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{data?.hatsData?.data?.name}</CardTitle>
              <a
                href={`https://app.hatsprotocol.xyz/trees/11155111/${topHatTreeId}/?hatId=${hatIdIp}`}
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
                  <AvatarImage
                    src={data?.avatar || "/default-avatar.svg"}
                    alt="Author"
                  />
                  <AvatarFallback></AvatarFallback>
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
                  {data?.hatsData?.data?.description}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Project Reports</h3>
                <ul className="space-y-4">
                  {reportData?.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No reports submitted yet
                    </p>
                  ) : (
                    <>
                      {reportData?.map((report, index) => {
                        const proposalStatus =
                          proposalQueries[index]?.data?.status;
                        return (
                          <li
                            key={report.id}
                            className="flex items-center justify-between border rounded-lg p-4"
                          >
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">
                                  {report?.rawReportData?.name}
                                </p>
                                <div className="flex items-center gap-2">
                                  <p className="text-xs text-muted-foreground">
                                    {formatBlockTimestamp(
                                      report?.blockTimestamp
                                    )}
                                  </p>
                                  {proposalStatus && (
                                    <Badge
                                      variant="outline"
                                      className={getStatusColor(proposalStatus)}
                                    >
                                      {proposalStatus.toLowerCase()}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <a
                              href={`https://www.tally.xyz/gov/${process.env.NEXT_PUBLIC_TALLY}/proposal/${report?.proposalId}`}
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
                        );
                      })}
                    </>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">View All Reports</Button>
            <Link
              href={`/create/${data?.id}/${data?.hatId}`}
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
}
