import { useEffect, useState } from "react";
import { API } from "../../utils/endpoints";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useViewPost } from "../../contexts/ViewPostContext";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const { postId, handleViewPost } = useViewPost();

  const joinedAt = new Date(user?.createdAt).toLocaleDateString().split("/");

  useEffect(() => {
    async function getData() {
      const userId = location.pathname.split("/")[3];
      const resUser = await axios.get(`${API.GET_USER}/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const userData = resUser.data;

      setUser(userData);

      const resPosts = await axios.get(`${API.GET_POST}/?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const postsData = resPosts.data;

      setPosts(postsData);
    }
    getData();
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
          <div className="font-bold text-2xl">
            <h1>{user?.username}</h1>
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
              onClick={() => handleViewPost(post._id)}
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

export default UserProfile;
