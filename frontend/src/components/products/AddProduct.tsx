"use client";

import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { toast } from "sonner";
import { addProduct } from "@/services/ProductService";
import { getCategories } from "@/services/CategoryService";
import { uploadFile } from "@/services/FileService";

const formSchema = z.object({
  name: z.string().min(1, "Product name required!"),
  description: z.string().optional(),
  price: z.number().min(0, "The price must be 0 or above!"),
  stock: z.number().min(0, "The stock must be 0 or above!"),
  categoryId: z.string().min(1, "You should select category"),
  isAvailable: z.boolean(),
});

export default function AddProduct() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
      isAvailable: true,
    },
  });

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const handleSelectCategory = (categoryId: string) => {
    form.setValue("categoryId", categoryId);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let imageUrl: string | undefined;

      if (selectedFile) {
        imageUrl = await uploadFile(selectedFile);
      }

      await addProduct({
        ...values,
        imageUrl,
      });
      console.log("UPLOAD RESULT:", imageUrl);
      console.log("TYPE:", typeof imageUrl);

      toast.success("Product added successfully!");
      form.reset();
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the product!");
    }
  };

  return (
    <div className="m-5 p-5 rounded-lg shadow-lg bg-[#fff6cc] w-full max-w-lg">
      <h1 className="text-center font-bold text-xl mb-4">Add Product</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
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
                  <Input placeholder="Product description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(val) => handleSelectCategory(val)}
                  >
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#fff9dc]">
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

          <div>
            <FormLabel>Product Image</FormLabel>
            <Input
              className="cursor-pointer"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
          </div>

          <FormField
            control={form.control}
            name="isAvailable"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 justify-start">
                <FormControl>
                  <Input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <FormLabel className="m-0 cursor-pointer">
                  Is Available
                </FormLabel>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#483C32] hover:bg-[#18130e] cursor-pointer"
          >
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}
