import axiosClient from '.';

class UsersService {
  export() {
    return axiosClient.get('/users/export', {
      responseType: 'blob',
    });
  }

  import(file) {
    return axiosClient.post('/users/import', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  print(userIds: number[]) {
    return axiosClient.post('/prints/print-user', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: userIds,
    });
  }
}

const usersService = new UsersService();

export default usersService;
