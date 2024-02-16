import ResetPassword from '@/container/ResetPassword';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 60,
  };
}
export default ResetPassword;
