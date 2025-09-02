export interface ServicesResponse {
  checkEmailExists: {
    isSuccess: boolean;
    message?: string | null;
    data: {
      isReadyToEnterPass: boolean;
      isLogin: boolean;
      isReadyToSendCode: boolean;
      iReadyToSetPass: boolean; 
    };};
}
