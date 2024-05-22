import axios from "axios";
import { createContext, useContext } from "react";
import { API } from "../utils/endpoints";
import { useAuth } from "./AuthContext";

const SuggestionUserContext = createContext();

function SuggestionUserProvider({ children }) {
  const { updateUser } = useAuth();

  async function handleFollowUser(userId) {
    const accessToken = localStorage.getItem("access_token");

    const res = await axios.post(
      API.FOLLOW_USER + `/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.status === 200) {
      const data = res.data;
      localStorage.setItem("user", JSON.stringify(data));
      updateUser(data);
    }
  }

  async function handleUnfollowUser(userId) {
    const accessToken = localStorage.getItem("access_token");

    const res = await axios.delete(API.UNFOLLOW_USER + `/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200) {
      const data = res.data;
      localStorage.setItem("user", JSON.stringify(data));
      updateUser(data);
    }
  }

  return (
    <SuggestionUserContext.Provider
      value={{
        handleFollowUser,
        handleUnfollowUser,
      }}
    >
      {children}
    </SuggestionUserContext.Provider>
  );
}

function useSuggestionUser() {
  const context = useContext(SuggestionUserContext);

  if (!context) {
    throw new Error(
      "useSuggestionUser was used outside SuggestionUserProvider."
    );
  }

  return context;
}

export { SuggestionUserProvider, useSuggestionUser };
