import { Button } from "antd";
import Link from "next/link";
import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
// import { useGetNewsQuery } from "@/redux/features/api/apiSlice";

const ContactPage = () => {

  // const {data, isLoading, isError, error} = useGetNewsQuery()
  // console.log(data)

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "25%",
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
      <h1>Developer is sleeping....! Contact Us page coming soon....!</h1>
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

