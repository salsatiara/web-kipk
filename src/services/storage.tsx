import { createContext } from "react";

export const AuthContext = createContext({
  id: "",
  username: "",
  role: "",
  nisn: "",
  token: "",
  expire: 0,

  setId(id: string) {
    this.id = id;
  },
  setUsername(username: string) {
    this.username = username;
  },
  setRole(role: string) {
    this.role = role;
  },
  setNisn(nisn: string) {
    this.nisn = nisn;
  },
  setToken(token: string) {
    this.token = token;
  },
  setExpire(expire: number) {
    this.expire = expire;
  },
});
