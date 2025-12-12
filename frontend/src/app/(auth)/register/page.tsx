"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { getUser, login } from "@/services/AuthService";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6),
});

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await login(values);

      const token = response.data.accessToken;

      localStorage.setItem("token", token);

      const user = await getUser();

      if (user?.role === "Admin") {
        router.push("/admin/dashboard");
        return;
      }
    } catch (err: any) {
      console.error("Hata:", err);
    }
  }
  return (
    <div className="flex items-center justify-center p-16">
      <Card className="w-full max-w-md shadow-2xl border border-[#483C32] text-[#483C32] bg-background gap-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Welcome!</CardDescription>
          <CardAction>
            <Button variant="link">
              <Link href={"/register"}>Register</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-[#483C32] hover:bg-[#5a4d42] text-md cursor-pointer"
                type="submit"
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
