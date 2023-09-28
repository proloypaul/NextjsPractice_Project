import Link from "next/link";
import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
import { Button, Form, Input, Spin } from 'antd';
// import { useEffect, useState } from "react";
import { usePostNewsMutation } from "@/redux/features/api/apiSlice";


const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
const formTailLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
    offset: 4,
  },
};


const ContactPage = () => {
  const [form] = Form.useForm();
  const [postNews, {isLoading, isError, isSuccess}] = usePostNewsMutation()
  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      // console.log('Success:', values);
      const withDefaultImg = {
        ...values,
        img: "https://i.ibb.co/YBwY9yg/satellite-image.jpg"
      }
      const options = {
        data: withDefaultImg
      }

      postNews(options)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  console.log("isLoading, isError and isSuccess",isLoading, isError, isSuccess)
  return (
    <div
    style={{
      textAlign:'center',
      paddingTop:"15%"
    }}
    >
      <Head>
        <title>PH_NP-Contact Us</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
      <Form
      form={form}
      name="dynamic_rule"
      style={{
        maxWidth: 700,
        textAlign: "center"
      }}
    >
      <Form.Item
        {...formItemLayout}
        name="title"
        label="News Title"
        rules={[
          {
            required: true,
            message: 'Please input news title',
          },
        ]}
      >
        <Input placeholder="Enter News Title" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="description"
        label="Description"
        rules={[
          {
            message: 'Please Enter News Description',
          },
        ]}
      >
        <Input placeholder="Enter News Description " />
      </Form.Item>
      <Form.Item {...formTailLayout}>
        <Button type="primary" onClick={onCheck} style={{background: "crimson"}}>
          Post{" "}{isLoading?<Spin/>:""}
        </Button>
      </Form.Item>
      </Form>
      </div>
      <Link href="/">
        <Button>Back To Home</Button>
      </Link>
    </div>
  );
};

export default ContactPage;

ContactPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

