import { createContext } from "react";

const LikePostContext = createContext();

function LikePostProvider({ children }) {
  const [isLiked, setIsLiked] = useState({});

  function handleInitState(postId, state) {
    setIsLiked({ ...isLiked, [postId]: state });
  }

  return (
    <LikePostContext.Provider value={{}}>{children}</LikePostContext.Provider>
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
