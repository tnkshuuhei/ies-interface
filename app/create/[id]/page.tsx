"use client";
import React from "react";

import { useQuery, QueryClient } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import Link from "next/link";

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT!;

export default function CreateReportPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const query = gql`
    {
      profileCreated(id: params.id) {
        id
        IES_id
        hatId
        name
        metadata
        owner
        blockNumber
        blockTimestamp
        transactionHash
      }
    }
  `;

  return <div>page</div>;
}
