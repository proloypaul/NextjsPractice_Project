import RootLayout from '@/components/Layouts/RootLayout';
import React from 'react';

const AllNews = () => {
    return (
        <div>
            <h1>All News section</h1>
        </div>
    );
};

export default AllNews;

AllNews.getLayout = function getLayout(page){
    return <RootLayout>{page}</RootLayout>
}