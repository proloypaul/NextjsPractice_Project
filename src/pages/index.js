import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
// import Banner from "@/components/UI/Banner";
import AllNews from "./allNews.js";
import dynamic from 'next/dynamic'


const HomePage = ({allNewsData}) => {

  // lazy loading banner section
  const DynamicBanner = dynamic(() => import("@/components/UI/Banner"), {
    loading: () => <h1 style={{height: "100vh", width: "100%", display: "flex", justifyContent:"center", alignItems:"center"}}>Loading...</h1>,
    // also skip Server Side Rendering
    ssr: false,
  })

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
      <DynamicBanner/>
      <AllNews allNewsData={allNewsData}/>
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// fetch all news data using SSG getStaticProps method 

// export const getStaticProps = async() => {
//   const res = await fetch("http://localhost:5000/news")
//   const dataOfNews = await res.json()
//   // console.log("data of news",dataOfNews)
//   return {props: {allNewsData: dataOfNews}, revalidate: 30}
// }

// fetch all news data using SSR

export const getServerSideProps = async() => {
  const res = await fetch("http://localhost:5000/news")
  const dataOfNews = await res.json()
  // console.log("data of news",dataOfNews)
  return {props: {allNewsData: dataOfNews}}
}