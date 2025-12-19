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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getUsers, updateUserRole, UserRole } from "@/services/UserService";

const formSchema = z.object({
  userId: z.string().min(1, "You should select a user!"),
  role: z.enum(["Admin", "Mutfak", "Garson"]),
});

interface User {
  id: string;
  userName: string;
  fullName: string;
  role: UserRole;
}

export default function UpdateUserRole() {
  const [users, setUsers] = useState<User[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { userId: "", role: "Garson" },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
        toast.error("Kullanıcılar yüklenirken hata oluştu!");
      }
    };
    fetchUsers();
  }, []);

  const handleSelectUser = (userId: string) => {
    form.setValue("userId", userId);
    const selected = users.find((u) => u.id === userId);
    form.setValue("role", selected?.role || "Garson");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await updateUserRole({
        userId: values.userId,
        newRole: values.role,
      });
      if (result.isSuccessful) {
        toast.success("Kullanıcı rolü güncellendi!");
        setUsers((prev) =>
          prev.map((u) =>
            u.id === values.userId ? { ...u, role: values.role } : u
          )
        );
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Rol güncellenirken hata oluştu!");
    }
  };

  return (
    <div className="m-5 p-5 rounded-lg shadow-lg bg-[#fff6cc] w-[500px]">
      <h1 className="text-center mb-4 font-bold text-xl">Update User Role</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role - UserName</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={handleSelectUser}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#fff9dc]">
                      {users.map((u) => (
                        <SelectItem key={u.id} value={u.id}>
                          {u.role} - {u.userName.toUpperCase()}
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#fff9dc]">
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Mutfak">Mutfak</SelectItem>
                      <SelectItem value="Garson">Garson</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#483C32] hover:bg-[#18130e] cursor-pointer"
          >
            Update Role
          </Button>
        </form>
      </Form>
    </div>
  );
}
