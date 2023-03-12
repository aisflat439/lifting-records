import React from "react";
import { User } from "../types";

export const useUsers = () => {
  const [user, setUser] = React.useState<string | "">("");
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const getUsers = async () => {
    const data = await fetch("./data/users.json");
    const users = await data.json();
    setUsers(users);
    setLoading(false);
  };

  const selectedUser = users.find((u) => u.id === parseInt(user));

  React.useEffect(() => {
    getUsers();
  }, []);

  return { users, loading, selectedUser, setSelectedUser: setUser };
};
