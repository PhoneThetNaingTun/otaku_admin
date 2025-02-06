import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { UserCard } from "./userCard";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/user";

interface Prop {
  users: User[];
}
export const LatestUserCard = ({ users }: Prop) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-red-500">Latest Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {users.map((user) => {
            return (
              <div key={user.id}>
                <UserCard user={user} />
                <Separator className="my-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
