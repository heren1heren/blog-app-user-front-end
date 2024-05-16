import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Footer = () => {
  return (
    <div className=" bg-black  text-bg-primary text-center  mt-auto ">
      Make by <a href="https://github.com/heren1heren"> cookie Turtle</a>
    </div>
  );
};
const NavBar = ({ title }) => {
  return (
    <ul className="nav justify-content-end ">
      <div className=" me-auto ">{title}</div>
      <li className="nav-item">
        <Link className="nav-link " to="/" aria-current="page">
          Blogs
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">
          About Me
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/signUp">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " to="/login">
          Log In{' '}
        </Link>
      </li>
    </ul>
  );
};
const Layout = ({ children, title }) => {
  useEffect(() => {
    document.title = `${title}`;
  }, [title]);
  return (
    <div className=" d-flex flex-column min-vh-100">
      <NavBar title={title} />
      {children}
      <Footer />
    </div>
  );
};
const App = () => {
  return <Layout title={'Blog App'}> main page</Layout>;
};
export const About = () => {
  return <Layout title={'About Me'}> I am a website developer</Layout>;
};

export const ErrorPage = () => {
  return (
    <div>
      <NavBar title="error" />
      <h1>Oh no, this route doesn&apos;t exist!</h1>
      <Footer />
    </div>
  );
};

export function Login() {
  return <Layout title="Log In"> login</Layout>;
}
export function SignUp() {
  return (
    <Layout title={'Sign up'}>
      {' '}
      <p>hello</p>
    </Layout>
  );
}

export default App;
