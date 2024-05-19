import Post from "./Post";
import SuggestionUser from "./SuggestionUser";
import { useAuth } from "../../contexts/AuthContext";
import { useNewFeeds } from "../../contexts/NewFeedsContext";
import { API } from "../../utils/endpoints";

function NewFeeds() {
  const { user } = useAuth();

  const { posts, suggestUsers } = useNewFeeds();

  return (
    <div className="w-5/6 overflow-x-hidden flex">
      <div className="w-2/3 pr-32 pl-48 first:mt-4">
        {user?.followings.length === 0 ? (
          <div className="text-gray-600 font-bold text-2xl mr-auto ml-auto mt-12 text-center">
            <h1>Starting to follow people to see their life</h1>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-gray-600 font-bold text-2xl mr-auto ml-auto mt-12 text-center">
            <h1>Nothing here. Try to follow others to see their life</h1>
          </div>
        ) : (
          posts.map((post, index) => <Post key={index} user={post} />)
        )}
      </div>
      <div className="w-1/3 pr-8 mt-8">
        <div className="flex justify-between items-center pb-4 border-b-2">
          <div className="flex gap-2">
            <div className="max-h-16 max-w-16 rounded-full overflow-hidden cursor-pointer">
              <img src={`${API.AVATAR}/${user?.avatar}`} alt="avatar" />
            </div>
            <div>
              <button className="font-bold hover:text-gray-600">
                <h3>
                  {user?.username.length >= 20
                    ? user?.username.slice(0, 20) + " . . ."
                    : user?.username}
                </h3>
              </button>
              <p className="text-gray-400">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
          </div>
          <div className="font-semibold hover:text-gray-600">
            <button>profile</button>
          </div>
        </div>
        <div className="pt-2 pb-4 text-gray-400 font-bold">
          <p>Suggest for you</p>
        </div>
        <div className="flex flex-col gap-4">
          {suggestUsers.length === 0 ? (
            <div className="text-gray-600 font-bold text-2xl mr-auto ml-auto mt-12 text-center">
              <h1>Nothing here</h1>
            </div>
          ) : (
            suggestUsers.map((suggestUser, index) => (
              <SuggestionUser key={index} user={suggestUser} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NewFeeds;
