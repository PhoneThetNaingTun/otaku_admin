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
  DeleteCategory,
  getCategory,
  UpdateCategory,
} from "@/store/Slices/CategorySlice";
import { UpdateCategoryPayload } from "@/types/catrgory";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const CategoryDetailPageClient = () => {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { categoryId } = param;
  const { toast } = useToast();
  const { categories, categoryLoading } = useAppSelector(
    (state) => state.Category
  );

  const [updateCategory, setUpdateCategory] = useState<UpdateCategoryPayload>({
    category_name: "",
    id: "",
  });

  const category = categories.find((category) => category.id === categoryId);

  useEffect(() => {
    if (category) {
      setUpdateCategory({
        category_name: category.category_name,
        id: category.id,
      });
    }
  }, [category]);
  useEffect(() => {
    dispatch(getCategory({ id: categoryId as string }));
  }, [dispatch, categoryId]);

  const handleUpdateCategory = () => {
    if (!category?.category_name || !category.id) {
      toast({ title: "Please fill all the fields", variant: "destructive" });
      return;
    }
    dispatch(
      UpdateCategory({
        ...updateCategory,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/categories");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteCategory = () => {
    dispatch(
      DeleteCategory({
        id: categoryId as string,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/categories");
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
          <CardTitle> Update Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            defaultValue={updateCategory.category_name}
            onChange={(e) =>
              setUpdateCategory({
                ...updateCategory,
                category_name: e.target.value,
              })
            }
          />
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between mt-5 w-full">
            <UpdateButton
              onClick={handleUpdateCategory}
              loading={categoryLoading}
            />
            <DeleteButtonDialog
              onDelete={handleDeleteCategory}
              loading={categoryLoading}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
