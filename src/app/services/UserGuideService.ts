import axios_client from '.';
class UserGuideService {
  uploadUserGuide = data => {
    return axios_client.post('/user-upload/user-guide', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
}

const userGuideService = new UserGuideService();

export default userGuideService;
