"use client";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

import { useIES } from "@/hooks/useIES";
import { readAsBase64 } from "@/utils";
import { pinToPinata } from "@/utils/pinata";
import { HatsMetadata, Project, projectSchema } from "@/utils/types";

export default function CreateReportPage() {
  const [imageName, setImageName] = useState<string | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const account = useAccount();

  const {
    registerIES,
    registerHash,
    isRegistering,
    isRegistered,
    IsErrorRegistered,
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
      message: "Uploading project metadata to IPFS",
    });

    console.log("✅ Project CID", projectCID);

    const imageCID = await pinToPinata({
      file,
      isLoading,
      setIsLoading,
      message: "Uploading cover image to IPFS",
    });
    console.log("✅ Image CID", imageCID);

    registerIES(
      data,
      `ipfs://${imageCID}`,
      `ipfs://${projectCID}`,
      account.address!
    );
  }

  useEffect(() => {
    if (isRegistered) {
      toast({
        title: "Project registered!",
        description: "Your project has been successfully registered",
        action: (
          <ToastAction
            altText="Copy to clipboard"
            onClick={() => {
              navigator.clipboard.writeText(
                `${account.chain?.blockExplorers?.default.url}/tx/${registerHash}`
              );
            }}
          >
            Copy
          </ToastAction>
        ),
      });
      router.push(`/`);
    } else if (IsErrorRegistered) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while registering the project",
      });
    } else return;
  }, [isRegistered, IsErrorRegistered, registerHash]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Register Project</CardTitle>
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
                      <Textarea {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter project description up to 1000 characters
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
              disabled={isRegistering || !account.isConnected || !image}
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
