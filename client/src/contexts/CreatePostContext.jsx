import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { API } from "../utils/endpoints";

const CreatePostContext = createContext();

// eslint-disable-next-line react/prop-types
function CreatePostProvider({ children }) {
  const { user, updateUser } = useAuth();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [onCreatePost, setOnCreatePost] = useState(false);
  const [aboutPhoto, setAboutPhoto] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    if (!user) {
      updateUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  function handleChooseImage() {
    document.getElementById("upload-image").click();
  }

  function handleSetImage(event) {
    setImage(URL.createObjectURL(event.target.files[0]));
    setImageFile(event.target.files[0]);
  }

  function handleAboutPhoto(event) {
    setAboutPhoto(event.target.value);
  }

  function handleClosePopup() {
    setIsCreated(false);
  }

  async function handleCreatePost() {
    setOnCreatePost(true);

    const formData = new FormData();
    formData.append("photos", imageFile);
    formData.append("content", aboutPhoto);
    try {
      const res = await axios.post(API.CREATE_POST, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (res.status === 201) {
        setIsCreated(true);
        setAboutPhoto("");
        setImage(null);
        setImageFile(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOnCreatePost(false);
    }
  }

  return (
    <CreatePostContext.Provider
      value={{
        isCreated,
        aboutPhoto,
        image,
        onCreatePost,
        handleSetImage,
        handleAboutPhoto,
        handleChooseImage,
        handleCreatePost,
        handleClosePopup,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
}

function useCreatePost() {
  const context = useContext(CreatePostContext);
  if (context === undefined) {
    throw new Error(
      "CreatePostContext was used outside of CreatePostProvider."
    );
  }
  return context;
}

export { CreatePostProvider, useCreatePost };
