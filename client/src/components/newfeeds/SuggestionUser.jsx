import { API } from "../../utils/endpoints";

function SuggestionUser({ user }) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div className="max-h-16 max-w-16 rounded-full overflow-hidden cursor-pointer">
          <img src={`${API.AVATAR}/${user?.avatar}`} alt="avatar" />
        </div>
        <div>
          <button className="font-bold hover:text-gray-600">
            <h3>
              {user?.username.length >= 20
                ? user?.username.slice(0, 20) + "..."
                : user?.username}
            </h3>
          </button>
          <p className="text-gray-400">Suggest for you</p>
        </div>
      </div>
      <div className="font-semibold hover:text-gray-600">
        <button>follow</button>
      </div>
    </div>
  );
}

export default SuggestionUser;
