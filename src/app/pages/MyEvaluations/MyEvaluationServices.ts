import axiosClient from 'app/services';

export class MyEvaluationServices {
  public import(file: File) {
    return axiosClient.post('/evaluations/import', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
