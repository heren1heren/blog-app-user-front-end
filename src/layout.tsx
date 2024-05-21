import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
const Footer = () => {
  return (
    <div className=" bg-black  text-bg-primary text-center  mt-auto ">
      Make by <a href="https://github.com/heren1heren"> cookie Turtle</a>
    </div>
  );
};
const NavBar = ({ title }: { title: string }) => {
  const token = localStorage.getItem('jwtToken');
  // console.log(`inside navBar: ${token}`);
  const handleLogOut = () => {
    localStorage.clear();
  };
  return (
    <ul className="nav justify-content-end ">
      <h2 className="  ms-1 mt-lg-1  me-auto  ">{title}</h2>
      <li className="nav-item">
        <Link className="nav-link " to="/" aria-current="page">
          Blogs
        </Link>
      </li>
      {token ? (
        <li className="nav-item">
          <Link className="nav-link" to="/login" onClick={handleLogOut}>
            Log Out
          </Link>
        </li>
      ) : (
        <>
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
        </>
      )}
    </ul>
  );
};
const Layout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
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
export default Layout;
