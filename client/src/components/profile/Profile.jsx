import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { API } from "../../utils/endpoints";
import axios from "axios";
import { useViewPost } from "../../contexts/ViewPostContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, updateUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const { handleViewPost, postId } = useViewPost();
  const navigate = useNavigate();

  const joinedAt = new Date(user?.createdAt).toLocaleDateString().split("/");

  function handleProfileSetting() {
    navigate("/app/profile/setting");
  }

  useEffect(() => {
    async function getPostsOfUser() {
      if (!user) {
        updateUser(localStorage.getItem("user"));
      }

      const res = await axios.get(`${API.GET_POST}/?userId=${user?._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const data = await res.data;
      setPosts(data);
    }
    getPostsOfUser();
  }, []);

  return (
    <div
      className={`w-5/6 overflow-x-hidden px-36 py-12 ${
        postId && "overflow-y-hidden"
      }`}
    >
      <div className="flex gap-12 justify-start pb-12 pl-16">
        <div className="w-1/5 bg-white rounded-full ">
          <img
            src={`${API.AVATAR}/${user?.avatar}`}
            alt="avatar"
            className=""
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-bold text-2xl flex gap-4">
            <div>
              <h1>{user?.username}</h1>
            </div>
            <div>
              <button
                onClick={handleProfileSetting}
                className="active:scale-95 transition-all bg-black text-white px-2 py-1 rounded-lg border-2 border-white hover:border-black hover:bg-white hover:text-black bg-opacity-80 active:bg-black active:border-white active:text-white "
              >
                <span className="ti ti-settings text-lg flex justify-center items-center"></span>
              </button>
            </div>
          </div>
          <div className="flex gap-12 text-lg">
            <h3>
              <span className="font-bold">{posts.length}</span> posts
            </h3>
            <h3>
              <span className="font-bold">{user?.followers.length}</span>{" "}
              followers
            </h3>
            <h3>
              <span className="font-bold">{user?.followings.length}</span>{" "}
              followings
            </h3>
          </div>
          <div className="font-bold text-lg flex flex-col gap-2">
            <h3>
              {user?.firstName} {user?.lastName}
            </h3>
            <h3 className="text-gray-400">
              Joined at {`${joinedAt[1]}/${joinedAt[0]}/${joinedAt[2]}`}
            </h3>
          </div>
        </div>
      </div>
      {posts.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 pt-12 mx-8 border-t-2">
          {posts.map((post, index) => (
            <div
              onClick={() => handleViewPost(post?._id)}
              key={index}
              className="bg-black h-72 flex justify-center items-center cursor-pointer relative"
            >
              <img
                className="max-w-full max-h-full"
                src={`${API.PHOTO}/${posts[index]?.photos[0]}`}
                alt="post-photo"
              />
              <div className="h-full w-full bg-gray-400 opacity-0 hover:opacity-35 absolute"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mx-8 border-t-2">
          <h2 className="font-bold text-4xl text-gray-400 mt-32">
            Nothing here
          </h2>
        </div>
      )}
    </div>
  );
}

export default Profile;
