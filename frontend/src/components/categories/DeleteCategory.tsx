"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { deleteCategory, getCategories } from "@/services/CategoryService";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";

const formSchema = z.object({
  categoryId: z.string().min(1, "You should selected category!"),
});

export default function DeleteCategory() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { categoryId: "" },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        console.log("Categories fetched:", categories);
        setCategories(categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await deleteCategory(values.categoryId);
      toast.success("Deleted category!");
      setCategories((prev) => prev.filter((c) => c.id !== values.categoryId));

      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the category!");
    }
  };

  return (
    <div className="m-5 p-5 rounded-lg shadow-lg shadow-stone-800 bg-[#fff6cc] w-[550px]">
      <div>
        <h1 className="text-center mb-2 font-bold text-xl">Delete Category</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-full"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-4 p-4 border border-stone-800 rounded-md">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Select Category</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#fff9dc] cursor-pointer">
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="w-full cursor-pointer bg-[#483C32] hover:bg-[#18130e]"
            type="submit"
          >
            Delete
          </Button>
        </form>
      </Form>
    </div>
  );
}
