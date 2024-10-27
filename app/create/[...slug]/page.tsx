"use client";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import DOMPurify from "dompurify";
import { ethers, isAddress } from "ethers";
import { Loader2 } from "lucide-react";
import { Upload, Plus, Trash2 } from "lucide-react";
import { marked } from "marked";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import { z } from "zod";

import ENSResolverInput from "@/components/ENSResolverInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

import { ies } from "@/abis/ies";
import { useIES } from "@/hooks/useIES";
import { useVotingToken } from "@/hooks/useVotingToken";
import { readAsBase64 } from "@/utils";
import { defaultValues } from "@/utils/mock";
import { pinToPinata } from "@/utils/pinata";
import { HatsMetadata, RoleImage } from "@/utils/types";

const Address = z.custom<string>(isAddress, "Invalid Address");

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  contributors: z.array(
    z.object({
      address: Address as z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>,
    })
  ),
  links: z.array(z.object({ url: z.string().url() })),
  roles: z.array(
    z.object({
      parentHatId: z.string(),
      name: z.string(),
      description: z.string(),
      wearers: z.array(
        z.string().refine(isAddress, { message: "Invalid Address" })
      ),
      imageUrl: z.string(),
    })
  ),
});

type FormData = z.infer<typeof formSchema>;

export default function Register({ params }: { params: { slug: string[] } }) {
  const id = params.slug[0];
  const hatsId = params.slug[1];
  const [safeHtmlContent, setSafeHtmlContent] = useState<string>("");
  const [imageName, setImageName] = useState<string | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const [roleImages, setRoleImages] = useState<Record<number, RoleImage>>({});

  const router = useRouter();

  const account = useAccount();
  const AbiCoder = new ethers.AbiCoder();
  const {
    createImpactReport,
    reportHash,
    isCreating,
    isCreated,
    IsErrorCreated,
  } = useIES();
  const {
    approve,
    isApproving,
    isApproved,
    IsErrorApproved,
    approveHash,
    allowance,
  } = useVotingToken();
  const allowanceAvailable =
    allowance && allowance.data ? BigInt(allowance.data as bigint) : BigInt(0);

  useEffect(() => {
    if (isCreated) {
      toast({
        title: "Report submitted",
        description: "Your report has been submitted successfully",
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
      router.push(`/project/${id}`);
    } else if (IsErrorCreated) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while submitting the report",
      });
    } else return;
  }, [isCreated, IsErrorCreated, reportHash]);

  useEffect(() => {
    if (isApproved) {
      toast({
        title: "Approved",
        description: "You have successfully approved the contract",
        action: (
          <ToastAction
            altText="Copy to clipboard"
            onClick={() => {
              navigator.clipboard.writeText(
                `${account.chain?.blockExplorers?.default.url}/tx/${approveHash}`
              );
            }}
          >
            Copy
          </ToastAction>
        ),
      });
    } else if (IsErrorApproved) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while approving the contract",
      });
    }
  }, [isApproved, IsErrorApproved, approveHash]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
    // defaultValues: {
    //   name: "",
    //   description: "",
    //   contributors: [{ address: account.address as `0x${string}` }],
    //   links: [{ url: "" }],
    //   roles: [
    //     {
    //       parentHatId: hatsId,
    //       name: "",
    //       description: "",
    //       wearers: [account.address as `0x${string}`],
    //       imageUrl: "",
    //     },
    //   ],
    // },
  });

  const {
    fields: contributorFields,
    append: appendContributor,
    remove: removeContributor,
  } = useFieldArray({
    control: form.control,
    name: "contributors",
  });

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const {
    fields: roleFields,
    append: appendRole,
    remove: removeRole,
  } = useFieldArray({
    control: form.control,
    name: "roles",
  });

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const base64 = await readAsBase64(file);
      setImageName(file.name);
      setFile(file);
      setImage(base64);
    }
  };

  // Add handler for role images
  const handleRoleImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const base64 = await readAsBase64(file);
      setRoleImages((prev) => ({
        ...prev,
        [index]: {
          file,
          preview: base64,
          name: file.name,
        },
      }));
    }
  };

  async function encodedRoles(
    roles: FormData["roles"]
  ): Promise<`0x${string}`[]> {
    const encodedRoles = roles.map(async (role) => {
      const name = role.name;
      const description = role.description;
      const metadata: HatsMetadata = {
        type: "1.0",
        data: {
          name,
          description,
          responsibilities: [],
          authorities: [],
        },
      };
      const metadataFile = new File(
        [JSON.stringify(metadata)],
        `${Date.now()}.json`
      );
      const metadataCID = await pinToPinata({
        file: metadataFile,
        isLoading,
        setIsLoading,
        message: "Uploading role metadata to IPFS",
      });
      console.log("✅ Role CID", metadataCID);
      return AbiCoder.encode(
        ["tuple(uint256,string,string,string,address[],string)"],
        [
          [
            BigInt(role.parentHatId),
            `ipfs://${metadataCID}`,
            role.name,
            role.description,
            role.wearers as `0x${string}`[],
            role.imageUrl,
          ],
        ]
      ) as `0x${string}`;
    });
    return Promise.all(encodedRoles);
  }

  // Add function to remove role image
  const removeRoleImage = (index: number) => {
    setRoleImages((prev) => {
      const newImages = { ...prev };
      delete newImages[index];
      return newImages;
    });
  };

  async function onSubmit(data: FormData) {
    try {
      if (!file) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please upload an image",
        });
        return;
      }

      setIsLoading(true);

      // Format description with links
      const formattedDescription = `${
        data.description
      }\n\n## Evidence Links\n${data.links
        .map((link, index) => `${index + 1}. ${link.url}`)
        .join("\n")}`;

      const imageCID = await pinToPinata({
        file,
        isLoading,
        setIsLoading,
        message: "Uploading cover image to IPFS",
      });
      console.log("✅ cover image CID", imageCID);

      const imageUrl = `ipfs://${imageCID}`;

      // Upload role images and get their CIDs
      const rolesCopy = [...data.roles];
      for (let i = 0; i < rolesCopy.length; i++) {
        const roleImage = roleImages[i];
        if (roleImage) {
          const roleCID = await pinToPinata({
            file: roleImage.file,
            isLoading,
            setIsLoading,
            message: `Uploading role image ${i} to IPFS`,
          });
          console.log(`✅ role ${i} image CID`, roleCID);
          rolesCopy[i] = {
            ...rolesCopy[i],
            imageUrl: `ipfs://${roleCID}`,
          };
        }
      }

      const metadata = {
        name: data.name,
        description: data.description,
        image: imageUrl,
        contributors: formattedDescription,
        links: data.links,
        roles: rolesCopy,
      };

      const metadataFile = new File(
        [JSON.stringify(metadata)],
        `${Date.now()}.json`
      );

      const metadataCID = await pinToPinata({
        file: metadataFile,
        isLoading,
        setIsLoading,
        message: "Uploading report data to IPFS",
      });
      console.log("✅ report metadata CID", metadataCID);

      const encoded = await encodedRoles(rolesCopy);

      const mappingContributors = data.contributors.map(
        (contributor) => contributor.address
      );

      const mappingLinks = data.links.map((link) => link.url);

      await createImpactReport(
        BigInt(hatsId),
        mappingContributors,
        data.name,
        formattedDescription,
        imageUrl,
        metadataCID,
        mappingLinks,
        account.address as `0x${string}`,
        encoded
      );
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create impact report",
      });
    } finally {
      setIsLoading(false);
    }
  }
  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const description = form.watch("description");
  useEffect(() => {
    async function sanitizeHtml() {
      const rawHtml = await marked(description || "");
      const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
        ALLOWED_TAGS: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "a",
          "ul",
          "ol",
          "li",
          "strong",
          "em",
          "code",
          "pre",
          "blockquote",
        ],
        ALLOWED_ATTR: ["href"],
      });
      setSafeHtmlContent(sanitizedHtml);
    }
    sanitizeHtml();
  }, [description]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader></CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...field}
                      placeholder="Enter title..."
                      className="w-full lg:text-3xl text-xl lg:font-bold font-semibold border-none outline-none bg-transparent mb-4"
                    />
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
                  <Tabs defaultValue="edit" className="w-full">
                    <div className="flex justify-center mb-4">
                      <TabsList>
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                    </div>
                    <FormDescription>Markdown is supported :) </FormDescription>
                    <TabsContent value="edit">
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-[400px] p-4 text-lg"
                          placeholder="# Write your content here..."
                        />
                      </FormControl>
                    </TabsContent>

                    <TabsContent value="preview" className="min-h-[400px]">
                      <article className="prose lg:prose-lg p-4">
                        <div
                          dangerouslySetInnerHTML={{ __html: safeHtmlContent }}
                        />
                      </article>
                    </TabsContent>
                  </Tabs>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <Label>Contributors</Label>
              <FormDescription>
                All contributors will have a opportunity to recieve a share of
                the retroactive rewards if the proposal is approved. A share is
                represented as a Liquid Split Token(ERC1155)
              </FormDescription>
              {contributorFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`contributors.${index}.address`}
                    render={({ field }) => (
                      <ENSResolverInput
                        field={field}
                        placeholder="0x... or ENS name"
                      />
                    )}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeContributor(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendContributor({
                    address: "" as `0x${string}`,
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Contributor
              </Button>
            </div>

            <div className="space-y-4">
              <Label>Evidence Links</Label>
              {linkFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`links.${index}.url`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            type="url"
                            placeholder="https://..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeLink(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendLink({ url: "" })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Cover Image</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="image"
                  type="file"
                  onChange={handleImage}
                  className="hidden"
                  accept="image/*"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Cover Image
                </Button>
                <span className="text-sm text-gray-500">
                  {imageName || "No file chosen"}
                </span>
              </div>
              {image && (
                <div className="mt-2">
                  <img
                    src={image}
                    alt="Cover preview"
                    className="max-w-[200px] rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label>Roles</Label>
              <FormDescription>
                Role is to clarify the roles of the people involved in preparing
                this report. Each Role is displayed on the Hats tree.
              </FormDescription>
              {roleFields.map((field, roleIndex) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`roles.${roleIndex}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`roles.${roleIndex}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role Description</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Wearers Section */}
                  <div className="space-y-2">
                    <Label>Role Wearers</Label>
                    <div className="space-y-2">
                      {form
                        .getValues(`roles.${roleIndex}.wearers`)
                        .map((_, wearerIndex) => (
                          <div key={wearerIndex} className="flex gap-2">
                            <FormField
                              control={form.control}
                              name={`roles.${roleIndex}.wearers.${wearerIndex}`}
                              render={({ field }) => (
                                <ENSResolverInput
                                  field={field}
                                  placeholder="Wearer address (0x...) or ENS name"
                                />
                              )}
                            />
                            {wearerIndex > 0 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  const currentWearers = form.getValues(
                                    `roles.${roleIndex}.wearers`
                                  );
                                  const newWearers = [
                                    ...currentWearers.slice(0, wearerIndex),
                                    ...currentWearers.slice(wearerIndex + 1),
                                  ];
                                  form.setValue(
                                    `roles.${roleIndex}.wearers`,
                                    newWearers
                                  );
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const currentWearers = form.getValues(
                            `roles.${roleIndex}.wearers`
                          );
                          form.setValue(`roles.${roleIndex}.wearers`, [
                            ...currentWearers,
                            "" as `0x${string}`,
                          ]);
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Wearer
                      </Button>
                    </div>
                  </div>

                  {/* Role Image Section */}
                  <div className="space-y-2">
                    <Label>Role Image</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id={`role-image-${roleIndex}`}
                        type="file"
                        onChange={(e) => handleRoleImage(e, roleIndex)}
                        className="hidden"
                        accept="image/*"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document
                            .getElementById(`role-image-${roleIndex}`)
                            ?.click()
                        }
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Role Image
                      </Button>
                      <span className="text-sm text-gray-500">
                        {roleImages[roleIndex]?.name || "No file chosen"}
                      </span>
                      {roleImages[roleIndex] && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeRoleImage(roleIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {roleImages[roleIndex] && (
                      <div className="mt-2">
                        <img
                          src={roleImages[roleIndex].preview}
                          alt={`Role ${roleIndex + 1} preview`}
                          className="max-w-[200px] rounded-md"
                        />
                      </div>
                    )}
                  </div>

                  {roleIndex > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        removeRole(roleIndex);
                        removeRoleImage(roleIndex);
                      }}
                    >
                      Remove Role
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendRole({
                    parentHatId: hatsId,
                    name: "",
                    description: "",
                    wearers: [account.address as `0x${string}`],
                    imageUrl: "",
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Role
              </Button>
            </div>
            {parseUnits("1000", 18) > allowanceAvailable && (
              <Button
                type="button"
                className="w-full"
                disabled={!account.isConnected || isApproving}
                onClick={() => approve(ies.address, "1000")}
              >
                {isApproving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>approving...</span>
                  </>
                ) : (
                  "Approve 1000 VOTE Token"
                )}
              </Button>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={
                isLoading ||
                !account.isConnected ||
                isApproving ||
                isCreating ||
                parseUnits("1000", 18) > allowanceAvailable
              }
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Creating Impact Report...</span>
                </>
              ) : (
                "Create Impact Report"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
