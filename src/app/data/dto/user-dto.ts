import {Access} from "../models/access";

export interface UserDto {
  id: number;
  mail: string;
  googleId: string;
  appVersion: number;
  lastLogin: Date;
  access?: Access;
}
