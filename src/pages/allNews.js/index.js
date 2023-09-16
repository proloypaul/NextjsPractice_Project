import RootLayout from '@/components/Layouts/RootLayout';
import { CalendarOutlined, ProfileOutlined, CommentOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
const { Meta } = Card;

const AllNews = ({allNewsData}) => {
    // console.log("allNew data ", allNewsData )
    return (
        <div style={{padding: "50px"}}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {allNewsData?.map((news) => (
                    <Col key={news.id} className="gutter-row" span={6}>
                        <Card
                            hoverable
                            cover={
                                <Image
                                src={news?.image_url}
                                alt='Empty'
                                width="300"
                                height="300"
                                />
                            }
                            actions={[
                                <div key='text'><CalendarOutlined/> {news.release_date}</div>,
                                <div key='text'> <ProfileOutlined/> {news?.category}</div>,
                                <div key='text'><CommentOutlined/> {news?.comment_count}</div>,
                            ]}
                        >
                            <Meta
                            title={news.title}
                            description={news?.description.length > 100
                                ? news?.description.slice(0, 70) + "..."
                                : news?.description}
                            />

                            <Link href={`/news/${news?.id}`}>
                                <p
                                style={{
                                    fontSize: "15px",
                                    marginTop: "20px",
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "100%",
                                    padding: "2px 5px ",
                                    fontWeight: "300",
                                    letterSpacing: "3px",
                                    textAlign: "center",
                                }}
                                >
                                Keep Reading <ArrowRightOutlined />
                                </p>
                        </Link>
                        </Card>
                    </Col>
                ))}
                
            </Row>
        </div>
    );
};

export default AllNews;

AllNews.getLayout = function getLayout(page){
    return <RootLayout>{page}</RootLayout>
}

