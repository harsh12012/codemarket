import Head from 'next/head';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import LoginRegister from '../src/app/components/auth/LoginRegister';
import InitialLoading from '../src/app/components/other/InitialLoading';
import Nav from '../src/app/components/other/Nav';
import VerifyEmail from '../src/app/components/auth/VerifyEmail';

function Home({ isSpaceOwner, emailVerified, initial, authenticated }) {
  const router = useRouter();

  if (initial && authenticated && emailVerified) {
    router.push('/dashboard');
    // if (isSpaceOwner) {
    //   router.push("/dashboard");
    // } else {
    //   router.push("/parkings");
    // }
  }

  if ((initial && !authenticated) || !emailVerified) {
    return (
      <div>
        <Nav />
        <Head>
          <title>Parkyourself</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container pt-3 pb-3">
          {authenticated && !emailVerified ? <VerifyEmail /> : <LoginRegister />}
        </div>
      </div>
    );
  }
  return (
    <div>
      <InitialLoading />
    </div>
  );
}

const mapStateToProps = ({ auth, user }) => {
  return {
    authenticated: auth.authenticated,
    initial: auth.initial,
    isSpaceOwner: user.isSpaceOwner,
    // emailVerified: auth.authenticated ? auth.data.attributes.email_verified : null
    emailVerified: true
  };
};

export default connect(mapStateToProps)(Home);
