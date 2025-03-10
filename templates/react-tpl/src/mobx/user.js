// mobx/user.js
import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

class UserStore {
  userInfo = null;

  constructor() {
    makeAutoObservable(this);
  }

  async login(data) {
    try {
      const res = await axios.post('/api/login', data);
      if (res?.code === 200) {
        runInAction(() => {
          this.userInfo = res.data;
        });
        // localStorage.setItem('userInfo', JSON.stringify(res.data));
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async logout() {
    try {
      const res = await axios.post('/api/logout');
      if (res?.code === 200) {
        runInAction(() => {
          this.userInfo = null;
        });
        // localStorage.removeItem('userInfo');
      }
      return res;
    } catch (error) {
      console.error('Logout failed:', error);
      return { error };
    }
  }

  get isLoggedIn() {
    return this.userInfo !== null;
  }

  setUserInfo(userInfo) {
    runInAction(() => {
      this.userInfo = userInfo;
    });
  }
}

export default new UserStore();
