import { useViewPost } from "../../contexts/ViewPostContext";
import { API } from "../../utils/endpoints";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function ViewPost() {
  const { post, comments, handleSetPostId, handleAddNewComment } =
    useViewPost();

  const { user } = useAuth();
  const navigate = useNavigate();
  const [enteredComment, setEnteredComment] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLiked, setIsLiked] = useState(null);

  useEffect(() => {
    setIsLiked(post?.likes.includes(user?._id));
  }, [post]);

  console.log(post);
  console.log(user);
  console.log(isLiked);

  const createdAt = new Date(post?.createdAt).toLocaleDateString().split("/");

  function handleNavigateUserProfile(userId) {
    if (userId === user._id) {
      handleSetPostId(null);
      navigate("/app/profile");
    } else {
      handleSetPostId(null);
      navigate(`/app/user/${userId}`);
    }
  }

  async function handleSendComment() {
    setIsSending(true);
    const res = await axios.post(
      `${API.COMMENT_ON_POST}`,
      {
        comment: enteredComment,
        post: post._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (res.status === 201) {
      handleAddNewComment(res.data);
      setEnteredComment("");
      setIsSending(false);
    }
  }

  async function handleRemoveLikePost() {
    const res = await axios.delete(API.LIKE_POST + `/${post?._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (res.status === 200) {
      setIsLiked(false);
    }
  }

  async function handleLikePost() {
    const res = await axios.post(
      API.LIKE_POST + `/${post?._id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (res.status === 200) {
      setIsLiked(true);
    }
  }

  return (
    <>
      <div
        onClick={() => handleSetPostId(null)}
        className="w-full h-full absolute bg-black bg-opacity-30 flex z-40"
      ></div>
      <div className="absolute bg-white flex justify-center items-center z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden">
        <div className="bg-white rounded-lg flex h-[40rem]">
          <div className="h-full w-[38rem] bg-black flex justify-center items-center">
            <img
              src={`${API.PHOTO}/${post?.photos[0]}`}
              alt="photo"
              className="max-h-full max-w-full"
            />
          </div>
          <div className="flex flex-col w-[28rem] justify-between">
            <div className="flex gap-1 py-2 border-b-2 pl-2">
              <div
                onClick={() => handleNavigateUserProfile(post?.user._id)}
                className="h-16 w-16 rounded-full cursor-pointer"
              >
                <img
                  src={`${API.AVATAR}/${post?.user.avatar}`}
                  alt="owner-avatar"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <h3
                  onClick={() => handleNavigateUserProfile(post?.user._id)}
                  className="font-bold text-lg cursor-pointer hover:text-gray-600"
                >
                  {post?.user.username}
                </h3>
                <div className="flex gap-4">
                  <p className="font-bold text-gray-400">{`${createdAt[1]}/${createdAt[0]}/${createdAt[2]}`}</p>
                  <p className="font-bold text-gray-400">
                    {post?.likes.length > 0
                      ? `${post?.likes.length} likes`
                      : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-scroll flex flex-col gap-4 overflow-x-hidden h-full">
              <div className={`flex w-full gap-1 pt-4 pl-2`}>
                <div
                  onClick={() => handleNavigateUserProfile(post?.user._id)}
                  className="max-w-12 h-12 min-w-12 rounded-full overflow-hidden cursor-pointer"
                >
                  <img
                    className="min-h-full min-w-full"
                    src={`${API.AVATAR}/${post?.user.avatar}`}
                    alt="avatar"
                  />
                </div>
                <div>
                  <p className="pr-2">
                    <span
                      onClick={() => handleNavigateUserProfile(post?.user._id)}
                      className="font-bold cursor-pointer hover:text-gray-600"
                    >
                      {post?.user.username}
                    </span>{" "}
                    {post?.content}
                  </p>
                </div>
              </div>
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className={`flex w-full gap-1 ${
                    index === comments.length - 1 ? "pb-4" : ""
                  } pl-2`}
                >
                  <div
                    onClick={() => handleNavigateUserProfile(comment?.user._id)}
                    className="max-w-12 h-12 min-w-12 rounded-full overflow-hidden cursor-pointer"
                  >
                    <img
                      className="min-h-full min-w-full"
                      src={`${API.AVATAR}/${comment?.user.avatar}`}
                      alt="avatar"
                    />
                  </div>
                  <div>
                    <p className="pr-2">
                      <span
                        onClick={() =>
                          handleNavigateUserProfile(comment?.user._id)
                        }
                        className="font-bold cursor-pointer hover:text-gray-600"
                      >
                        {comment?.user.username}
                      </span>{" "}
                      {comment?.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex p-2 gap-2 justify-center items-center border-t-2">
              {isLiked ? (
                <button onClick={handleRemoveLikePost}>
                  <FavoriteIcon fontSize="large" />
                </button>
              ) : (
                <button onClick={handleLikePost}>
                  <FavoriteBorderIcon fontSize="large" />
                </button>
              )}
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendComment();
                  }
                }}
                value={enteredComment}
                onChange={(e) => setEnteredComment(e.target.value)}
                type="text"
                name="comment-input"
                id="comment-input"
                className="outline-none bg-white w-full"
                placeholder="Comment on this post . . ."
              />
              {enteredComment.length > 0 ? (
                <button
                  onClick={handleSendComment}
                  className="font-bold hover:text-gray-600 px-2"
                >
                  {isSending ? "Sending" : "Send"}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewPost;
