import ButtonForm from "../commons/ButtonForm";
import PostAvatar from "../commons/PostAvatar";
import { useAuth } from "../../contexts/AuthContext";
import { useCreatePost } from "../../contexts/CreatePostContext";

function CreatePost() {
  const { user } = useAuth();
  const {
    image,
    aboutPhoto,
    onCreatePost,
    handleCreatePost,
    handleSetImage,
    handleAboutPhoto,
    handleChooseImage,
  } = useCreatePost();

  return (
    <div className="w-5/6 px-96 flex justify-start flex-col items-center overflow-scroll overflow-x-hidden">
      <input
        type="file"
        name="upload-image"
        id="upload-image"
        accept="image/*"
        onChange={handleSetImage}
        hidden={true}
      />
      <div className="flex w-full mb-4 mt-8 gap-2">
        <PostAvatar avatar={user?.avatar} />
        <div>
          <button className="font-bold hover:text-gray-600">
            <h3>{user?.username}</h3>
          </button>
          <p>
            <span className="ti ti-pencil-alt"></span>
          </p>
        </div>
      </div>

      <div className="flex w-full border-b-2 hover:border-black focus:border-black p-2">
        <input
          type="text"
          name="about-photo"
          id="about-photo"
          placeholder="About this photo . . ."
          maxLength={60}
          className="w-full outline-none bg-white"
          value={aboutPhoto}
          onChange={handleAboutPhoto}
          disabled={image ? false : true}
        />
        <p>{aboutPhoto.length}/60</p>
      </div>

      {image ? (
        <>
          <div
            className="bg-black w-full min-h-[32rem] flex justify-center items-center cursor-pointer rounded-lg overflow-hidden my-4"
            onClick={handleChooseImage}
          >
            <img
              src={image}
              alt="preview-image"
              className="max-h-[32rem] max-w-full"
            />
          </div>
          <div className="w-full mb-8">
            <ButtonForm
              text="Upload"
              handleOnClick={handleCreatePost}
              disabled={onCreatePost}
            />
          </div>
        </>
      ) : (
        <div>
          <button
            onClick={handleChooseImage}
            className="active:scale-95 transition-all bg-black text-white w-full p-4 rounded-lg border-2 border-white hover:border-black hover:bg-white hover:text-black bg-opacity-80 active:bg-black active:border-white active:text-white mt-24"
          >
            Choose image
          </button>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
