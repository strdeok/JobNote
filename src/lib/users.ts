import axios from "axios";

export const setUserAvatar = async (avatarUrl: string) => {
  try {
    const res = await axios.patch(
      "/api/users/avatar",
      {
        avatarUrl,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const setNickName = async (nickname: string) => {
  try {
    const res = await axios.patch(
      "/api/users/nickname",
      {
        nickname,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (newPassword: string) => {
  try {
    const res = await axios.patch(
      "/api/users/reset-password",
      {
        newPassword,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const withdraw = async () => {
  try {
    const res = await axios.delete("/api/auth/withdraw", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
