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
