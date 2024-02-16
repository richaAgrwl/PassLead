import Head from 'next/head';
import HomePageData from '@/container/HomePage';
export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Lead's</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <h1>
        <HomePageData />
      </h1>
    </div>
  );
}
