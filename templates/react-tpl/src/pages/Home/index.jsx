import { useState } from 'react';
import style from './index.module.scss';
import { userStore } from '@/mobx';
import { observer } from 'mobx-react-lite';
import { Dropdown, Button, Menu } from 'antd';
import logoImg from '@/assets/images/logo.svg';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

const Home = observer(() => {
  const logout = async () => {
    await userStore.logout();
  };

  const avatarItems = [
    {
      label: <div onClick={logout}>退出登录</div>,
      key: 'logout',
    },
  ];

  const navItems = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      label: 'Option 1',
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: 'Option 2',
    },
    {
      key: '3',
      icon: <ContainerOutlined />,
      label: 'Option 3',
    },
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <MailOutlined />,
      children: [
        {
          key: '5',
          label: 'Option 5',
        },
        {
          key: '6',
          label: 'Option 6',
        },
        {
          key: '7',
          label: 'Option 7',
        },
        {
          key: '8',
          label: 'Option 8',
        },
      ],
    },
    {
      key: 'sub2',
      label: 'Navigation Two',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: '9',
          label: 'Option 9',
        },
        {
          key: '10',
          label: 'Option 10',
        },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            {
              key: '11',
              label: 'Option 11',
            },
            {
              key: '12',
              label: 'Option 12',
            },
          ],
        },
      ],
    },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={style.container}>
      {/* 顶部 */}
      <div className={style.header}>
        <div className={style.logo}>
          <img className={style.logo_img} src={logoImg} alt="" />
        </div>
        <div className={style.avatar}>
          <Dropdown
            menu={{
              items: avatarItems,
            }}
            trigger={['click']}
          >
            <img
              className={style.avatar_img}
              src={userStore.userInfo?.avatar}
              alt=""
            />
          </Dropdown>
        </div>
      </div>
      {/* 导航 */}
      <div className={style.nav}>
        <Button
          type="link"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={navItems}
        />
      </div>
      {/* 内容 */}
      <div className={style.main}>内容</div>
      {/* 底部 */}
      <div className={style.footer}>底部</div>
    </div>
  );
});

export default Home;
