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
import { deleteTable, getTables } from "@/services/TableService";

const formSchema = z.object({
  tableId: z.string().min(1, "You should selected table!"),
});

export default function DeleteTable() {
  const [tables, setTables] = useState<{ id: string; name: string }[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { tableId: "" },
  });

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const table = await getTables();
        console.log("Tables fetched:", table);
        setTables(table || []);
      } catch (err) {
        console.error("Error fetching tables:", err);
        setTables([]);
      }
    };
    fetchTables();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await deleteTable(values.tableId);
      toast.success("Deleted table!");
      setTables((prev) => prev.filter((t) => t.id !== values.tableId));

      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the table!");
    }
  };

  return (
    <div className="m-5 p-5 rounded-lg shadow-lg shadow-stone-800 bg-[#fff6cc] w-[550px]">
      <div>
        <h1 className="text-center mb-2 font-bold text-xl">Delete Table</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-full"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-4 p-4 border border-stone-800 rounded-md">
            <FormField
              control={form.control}
              name="tableId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Select Table</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select table" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#fff9dc] cursor-pointer">
                        {tables.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.name}
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
