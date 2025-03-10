import { Outlet } from 'react-router-dom';
import style from './index.module.scss';
import { useEffect } from 'react';
import { userStore } from '@/mobx';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const Layout = observer(() => {
  const navigate = useNavigate();

  // 在页面刷新或关闭时保存 userInfo 到 localStorage
  const handleBeforeUnload = () => {
    if (userStore.userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userStore.userInfo));
    }
  };

  useEffect(() => {
    if (!userStore.isLoggedIn && !localStorage.getItem('userInfo')) {
      navigate('/login');
    }
  }, [userStore.isLoggedIn, navigate]);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      // 已登录信息赋值给mobx全局变量
      userStore.setUserInfo(JSON.parse(userInfo));
      // 清除本地存储
      localStorage.removeItem('userInfo');
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className={style.container}>
      <Outlet />
    </div>
  );
});

export default Layout;
