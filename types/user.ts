import { BaseOption } from "./option";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface landingSlice extends BaseOption {
  users: User[];
  userLoading: boolean;
  totalMangas: number;
  totalUsers: number;
}
