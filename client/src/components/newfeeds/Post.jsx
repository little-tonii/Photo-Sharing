import { useState } from "react";
import PostAvatar from "../commons/PostAvatar";
import { API } from "../../utils/endpoints";

function Post({ user, post }) {
  const [comment, setComment] = useState("");

  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  return (
    <div className="pb-6 mt-4 border-b-2">
      <div className="flex gap-2 mb-2">
        <PostAvatar avatar={user?.avatar} />
        <div>
          <h3 className="font-bold hover:text-gray-600">{user?.username}</h3>
          <p className="text-gray-400">{post?.createdAt}</p>
        </div>
      </div>
      <div>
        {post?.context && (
          <div className="mb-2">
            <p>{post?.content}</p>
          </div>
        )}
        <div className="bg-black min-w-full flex justify-center items-center">
          <img
            src={`${API.PHOTO}/${post?.photo[0]}`}
            alt="Post Photo"
            className="max-h-[36rem] max-w-full"
          />
        </div>
      </div>
      <div className="text-2xl flex gap-4 mt-2">
        <button>
          <span className="ti ti-heart"></span>
        </button>
        <button>
          <span className="ti ti-comment"></span>
        </button>
      </div>
      <div>
        <button className="text-gray-400 active:text-gray-300">
          <p>View all x comments</p>
        </button>
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          name="comment"
          id="comment"
          className="outline-none bg-white w-full"
          placeholder="Comment on this post . . ."
          value={comment}
          onChange={handleCommentChange}
        />
        {comment && (
          <button className="font-bold hover:text-gray-600 px-2">Send</button>
        )}
      </div>
    </div>
  );
}

export default Post;
