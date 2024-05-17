import { useEffect, useRef, useState } from 'react';
import Layout from './layout';
import axios from 'axios';
import './index.scss';
import { useParams } from 'react-router-dom';
import { Blog, BlogsContainer, BlogForm } from './blog';
import { log } from 'console';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const isFetched = useRef();

  useEffect(() => {
    if (isFetched.current) return;
    (async () => {
      try {
        const response = await axios.get('http://localhost:3000/blogs');
        if (response) setBlogs(response.data.blogs);
      } catch (error) {
        console.log(error);
        setErrors(errors);
      } finally {
        setIsLoading(false);
        isFetched.current = true;
      }
    })();
  }, [isLoading]);

  return (
    <Layout title={'Blog App'}>
      <BlogsContainer>
        {!isLoading ? (
          blogs.map((blog) => {
            return (
              <Blog
                key={blog._id}
                description={blog.description}
                title={blog.title}
                date={blog.date}
                likesCount={blog.likes.length}
                url={'/blogs/' + blog._id}
                comments={blog.comments}
              >
                {' '}
              </Blog>
            );
          })
        ) : (
          <p>loading...</p>
        )}
      </BlogsContainer>
      <BlogForm setIsLoading={setIsLoading} isFetched={isFetched} />
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

export function LoginForm() {
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
export function SignUpForm() {
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
export const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValues, setInputValues] = useState({ description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      description: inputValues.description,
    };
    axios
      .post(`http://localhost:3000/blogs/${id}`, comment)
      .then(() => {
        setIsLoading(true);
      })
      .catch((err) => {
        console.error(err);
      });
    // re render the page when post
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blogs/${id}`);
        const blog = response.data;

        setBlog(blog);
      } catch (error) {
        console.log(error);
        setErrors(errors);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isLoading]);

  return (
    <>
      {' '}
      {!isLoading ? (
        <Layout title={blog.title}>
          <h2> Author: {blog.author}</h2>
          <h4> {blog.description}</h4>
          <hr />
          <p>Comment:</p>
          {blog.comments.map((comment) => {
            console.log(comment);
            return <li key={comment._id}> {comment.description}</li>;
          })}
          <hr />

          <form onSubmit={handleSubmit} method="POST">
            <p>Post your comment:</p>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Description:
              </label>
              <textarea
                className="form-control"
                name="description"
                id=""
                rows="3"
                onChange={handleInputChange}
                minLength={8}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </form>
        </Layout>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default App;
