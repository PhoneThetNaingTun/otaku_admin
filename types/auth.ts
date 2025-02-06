import { BaseOption } from "./option";

export interface LoginPayload extends BaseOption {
  email: string;
  password: string;
}
