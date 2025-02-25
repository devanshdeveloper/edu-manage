import React, { createContext, useContext, useState } from "react";
import UserTypes from "../constants/UserTypes";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useLocalStorageQuery from "../hooks/useLocalStorageQuery";
import ApiEndpoints from "../constants/ApiEndpoints";
import { requestHelper } from "../helpers";
import { useMutation } from "@tanstack/react-query";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const {
    data: user,
    set: setUser,
    isLoading: isUserLoading,
    error: UserError,
  } = useLocalStorageQuery({
    storageKey : "user",
    queryKey: [ApiEndpoints.Auth.Profile],
    queryFn: () => {
      return requestHelper.request(ApiEndpoints.Auth.Profile);
    },
    validate: (data) => {
      return !!data?.user;
    },
    refetchOnMount: false,
  });

  const [token, setToken] = useLocalStorage("token", null);

  const {
    mutate: login,
    isPending: isLoginPending,
    error: LoginError,
  } = useMutation({
    mutationKey: [ApiEndpoints.Auth.Login],
    mutationFn: () => {
      return requestHelper.request(ApiEndpoints.Auth.Login);
    },
    onSuccess: (data) => {
      setUser(
        data.user || {
          type: UserTypes.Admin,
          _id: "640070035417619200000000",
        }
      );
      setToken(data.token || "123456");
    },
  });

  const {
    mutate: logout,
    isPending: isLogoutPending,
    error: LogoutError,
  } = useMutation({
    mutationKey: [ApiEndpoints.Auth.Logout],
    mutationFn: () => {
      return requestHelper.request(ApiEndpoints.Auth.Logout);
    },
    onSuccess: () => {
      setUser(null);
      setToken(null);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        login,
        logout,
        isUserLoading,
        isLoginPending,
        isLogoutPending,
        UserError,
        LoginError,
        LogoutError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
