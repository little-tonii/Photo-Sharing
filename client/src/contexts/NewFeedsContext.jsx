import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { API } from "../utils/endpoints";

const NewFeedsContext = createContext();

function NewFeedsProvider({ children }) {
  const { user, updateUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [suggestUsers, setSuggestUsers] = useState([]);
  
  useEffect(() => {
    if (!user) {
      updateUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    async function getSuggestUsers() {
      const res = await axios.get(API.SUGGEST_USERS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (res.status === 200) {
        const data = res.data;
        setSuggestUsers(data);
      }
    }
    getSuggestUsers();
  }, []);

  useEffect(() => {
    async function getNewFeeds() {
      const res = await axios.get(API.NEW_FEEDS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (res.status === 200) {
        const data = res.data;
        setPosts(data);
      }
    }
    getNewFeeds();
  }, []);

  return (
    <NewFeedsContext.Provider value={{ posts, suggestUsers }}>
      {children}
    </NewFeedsContext.Provider>
  );
}

function useNewFeeds() {
  const context = useContext(NewFeedsContext);

  if (!context) {
    throw new Error("useNewFeeds was used outsite the NewFeedsProvider.");
  }

  return context;
}

export { NewFeedsProvider, useNewFeeds };
