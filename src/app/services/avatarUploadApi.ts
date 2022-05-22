import axiosClient from '.';

export const uploadAvatarClient = async (image: any, userId: number) => {
  try {
    const result = await axiosClient.post(`/users/${userId}/avatar`, image);
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const uploadNewAvatar = async (data: FormData) => axiosClient.post('/users/avatar', data);
