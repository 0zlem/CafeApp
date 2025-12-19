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
import { deleteProduct, getProducts } from "@/services/ProductService";

const formSchema = z.object({
  productId: z.string().min(1, "You should selected product!"),
});

export default function DeleteProduct() {
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { productId: "" },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const product = await getProducts();
        console.log("products fetched:", product);
        setProducts(product || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await deleteProduct(values.productId);
      toast.success("Deleted product!");
      setProducts((prev) => prev.filter((p) => p.id !== values.productId));

      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the product. !");
    }
  };

  return (
    <div className="m-5 p-5 rounded-lg shadow-lg shadow-stone-800 bg-[#fff6cc] w-[550px]">
      <div>
        <h1 className="text-center mb-2 font-bold text-xl">Delete Product</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-full"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-4 p-4 border border-stone-800 rounded-md">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Select Product</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#fff9dc]">
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
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
