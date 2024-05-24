import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { API } from "../../utils/endpoints";

function ProfileSetting() {
  const { user, updateUser } = useAuth();

  const [currentUsername, setCurrentUsername] = useState(user?.username);

  const [currentFirstName, setCurrentFirstName] = useState(user?.firstName);

  const [currentLastName, setCurrentLastName] = useState(user?.lastName);

  function handleOnChangeUsername(e) {
    setCurrentUsername(e.target.value);
  }

  function handleOnChangeFirstName(e) {
    setCurrentFirstName(e.target.value);
  }

  function handleOnChangeLastName(e) {
    setCurrentLastName(e.target.value);
  }

  function handleResetField() {
    setCurrentUsername(user?.username);
    setCurrentFirstName(user?.firstName);
    setCurrentLastName(user?.lastName);
  }

  async function handleUpdateProfile() {
    const res = await axios.patch(
      `${API.UPDATE_PROFILE}/${user?._id}`,
      {
        username: currentUsername.trim().toLowerCase(),
        firstName: currentFirstName.trim(),
        lastName: currentLastName.trim(),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (res.status === 200) {
      updateUser(res.data);
    }
  }

  return (
    <div className="w-5/6 overflow-x-hidden px-36 py-12 flex justify-center">
      <div className="w-3/5 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-black text-lg font-bold">Email</p>
          </div>
          <input
            disabled={true}
            type="text"
            className="outline-none w-full p-2 rounded-lg bg-white border-2 focus-within:border-black text-gray-400"
            value={user?.email}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-black text-lg font-bold">Username</p>
          </div>
          <input
            onChange={handleOnChangeUsername}
            type="text"
            className="outline-none w-full p-2 rounded-lg bg-white border-2 focus-within:border-black hover:border-black"
            value={currentUsername}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-black text-lg font-bold">First Name</p>
          </div>
          <input
            onChange={handleOnChangeFirstName}
            type="text"
            className="outline-none w-full p-2 rounded-lg bg-white border-2 focus-within:border-black hover:border-black"
            value={currentFirstName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-black text-lg font-bold">Last Name</p>
          </div>
          <input
            onChange={handleOnChangeLastName}
            type="text"
            className="outline-none w-full p-2 rounded-lg bg-white border-2 focus-within:border-black hover:border-black"
            value={currentLastName}
          />
        </div>
        <div>
          <button onClick={handleUpdateProfile} className="active:scale-95 transition-all bg-black text-white w-full p-4 rounded-lg border-2 border-white hover:border-black hover:bg-white hover:text-black bg-opacity-80 active:bg-black active:border-white active:text-white font-bold">
            Update Profile
          </button>
          <button
            onClick={handleResetField}
            className="active:scale-95 transition-all bg-black text-white w-full p-4 rounded-lg border-2 border-white hover:border-black hover:bg-white hover:text-black bg-opacity-80 active:bg-black active:border-white active:text-white font-bold"
          >
            Reset Fields
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
