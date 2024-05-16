import React from "react";
import { User, useAuth0 } from "@auth0/auth0-react";

export const UserLocationContext = React.createContext<User | null>(null);

type Props = {
  children: React.ReactNode;
};

export const UserLocationContextProvider = ({ children }: Props) => {
  const { user } = useAuth0();
  return (
    <UserLocationContext.Provider value={user as User}>
      {children}
    </UserLocationContext.Provider>
  );
};
