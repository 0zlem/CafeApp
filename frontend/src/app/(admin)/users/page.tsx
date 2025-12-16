import UpdateUserRole from "@/components/users/UserRole";
import React from "react";

export default function UserPage() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center p-4 sm:p-6 gap-4 sm:gap-6">
      <UpdateUserRole />
    </div>
  );
}
