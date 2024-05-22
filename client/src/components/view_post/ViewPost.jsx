import { useViewPost } from "../../contexts/ViewPostContext";
import { API } from "../../utils/endpoints";

function ViewPost() {
  const { post, comments, handleSetPostId } = useViewPost();

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
          <div className="flex flex-col w-[28rem] pl-2 justify-between">
            {comments.length > 0 ? (
              <div className="overflow-scroll flex flex-col gap-4 overflow-x-hidden">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className={`flex w-full gap-1 ${
                      index === 0 ? "pt-4" : ""
                    } ${index === comments.length - 1 ? "pb-4" : ""}`}
                  >
                    <div className="max-w-16 h-16 min-w-16 rounded-full overflow-hidden cursor-pointer">
                      <img
                        className="min-h-full min-w-full"
                        src={`${API.AVATAR}/${comment?.user.avatar}`}
                        alt="avatar"
                      />
                    </div>
                    <div>
                      <p className="pr-2">
                        <span className="font-bold cursor-pointer hover:text-gray-600">
                          {comment?.user.username}
                        </span>{" "}
                        {comment?.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-start mt-12 text-xl text-gray-400">
                <h2>Comments will show up here</h2>
              </div>
            )}
            <div className="flex p-2 gap-2 justify-center items-center border-t-2">
              <span className="ti ti-heart text-2xl px-2"></span>
              <input
                type="text"
                name="comment-input"
                id="comment-input"
                className="outline-none bg-white w-full"
                placeholder="Comment on this post . . ."
              />
              <button className="font-bold hover:text-gray-600 px-2">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewPost;
