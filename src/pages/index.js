import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
import Banner from "@/components/UI/Banner";
import AllNews from "./allNews.js";


const HomePage = ({allNewsData}) => {
  return (
    <>
      <Head>
        <title>PH-News Portal</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <AllNews allNewsData={allNewsData}/>
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// fetch all new data using SSG 

export const getStaticProps = async() => {
  const res = await fetch("http://localhost:5000/news")
  const dataOfNews = await res.json()
  // console.log("data of news",dataOfNews)
  return {props: {allNewsData: dataOfNews}}
}