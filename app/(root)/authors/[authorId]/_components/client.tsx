"use client";
import { DeleteButtonDialog } from "@/components/DeleteButtonDialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UpdateButton } from "@/components/UpdateButton";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  DeleteAuthor,
  getAuthor,
  UpdateAuthor,
} from "@/store/Slices/AuthorSlice";

import { UpdateAuthorPayload } from "@/types/author";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const AuthorDetailPageClient = () => {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { authorId } = param;
  const { toast } = useToast();
  const { authors, authorLoading } = useAppSelector((state) => state.Author);

  const [updateAuthor, setUpdateAuthor] = useState<UpdateAuthorPayload>({
    author_name: "",
    id: "",
  });

  const author = authors.find((category) => category.id === authorId);

  useEffect(() => {
    dispatch(getAuthor({ id: authorId as string }));
    if (author) {
      setUpdateAuthor({
        author_name: author.author_name,
        id: author.id,
      });
    }
  }, [author]);

  const handleUpdateAuthor = () => {
    if (!updateAuthor?.author_name || !updateAuthor.id) {
      toast({ title: "Please fill all the fields", variant: "destructive" });
      return;
    }
    dispatch(
      UpdateAuthor({
        ...updateAuthor,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/authors");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteAuthor = () => {
    dispatch(
      DeleteAuthor({
        id: authorId as string,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/authors");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle> Update Author</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            defaultValue={updateAuthor.author_name}
            onChange={(e) =>
              setUpdateAuthor({
                ...updateAuthor,
                author_name: e.target.value,
              })
            }
          />
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between mt-5 w-full">
            <UpdateButton
              onClick={handleUpdateAuthor}
              loading={authorLoading}
            />
            <DeleteButtonDialog
              onDelete={handleDeleteAuthor}
              loading={authorLoading}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
