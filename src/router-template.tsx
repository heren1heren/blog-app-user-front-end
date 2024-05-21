import { useEffect, useRef, useState } from 'react';
import Layout from './layout';
import axios from 'axios';
import './index.scss';
import { useParams } from 'react-router-dom';
import { Blog, BlogsContainer, BlogForm } from './blog';
import { useNavigate } from 'react-router-dom';
type commentType = {
  _id: string;
  description: string;
};
type blogType = {
  _id: string;
  title: string;
  date: Date;
  likes: object[];
  url: string;
  description: string;
  comments: object[];
  author: string;
};
const App = () => {
  //todo: token authentication to display post blog or not

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
          blogs.map((blog: blogType) => {
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
      I am a cookie turtle, this is a blog app that you can post and comment
      after log in
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

  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [errors, setErrors] = useState();
  const [inputValues, setInputValues] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/login`, {
        username: inputValues.username,
        password: inputValues.password,
      })
      .then((res) => {
        if (res.data.message === 'successful') {
          navigate('/');
        }
        // console.log(res.data.token);
        const token = res.data.token;
        localStorage.setItem('jwtToken', 'Bearer ' + token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.message) setMessage(err.response.data.message);
        if (err.response.data.errors) setErrors(err.response.data.errors);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <Layout title="Log In">
      <div className="login-form d-flex flex-column gap-2 justify-content-center  align-items-center ">
        <form
          onSubmit={handleSubmit}
          className=" w-50 d-flex flex-column border p-lg-3"
        >
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Username:
            </label>
            <input
              required
              minLength={3}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              name="username"
              id="username"
              placeholder=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Password:
            </label>
            <input
              required
              minLength={8}
              onChange={handleInputChange}
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder=""
            />
          </div>
          <button type="submit" className="btn btn-primary  align-self-start">
            Log In
          </button>
        </form>{' '}
        {message ? <div>{message}</div> : <></>}
        {errors ? (
          errors.forEach((error) => {
            <li> {error}</li>;
          })
        ) : (
          <></>
        )}
        <hr />
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
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [errors, setErrors] = useState();
  const [inputValues, setInputValues] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/signUp`, {
        username: inputValues.username,
        password: inputValues.password,
      })
      .then((res) => {
        if (res.data.message === 'successful') {
          navigate('/login');
        }

        if (res.data.message) setMessage(res.data.message);
        if (res.data.errors) setErrors(res.data.errors);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <Layout title={'Sign up'}>
      <div className="login-form d-flex flex-column gap-2 justify-content-center  align-items-center ">
        <form
          onSubmit={handleSubmit}
          method="POST"
          className=" w-50 d-flex flex-column border p-lg-3"
        >
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Username:
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              className="form-control"
              required
              minLength={3}
              name="username"
              id=""
              placeholder=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Password:
            </label>
            <input
              required
              minLength={8}
              onChange={handleInputChange}
              type="password"
              className="form-control"
              name="password"
              id=""
              placeholder=""
            />
          </div>

          <button type="submit" className="btn btn-primary  align-self-start">
            Sign up
          </button>
        </form>
        {message ? <div>{message}</div> : <></>}
        {errors ? (
          errors.forEach((error) => {
            <li> {error}</li>;
          })
        ) : (
          <></>
        )}
        <hr />
      </div>
    </Layout>
  );
}

export const BlogDetail = () => {
  //todo: token authentication to display post comment or not
  // if token -> post comment form
  // else -> <p>  log in to post comment</p>
  const token = localStorage.getItem('jwtToken');
  const { id } = useParams();
  const [blog, setBlog] = useState<blogType>();
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValues, setInputValues] = useState({ description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      description: inputValues.description,
    };
    axios
      .post(`http://localhost:3000/blogs/${id}`, comment, {
        headers: { Authorization: token },
      })
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
      {!isLoading && blog ? (
        <Layout title={blog.title}>
          <h2> Author: {blog.author}</h2>
          <h4> {blog.description}</h4>
          <hr />
          <p>Comment:</p>
          {blog.comments.map((comment: commentType) => {
            // console.log(comment);
            return <li key={comment._id}> {comment.description}</li>;
          })}
          <hr />

          {token ? (
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
                  rows={3}
                  onChange={handleInputChange}
                  minLength={8}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </form>
          ) : (
            <p> login to post comment</p>
          )}
        </Layout>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default App;
