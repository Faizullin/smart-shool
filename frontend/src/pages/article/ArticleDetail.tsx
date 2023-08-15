import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchArticleDetail } from '../../redux/store/reducers/articleSlice';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import Sidebar, { TriggerButton } from '../../components/sidebar/Sidebar';
import Breadcrumbs from '../../components/Breadcrumbs';

export interface IArticleDetailProps {
}

export default function ArticleDetail(_: IArticleDetailProps) {
    const dispatch = useAppDispatch()
    const { article_payload } = useAppSelector(state => state.article)
    const { id } = useParams()
    const [filtersSidebarOpen, setFiltersSidebarOpen] = React.useState<boolean>(false)


    React.useEffect(() => {
        if (id) {
            dispatch(fetchArticleDetail({ id }))
        }
    }, [])

    return (
        <Layout>
            <Breadcrumbs />
            <section id="blog" className="blog">
                <div className="container mx-auto" data-aos="fade-up">
                    <div className="flex justify-end items-center items-baseline border-b border-gray-200 px-6 pb-4 md:px-0">
                        <TriggerButton onClick={() => setFiltersSidebarOpen(!filtersSidebarOpen)} />
                    </div>

                    <div className="flex mt-8">
                        <div className="w-full lg:w-2/3 pr-4">
                            <div className="flex flex-wrap mx-auto posts-list">
                                <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg px-5">
                                    <div className='flex justify-between flex-wrap'>
                                        <div className='lg:w-1/3 w-full'>
                                            <img src={article_payload?.featured_image} alt="" className='w-full' />
                                        </div>
                                        <div className='lg:w-2/3 w-full'>
                                            <p className='ld:ml-[100px] text-xl'>{article_payload?.title}</p>
                                        </div>
                                    </div>
                                    <div className='my-5'>
                                        <div dangerouslySetInnerHTML={{ __html: article_payload?.content || "" }}></div>
                                    </div>
                                    <div className='my-5'>
                                        <object data={article_payload?.file} type="application/pdf" width="100%" height="100%">
                                            <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
                                        </object>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Sidebar open={filtersSidebarOpen} setOpen={setFiltersSidebarOpen} />
                    </div>
                </div>
            </section>
        </Layout >
    );
}
