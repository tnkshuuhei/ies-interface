import React from "react";

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

const reports = [
  {
    id: 1,
    title: "Q2 2024 Sales Report",
    date: "2024-06-30",
    type: "Quarterly",
  },
  {
    id: 2,
    title: "EcoTech Solutions Launch Analysis",
    date: "2024-05-15",
    type: "Product",
  },
  {
    id: 3,
    title: "Digital Marketing Campaign Results",
    date: "2024-06-01",
    type: "Marketing",
  },
  {
    id: 4,
    title: "Customer Retention Strategy",
    date: "2024-06-20",
    type: "Strategy",
  },
];
export default function ProjectDetailPage() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>$COMMONS</CardTitle>
            <Link href="https://app.hatsprotocol.xyz/trees/11155111/614">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                View on Hats tree
              </Button>
            </Link>
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
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">Project Manager</p>
              </div>
            </div>

            <div className="aspect-video relative">
              <Image
                src="https://picsum.photos/640/360"
                alt="Project Overview"
                className="rounded-lg object-cover w-full h-full"
                width={640}
                height={360}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold">Project Description</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The Q2 2024 sales initiative focuses on expanding our market
                reach through targeted digital marketing campaigns and the
                launch of our new product line, EcoTech Solutions. This project
                aims to capture a larger share of the eco-conscious consumer
                market while maintaining our core customer base.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Project Reports</h3>
              <ul className="space-y-4">
                {reports.map((report) => (
                  <li
                    key={report.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{report.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {report.date}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{report.type}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View All Reports</Button>
          <Button>Create New Report</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
