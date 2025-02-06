import { User } from "@/types/user";
import Image from "next/image";
import React from "react";

interface Prop {
  user: User;
}

export const UserCard = ({ user }: Prop) => {
  return (
    <div className="flex gap-2 items-center">
      <Image
        src="/profile.png"
        alt="profile"
        width={1000}
        height={1000}
        className="w-10 h-10 object-cover rounded-full"
      />
      <div className="flex flex-col justify-center ">
        <p className="text-gray-600">
          Name:
          <span className="font-semibold text-black"> {user.name}</span>
        </p>
        <p className="text-gray-600">
          Email:
          <span className="font-semibold text-black"> {user.email}</span>
        </p>
      </div>
    </div>
  );
};
