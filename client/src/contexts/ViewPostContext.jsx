import { createContext, useContext } from "react";

const ViewPostContext = createContext();

function ViewPostContext({ children }) {
  const [postId, setPostId] = useState(null);

  function handleNavigateViewPost(postId) {
    setPostId(postId);
    navigate(`/app/home/post/${postId}`);
  }

  return (
    <ViewPostContext.Provider value={{ postId, handleNavigateViewPost }}>
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

export { ViewPostContext, useViewPost };
