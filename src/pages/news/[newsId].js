import RootLayout from "@/components/Layouts/RootLayout";
import { Card } from 'antd';
import { CalendarOutlined, ProfileOutlined, CommentOutlined, ArrowRightOutlined, UserOutlined } from '@ant-design/icons';
import Image from "next/image";
import Link from "next/link";
const { Meta } = Card;

const NewsDetails = ({news}) => {
    // const router = useRouter({news})
    return (
        <div>
            <Card
                style={{display: 'flex', padding: "50px", marginTop: "50px"}}
                cover={
                    <Image
                    src={news?.image_url}
                    alt='Empty'
                    width="400"
                    height="400"
                    />
                }
                
            >

                <Meta
                title={news.title}
                description={news?.description}
                />

                <Link href={`/`}>
                    <p
                    style={{
                        fontSize: "15px",
                        marginTop: "40px",
                        backgroundColor: "black",
                        color: "white",
                        width: "100%",
                        padding: "10px 5px ",
                        fontWeight: "300",
                        letterSpacing: "3px",
                        textAlign: "center",
                    }}
                    >
                    Back Home <ArrowRightOutlined />
                    </p>
                </Link>
                <div style={{paddingTop: "40px"}}>
                    <div><CalendarOutlined/> {news.release_date}</div>
                    <div style={{padding: "20px 0px"}}> <ProfileOutlined/> {news?.category}</div>
                    <div><CommentOutlined/> {news?.comment_count}</div>
                    <div style={{paddingTop: "20px"}}><UserOutlined /> {news?.author}</div>
                </div>
            </Card>
        </div>
    );
};

export default NewsDetails;

NewsDetails.getLayout = function getLayout(page){
    return <RootLayout>{page}</RootLayout>
}

// befor hit the url all news router going the SSG position 
export const getStaticPaths = async() => {
    const res = await fetch("http://localhost:5000/news")
    const allNews = await res.json()

    const paths = allNews.map((news) => ({
        params: {newsId: (news.id).toString()}
    }));

    return {paths, fallback: false};
} 

export const getStaticProps = async(context) => {
    const {params} = context
    const res = await fetch(`http://localhost:5000/news/${params.newsId}`)
    const data = await res.json();
    console.log("data result", data);

    return {
        props: {
            news: data,
        }
    };
};
