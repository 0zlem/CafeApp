"use client";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { addCategory } from "@/services/CategoryService";
import { toast } from "sonner";

export default function AddCategory() {
  const itemSchema = z.object({
    name: z.string().min(1, "Item Name cannot be empty."),
  });

  const formSchema = z.object({
    items: z.array(itemSchema).min(1, "At least one item is required."),
  });

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const handleSubmit = async (data: any) => {
    try {
      for (const item of data.items) {
        await addCategory({ name: item.name });
      }
      form.reset();
      toast.success("Categories added!");
    } catch (error) {
      console.error(error);
      toast.error("Error adding categories.");
    }
  };

  return (
    <div className="m-5 p-5 rounded-lg shadow-lg shadow-stone-800 bg-[#fff6cc] w-[550px]">
      <div>
        <h1 className="text-center mb-2 font-bold text-xl">Add Category</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 max-w-full"
        >
          <div>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col sm:flex-row gap-4 mb-4 p-4 border border-stone-800 rounded-md"
              >
                <FormField
                  control={form.control}
                  name={`items.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 items-end">
                  <Button
                    type="button"
                    onClick={() => append({ name: "" })}
                    variant="outline"
                    className="w-fit bg-[#483C32] text-white"
                  >
                    <Icon icon="lucide:plus" className="h-4 w-4" />
                  </Button>

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                      className="w-fit text-white"
                    >
                      <Icon icon="lucide:trash-2" className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#483C32] hover:bg-[#18130e]"
          >
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}
