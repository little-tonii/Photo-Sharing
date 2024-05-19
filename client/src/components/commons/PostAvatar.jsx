import { API } from "../../utils/endpoints";

function PostAvatar({ avatar }) {
  return (
    <div className="max-h-12 max-w-12 rounded-full overflow-hidden cursor-pointer">
      <img src={`${API.AVATAR}/${avatar}`} alt="avatar" />
    </div>
  );
}

export default PostAvatar;
