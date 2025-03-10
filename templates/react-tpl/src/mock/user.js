import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const setupUserMock = () => {
  const mock = new MockAdapter(axios);
  // 登录
  mock.onPost('/api/login').reply((config) => {
    const requestData = JSON.parse(config.data);
    return [
      200,
      {
        code: 200,
        message: 'success',
        data: {
          token: 'mockToken',
          username: requestData.username,
          userId: 'mockUserId',
          avatar: 'https://tinechat-cdn.tineco.com/avatarsfs/es8zLSjXJzkHeqFT4',
        },
      },
    ];
  });
  // 登出
  mock.onPost('/api/logout').reply(() => {
    return [
      200,
      {
        code: 200,
        message: 'success',
      },
    ];
  });
};
