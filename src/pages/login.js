import RootLayout from '@/components/Layouts/RootLayout';
import { LockOutlined, UserOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import style from '@/styles/Home.module.css'
import { signIn } from 'next-auth/react';

const LoginFrom = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };

    return (
        <>
            <div style={{height: "100vh", display: "flex", justifyContent:"center", alignItems: "center"}}>
                <div style={{width:"20%"}}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        >
                        <Form.Item
                            name="username"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                            ]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                            Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                            </Button> {" "}
                                Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                    <div className={style.login_iconsDesign}>
                        <GithubOutlined onClick={() => signIn("github", {
                            callbackUrl: "/"
                        })} style={{cursor: "pointer"}}/>
                        <GoogleOutlined onClick={() => signIn("google", {
                            callbackUrl: "/"
                        })} style={{cursor: "pointer"}}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginFrom;

LoginFrom.getLayout = function getLayout(page){
    return <RootLayout>{page}</RootLayout>
}