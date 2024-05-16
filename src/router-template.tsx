import { useEffect, useState } from 'react';
import Layout from './layout';
import './index.scss';

const Blog = () =>
  // { title, description, likeCount }
  {
    return (
      <div className=" grid-item d-flex flex-column">
        <h3> blog title </h3>
        <p>
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A, atque eum!
          Dicta laboriosam quam nulla quos ad perspiciatis consequuntur dolor.
          Tenetur autem nam id quisquam deleniti nesciunt quam accusantium eum?
        </p>
        <div> like: 2</div>

        <h3>comments:</h3>
        <a href="/"> Go to blog</a>
        <div className=" align-self-end mt-auto"> Date: 22/2/2022</div>
      </div>
    );
  };
const BlogsContainer = () => {
  return (
    <div className=" d-flex flex-column justify-content-center align-items-center gap-3">
      <Blog />
      <Blog />
      <Blog />
      <Blog />
      <Blog />
    </div>
  );
};
const BlogForm = () => {
  const [isAuth, setIsAuth] = useState(true);
  return (
    <>
      {isAuth ? (
        <form action="/" method="POST">
          Post Blog:
          <div className="input-group mb-3">
            <span className="input-group-text">Title</span>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="placeholder"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Description:
            </label>
            <textarea
              className="form-control"
              name="comment"
              id=""
              rows={3}
              placeholder="comment here."
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            {' '}
            Post
          </button>
        </form>
      ) : (
        <p> log in to post blogs</p>
      )}
    </>
  );
};
const LoginForm = () => {};
const SignUpForm = () => {};

const App = () => {
  const [blogs, setBlogs] = useState([]);

  // fetch data by use effect

  return (
    <Layout title={'Blog App'}>
      <BlogsContainer />
      <BlogForm />
    </Layout>
  );
};
export const About = () => {
  return (
    <Layout title={'About Me'}>
      {' '}
      I am a cookie turtle,
      <form action="/" method="POST">
        <p>contact me through email:</p>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            name=""
            id=""
            aria-describedby="helpId"
            placeholder=""
          />
        </div>

        <div className="mb-3 ">
          <label htmlFor="" className="form-label">
            {' '}
            Description:
          </label>
          <textarea
            className="form-control"
            name=""
            id=""
            rows="3"
            placeholder="some text"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit{' '}
        </button>
      </form>
    </Layout>
  );
};

export const ErrorPage = () => {
  return (
    <Layout title={'error'}>
      <h1>Oh no, this route doesn&apos;t exist!</h1>
    </Layout>
  );
};

export function Login() {
  /**
   * creating a login form here
   * log in by jwt token
   * log in by github
   */
  return (
    <Layout title="Log In">
      <div className="login-form d-flex flex-column gap-2 justify-content-center  align-items-center ">
        <form
          action="/login"
          className=" w-50 d-flex flex-column border p-lg-3"
        >
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              name=""
              id=""
              placeholder=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              name=""
              id=""
              placeholder=""
            />
          </div>
          <button type="button" className="btn btn-primary  align-self-start">
            Log In
          </button>
        </form>
        <hr />
        <div className="login-links d-flex flex-column gap-3 border w-50">
          <a name="" id="" className="btn btn-primary" href="#" role="button">
            GitHub
          </a>
          <a name="" id="" className="btn btn-primary" href="#" role="button">
            Google
          </a>
        </div>
      </div>
    </Layout>
  );
}
export function SignUp() {
  /**
   * creating a sign up form here
   * sign up by jwt token (storing data to database)
   * sign up by github (no idea yet)
   */
  return (
    <Layout title={'Sign up'}>
      <div className="login-form d-flex flex-column gap-2 justify-content-center  align-items-center ">
        <form
          action="/signUp"
          className=" w-50 d-flex flex-column border p-lg-3"
        >
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              name=""
              id=""
              placeholder=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              name=""
              id=""
              placeholder=""
            />
          </div>
          <button type="button" className="btn btn-primary  align-self-start">
            Sign up
          </button>
        </form>
        <hr />
        <div className="login-links d-flex flex-column gap-3 border w-50">
          <a name="" id="" className="btn btn-primary" href="#" role="button">
            GitHub
          </a>
          <a name="" id="" className="btn btn-primary" href="#" role="button">
            Google
          </a>
        </div>
      </div>
    </Layout>
  );
}

export default App;
