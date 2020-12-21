import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import { ToastContainer , toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { auth } from '../../firebase';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Staff = () => {

    const [email, setEmail] = useState('')



    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: 'http://localhost:3000/staff/complete',
            handleCodeInApp: true
        }
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Email is sent to ${email}. Click the link to camplete your registration.`);

        window.localStorage.setItem('emailForRegistration', email);
        setEmail("")
    }

    const staffForm = () => {
        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onSubmit={handleSubmit}
            >
                <Form.Item
                    label="Email"
                    name="username"
                    values={email}
                    onChange={(e) => setEmail(e.target.value)}
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {staffForm()}
                </div>
            </div>
        </div>
    )
}

export default Staff
