import Layout from '../components/layouts/Layout';
import Herobar from '../components/HeroBar';
import { mdiCheckCircle } from '@mdi/js';
import Breadcrumbs from '../components/Breadcrumbs';

import { FormattedMessage } from 'react-intl';

export interface IAboutProps {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function About(_: IAboutProps) {
    return (
        <Layout>
            <Herobar />
            <Breadcrumbs />
            <section id="about" className="about">
                <div className="container mx-auto sm:px-4" data-aos="fade-up">
                    <div className="section-header">
                        <h2>
                            <FormattedMessage
                                id="app.about.header.name"
                                defaultMessage="About us"
                            />
                        </h2>
                        <p>
                            <FormattedMessage
                                id="app.about.header.question"
                            />
                        </p>
                    </div>

                    <div className="flex flex-wrap  gy-4">
                        <div className="lg:w-1/2 pr-4 pl-4">
                            <h3>Voluptatem dignissimos provident quasi corporis</h3>
                            <img src={''}
                                className="max-w-full h-auto rounded-lg object-cover mb-4" alt="" />
                            <p>Ut fugiat ut sunt quia veniam. Voluptate perferendis perspiciatis quod nisi et. Placeat debitis quia recusandae odit et consequatur voluptatem. Dignissimos pariatur consectetur fugiat voluptas ea.</p>
                            <p>Temporibus nihil enim deserunt sed ea. Provident sit expedita aut cupiditate nihil vitae quo officia vel. Blanditiis eligendi possimus et in cum. Quidem eos ut sint rem veniam qui. Ut ut repellendus nobis tempore doloribus debitis explicabo similique sit. Accusantium sed ut omnis beatae neque deleniti repellendus.</p>
                        </div>
                        <div className="lg:w-1/2 pr-4 pl-4">
                            <div className="content ps-0 lg:ps-12">
                                <p className="fst-italic mb-4">
                                    <FormattedMessage
                                        id="app.about.content.p1"
                                    />
                                </p>
                                <ul className="mb-4">
                                    <li>
                                        <i>
                                            <img src={mdiCheckCircle} alt="" />
                                        </i>
                                        <FormattedMessage
                                            id="app.about.content.i1"
                                        />
                                    </li>
                                    <li>
                                        <i>
                                            <img src={mdiCheckCircle} alt="" />
                                        </i>
                                        <FormattedMessage
                                            id="app.about.content.i2"
                                        />
                                    </li>
                                    <li>
                                        <i>
                                            <img src={mdiCheckCircle} alt="" />
                                        </i>
                                        <FormattedMessage
                                            id="app.about.content.i3"
                                        />
                                    </li>
                                </ul>
                                <p className="mb-4">
                                    <FormattedMessage
                                        id="app.about.content.p2"
                                    />
                                </p>
                                <img src={''}
                                    className="max-w-full h-auto rounded-lg object-cover mb-4" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
