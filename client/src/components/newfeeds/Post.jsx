import { useEffect, useState } from "react";
import PostAvatar from "../commons/PostAvatar";
import { API } from "../../utils/endpoints";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useViewPost } from "../../contexts/ViewPostContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../../contexts/AuthContext";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function Post({ post }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const { handleViewPost } = useViewPost();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post?.likes.includes(user?._id));

  const date = new Date(post?.createdAt).toLocaleDateString().split("/");
  const showDate = date[1] + "/" + date[0] + "/" + date[2];

  useEffect(() => {
    async function getComments() {
      const res = await axios.get(
        API.GET_COMMENT_ON_POST + `/?post=${post?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (res.status === 200) {
        const data = res.data;
        setComments(data);
      }
    }
    getComments();
  }, []);

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

  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  async function handleSendComment() {
    setIsSending(true);
    const res = await axios.post(
      API.COMMENT_ON_POST,
      { post: post?._id, comment: comment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (res.status === 201) {
      const data = await res.data;
      setComments([...comments, data]);
      setIsSending(false);
      setComment("");
    }
  }

  function handleNavigateUserProfile() {
    navigate(`/app/user/${post?.user?._id}`);
  }

  return (
    <div className="pb-6 mt-4 border-b-2">
      <div className="flex gap-2 mb-2">
        <div onClick={handleNavigateUserProfile}>
          <PostAvatar avatar={post?.user?.avatar} />
        </div>
        <div>
          <h3
            className="font-bold hover:text-gray-600 cursor-pointer"
            onClick={handleNavigateUserProfile}
          >
            {post?.user?.username}
          </h3>
          <div className="flex" onClick={() => handleViewPost(post?._id)}>
            <p className="border-b-2 border-white hover:border-gray-400 text-gray-400 cursor-pointer">
              {showDate}
            </p>
          </div>
        </div>
      </div>
      <div>
        {post?.content && (
          <div className="mb-2">
            <p>{post?.content}</p>
          </div>
        )}
        <div className="bg-black min-w-full flex justify-center items-center">
          <img
            src={`${API.PHOTO}/${post?.photos[0]}`}
            alt="Post Photo"
            className="max-h-[36rem] max-w-full"
          />
        </div>
      </div>
      <div className="text-2xl flex gap-4 mt-2">
        {isLiked ? (
          <button onClick={handleRemoveLikePost}>
            <FavoriteIcon fontSize="large" />
          </button>
        ) : (
          <button onClick={handleLikePost}>
            <FavoriteBorderIcon fontSize="large" />
          </button>
        )}
        <button onClick={() => handleViewPost(post?._id)}>
          <ChatBubbleOutlineIcon fontSize="large" />
        </button>
      </div>
      <div>
        {comments.length > 0 && (
          <button
            onClick={() => handleViewPost(post?._id)}
            className="text-gray-400 active:text-gray-300"
          >
            <p>View all {comments.length} comments</p>
          </button>
        )}
      </div>
      <div></div>
      <div className="mt-2 flex">
        <input
          type="text"
          name="comment"
          id="comment"
          className="outline-none bg-white w-full"
          placeholder="Comment on this post . . ."
          value={comment}
          onChange={handleCommentChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSendComment();
          }}
        />

        {comment && (
          <button
            className="font-bold hover:text-gray-600 px-2"
            onClick={handleSendComment}
          >
            {isSending ? "Sending" : "Send"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Post;
