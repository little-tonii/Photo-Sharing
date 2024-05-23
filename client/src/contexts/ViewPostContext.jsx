import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../utils/endpoints";

const ViewPostContext = createContext();

function ViewPostProvider({ children }) {
  const [postId, setPostId] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getData() {
      const resPost = await axios.get(`${API.GET_POST}/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (resPost.status === 200) {
        setPost(resPost.data);
      }

      const resComments = await axios.get(
        `${API.GET_COMMENT_ON_POST}/?post=${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (resComments.status === 200) {
        setComments(resComments.data);
      }
    }
    if (postId) {
      getData();
    } else {
      setPost(null);
      setComments([]);
    }
  }, [postId]);

  function handleViewPost(postId) {
    setPostId(postId);
  }

  function handleSetPostId(postId) {
    setPostId(postId);
  }

  function handleAddNewComment(comment) {
    setComments([...comments, comment]);
  }

  return (
    <ViewPostContext.Provider
      value={{
        postId,
        post,
        comments,
        handleSetPostId,
        handleViewPost,
        handleAddNewComment,
      }}
    >
      {children}
    </ViewPostContext.Provider>
  );
}

function useViewPost() {
  const context = useContext(ViewPostContext);
  if (context === undefined) {
    throw new Error("useViewPost must be used within a ViewPostProvider");
  }
  return context;
}

export { ViewPostProvider, useViewPost };
