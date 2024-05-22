import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSuggestionUser } from "../../contexts/SuggestionUserContext";
import { API } from "../../utils/endpoints";

function SuggestionUser({ userParams }) {
  const { user } = useAuth();
  const { handleFollowUser, handleUnfollowUser } = useSuggestionUser();
  const navigate = useNavigate();

  function handleNavigateUserProfile() {
    navigate(`/app/user/${userParams._id}`);
  }

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div
          onClick={handleNavigateUserProfile}
          className="max-h-16 max-w-16 rounded-full overflow-hidden cursor-pointer"
        >
          <img src={`${API.AVATAR}/${userParams?.avatar}`} alt="avatar" />
        </div>
        <div>
          <button
            className="font-bold hover:text-gray-600"
            onClick={handleNavigateUserProfile}
          >
            <h3>
              {userParams?.username.length >= 20
                ? userParams?.username.slice(0, 20) + " . . ."
                : userParams?.username}
            </h3>
          </button>
          <p className="text-gray-400">Suggest for you</p>
        </div>
      </div>
      {user?.followings.includes(userParams?._id) ? (
        <div className="font-semibold hover:text-gray-600">
          <button
            onClick={() => {
              handleUnfollowUser(userParams._id);
            }}
          >
            unfollow
          </button>
        </div>
      ) : (
        <div
          onClick={() => {
            handleFollowUser(userParams._id);
          }}
          className="font-semibold hover:text-gray-600"
        >
          <button>follow</button>
        </div>
      )}
    </div>
  );
}

export default SuggestionUser;
