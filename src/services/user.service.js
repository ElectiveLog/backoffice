import axios from 'axios';
// import authHeader from './auth-header';
const API_URL = 'http://10.117.129.194:8080/users';
class UserService {
  getUserBoard() {
    return axios.get(API_URL, {
      headers: {
        // "X-Server-Select": 'books',
        Authorization:
          'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTU3NTg3MjUsImV4cCI6MTY1NjM2MzUyNX0.vHdiEc98ELrbBDbeZeG-851qS_SLSHJW8HDJX7mPgjs',
      },
    });
  }
  //   getModeratorBoard() {
  //     return axios.get(API_URL + 'mod', { headers: authHeader() });
  //   }
  //   getAdminBoard() {
  //     return axios.get(API_URL + 'admin', { headers: authHeader() });
  //   }
}
export default new UserService();
