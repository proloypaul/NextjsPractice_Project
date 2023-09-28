import Link from "next/link";
import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
import { Button, Col, Form, Input, Row, Spin } from 'antd';
// import { useEffect, useState } from "react";
import { useGetNewsQuery, usePostNewsMutation } from "@/redux/features/api/apiSlice";
import { Card } from 'antd';
import Image from "next/image";

const { Meta } = Card;


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
  // get postedNews using redux 
  const {data, isLoading:getNewLoad, isError:getNewError, error} = useGetNewsQuery()

  // after posted single data refetchOnMountOrArgChange help us to display data 
  // const {data, isLoading:getNewLoad, isError:getNewError, error} = useGetNewsQuery(id,{refetchOnMountOrArgChange: true, pollingInterval: 30000})

  // console.log("posted data", data.postedData)
  // post data using redux 
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
      <div>
        <Link href="/">
          <Button>Back To Home</Button>
        </Link>
      </div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{paddingTop:"50px"}}>
        {data?.postedData?.map((news) =>(
          <Col key={news._id} span={6}>
            <Card
            hoverable
            // style={{ width: 240 }}
            cover={<Image src={news?.img} alt="Empty!" width={300} height={300}/>}
            >
              <Meta title={news.title} description={news.description}/>
            </Card>
            </Col>
        ))}
      </Row>
    </div>
  );
};

export default ContactPage;

ContactPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

