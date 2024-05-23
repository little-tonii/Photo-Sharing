import axios from "axios";
import { createContext, useContext, useState } from "react";
import { API } from "../utils/endpoints";
import { useAuth } from "./AuthContext";

const LikePostContext = createContext();

function LikePostProvider({ children }) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState([]);

  function handleInitState(posts) {
    const likedPosts = posts.filter((post) => post.likes.includes(user?._id));
    const likedPostsId = likedPosts.map((post) => post._id);
    setIsLiked(likedPostsId);
  }

  console.log(isLiked);

  async function handleRemoveLikePost(postId) {
    const res = await axios.delete(API.LIKE_POST + `/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (res.status === 200) {
      setIsLiked(isLiked.filter((id) => id !== postId));
    }
  }

  async function handleLikePost(postId) {
    const res = await axios.post(
      API.LIKE_POST + `/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (res.status === 200) {
      setIsLiked([...isLiked, postId]);
    }
  }

  return (
    <LikePostContext.Provider
      value={{
        isLiked,
        handleInitState,
        handleRemoveLikePost,
        handleLikePost,
      }}
    >
      {children}
    </LikePostContext.Provider>
  );
}

function useLikePost() {
  const context = useContext(LikePostContext);
  if (context === undefined) {
    throw new Error("useLikePost must be used within a LikePostProvider");
  }
  return context;
}

export { LikePostProvider, useLikePost };
