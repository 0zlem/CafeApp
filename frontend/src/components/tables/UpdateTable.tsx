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
import { getTables, updateTable } from "@/services/TableService";

const formSchema = z.object({
  id: z.string().min(1, "You should select table!"),
  name: z.string().min(1, "New name is must not empty!"),
});

export default function UpdateTable() {
  const [tables, setTables] = useState<{ id: string; name: string }[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: "", name: "" },
  });

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const table = await getTables();
        setTables(table || []);
      } catch (err) {
        console.error("Error fetching tables:", err);
        setTables([]);
      }
    };
    fetchTables();
  }, []);

  const handleSelectTable = (id: string) => {
    form.setValue("id", id);
    const selected = tables.find((t) => t.id === id);
    form.setValue("name", selected?.name || "");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateTable(values);
      toast.success("Table updated successfully!");

      setTables((prev) =>
        prev.map((t) => (t.id === values.id ? { ...t, name: values.name } : t))
      );

      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating the table.!");
    }
  };

  return (
    <div className="m-5 p-5 rounded-lg shadow-lg shadow-stone-800 bg-[#fff6cc] w-[550px]">
      <h1 className="text-center mb-4 font-bold text-xl">Update Table</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Table Name</FormLabel>
                <FormControl>
                  <Select
                    key={field.value}
                    value={field.value}
                    onValueChange={(val) => handleSelectTable(val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select table" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#fff9dc]">
                      {tables.map((table) => (
                        <SelectItem key={table.id} value={table.id}>
                          {table.name}
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
                <FormLabel>New Table Name</FormLabel>
                <FormControl>
                  <Input placeholder="New table name" {...field} />
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
