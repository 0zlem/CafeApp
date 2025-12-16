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
import { getCategories, updateCategory } from "@/services/CategoryService";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

const formSchema = z.object({
  id: z.string().min(1, "You should select category!"),
  name: z.string().min(1, "New name is must not empty!"),
});

export default function UpdateCategory() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: "", name: "" },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleSelectCategory = (id: string) => {
    form.setValue("id", id);
    const selected = categories.find((c) => c.id === id);
    form.setValue("name", selected?.name || "");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCategory(values);
      toast.success("Category updated successfully!");

      setCategories((prev) =>
        prev.map((c) => (c.id === values.id ? { ...c, name: values.name } : c))
      );

      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating the category.!");
    }
  };

  return (
    <div className="m-5 p-5 rounded-lg shadow-lg shadow-stone-800 bg-[#fff6cc] w-[550px]">
      <h1 className="text-center mb-4 font-bold text-xl">Update Category</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(val) => handleSelectCategory(val)}
                  >
                    <SelectTrigger className="w-full">
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

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="New category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full bg-[#483C32] hover:bg-[#18130e] cursor-pointer"
            type="submit"
          >
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
}
