import RootLayout from '@/components/Layouts/RootLayout';
import { CalendarOutlined, ProfileOutlined, CommentOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row } from 'antd';
import Image from 'next/image';
const { Meta } = Card;

const AllNews = ({allNewsData}) => {
    // console.log("allNew data ", allNewsData )
    return (
        <div style={{padding: "50px"}}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {allNewsData?.map((news) => (
                    <Col key={news.id} className="gutter-row" span={6}>
                        <Card
                            style={{
                                width: 300

                            }}
                            cover={
                                <Image
                                src={news?.image_url}
                                alt='Empty'
                                responsive
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

