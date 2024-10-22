"use client";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ethers } from "ethers";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

import { useIES } from "@/hooks/useIES";
import { readAsBase64 } from "@/utils";
import { pinToPinata } from "@/utils/pinata";
import { HatsMetadata, Project, projectSchema } from "@/utils/types";

interface Role {
  parentHatId: bigint;
  metadata: string;
  name: string;
  description: string;
  wearer: `0x${string}`[];
  imageUrl: string;
}

export default function Register({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [imageName, setImageName] = useState<string | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const account = useAccount();
  const AbiCoder = new ethers.AbiCoder();
  const {
    createImpactReport,
    reportHash,
    isCreating,
    isCreated,
    IsErrorCreated,
  } = useIES();

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file: File | null = e.target.files[0];
      const base64 = await readAsBase64(file);
      setImageName(file ? file.name : null);
      setFile(file);
      setImage(base64);
    }
  };

  const form = useForm<Project>({
    resolver: zodResolver(projectSchema),
    mode: "onChange",
  });

  async function onSubmit(data: Project) {
    if (!file) return alert("Please upload an image");
    const { name, description } = data;

    const metadata: HatsMetadata = {
      type: "1.0",
      data: {
        name,
        description,
        responsibilities: [],
        authorities: [],
      },
    };

    const tiem = new Date().getTime();
    const metadataFile = new File([JSON.stringify(metadata)], `${tiem}.json`);

    const projectCID = await pinToPinata({
      file: metadataFile,
      isLoading: isLoading,
      setIsLoading: setIsLoading,
    });

    console.log("✅ Project CID", projectCID);

    const imageCID = await pinToPinata({ file, isLoading, setIsLoading });
    console.log("✅ Image CID", imageCID);

    const roles: Role[] = [
      {
        parentHatId: BigInt(params.id),
        metadata: "ipfs://QmQh48H7yrw6i5PQANXbSTyC4D7WLLUUn5V4Pv1Hwo2M68",
        name: "Researcher Role",
        description: "Researcher role",
        wearer: [account.address!],
        imageUrl: "ipfs://QmTRGCnTfwHhyr64aSNZqpP68ABFNQu9W9TJZEo4vL3FRu",
      },
      {
        parentHatId: BigInt(params.id),
        metadata: "ipfs://Qma89Row648R7vpPzis2qpz3a9SZAmTR5pEGCYPM2FXH9J",
        name: "Developer",
        description: "The developer role",
        wearer: [account.address!],
        imageUrl: "ipfs://QmRZ9ULzLKC1uzAvLyxAAhYoXyQMS413zPviGLu6vG4Bzw",
      },
    ];

    const role1 = AbiCoder.encode(
      ["tuple(uint256, string, string, string, address[], string)"],
      [
        [
          BigInt(params.id),
          "ipfs://QmQh48H7yrw6i5PQANXbSTyC4D7WLLUUn5V4Pv1Hwo2M68",
          "Researcher Role",
          "Researcher role",
          [account.address!, "0x06aa005386F53Ba7b980c61e0D067CaBc7602a62"],
          "ipfs://QmTRGCnTfwHhyr64aSNZqpP68ABFNQu9W9TJZEo4vL3FRu",
        ],
      ]
    );

    console.log("✅ Role 1", role1);

    const role2 = AbiCoder.encode(
      ["tuple(uint256, string, string, string, address[], string)"],
      [
        [
          BigInt(params.id),
          "ipfs://Qma89Row648R7vpPzis2qpz3a9SZAmTR5pEGCYPM2FXH9J",
          "Developer",
          "The developer role",
          [account.address!],
          "ipfs://QmRZ9ULzLKC1uzAvLyxAAhYoXyQMS413zPviGLu6vG4Bzw",
        ],
      ]
    );
    console.log("✅ Role 2", role2);

    createImpactReport(
      BigInt(params.id),
      [account.address!, "0x06aa005386F53Ba7b980c61e0D067CaBc7602a62"],
      "first report",
      "ipfs://QmaUeuCCPvyViz8fBQM3BRuqsSPYPWYUAiD6Ai76q2P9ok",
      account.address!,
      [role1 as `0x${string}`]
    );
  }

  useEffect(() => {
    if (isCreated) {
      toast({
        title: "Impact report created!",
        description: "impact report has been successfully created",
        action: (
          <ToastAction
            altText="Copy to clipboard"
            onClick={() => {
              navigator.clipboard.writeText(
                `${account.chain?.blockExplorers?.default.url}/tx/${reportHash}`
              );
            }}
          >
            Copy
          </ToastAction>
        ),
      });
    } else if (IsErrorCreated) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while creating the impact report",
      });
    } else return;
  }, [isCreated, IsErrorCreated]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create impact report</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <div>
                      <Input {...field} />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <div>
                      <Input {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter project description up to 100 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleImage}
                  className="hidden"
                  accept="image/*"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image")!.click()}
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload Image
                </Button>
                <span className="text-sm text-gray-500">
                  {file ? imageName : "No file chosen"}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isCreating || !account.isConnected || !image}
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
