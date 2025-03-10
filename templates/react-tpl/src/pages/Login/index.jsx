import style from './index.module.scss';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { userStore } from '@/mobx';
import { observer } from 'mobx-react-lite';

const Login = observer(() => {
  const navigate = useNavigate();

  const onFinish = async (data) => {
    userStore.login(data);
  };

  useEffect(() => {
    if (userStore.isLoggedIn) {
      navigate('/home');
    }
  }, [userStore.isLoggedIn]);

  return (
    <div className={style.login_container}>
      <div className={style.login_card}>
        <Form
          className={style.login_form}
          name="loginForm"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          >
            <Input autoComplete="username" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password autoComplete="current-password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});

export default Login;
