import { useState } from "react";
import axios from "axios";

function Profile({ user }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const res = await axios.put("http://ivmproject.onrender.com/api/change-password", {
      email: user.email,
      oldPassword,
      newPassword,
    });

    if (res.data.success) {
      alert("Password updated");
      setOldPassword("");
      setNewPassword("");
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div>
      <div class="prof">
        <h2 id="head">👤Profile</h2>
        <p>Email: {user.email}</p>
      </div>

      <form class="chaform" onSubmit={handleChangePassword}>
        <div class="inp">
          <h2 id="head2">Change password</h2>
          <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;