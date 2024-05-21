import axios from 'axios';
import React, { FC, useState } from 'react';

// blog component here
type CommentProps = {
  description: string;
  _id: string;
};
type BlogProps = {
  title: string;
  description: string;
  likesCount: number;
  date: Date;
  url: string;
  comments: CommentProps[];
};
export const Blog: FC<BlogProps> = ({
  title,
  description,
  likesCount,
  date,
  url,
  comments,
}) => {
  return (
    <div className=" grid-item d-flex flex-column">
      <h3> {title} </h3>
      <p> {description}</p>
      <ul>
        Comments:
        {comments.map((comment) => {
          return <li key={comment._id}> {comment.description}</li>;
        })}
      </ul>
      <div> like: {likesCount}</div>
      <a href={url}> Go to blog</a>
      <div className=" align-self-end mt-auto"> {`${date}`}</div>
    </div>
  );
};

export const BlogsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" d-flex flex-column justify-content-center align-items-center gap-3">
      {children}
    </div>
  );
};
export const BlogForm = ({
  setIsLoading,
  isFetched,
}: {
  setIsLoading: React.SetStateAction<boolean>;
  isFetched: React.Ref<boolean>;
}) => {
  const token = localStorage.getItem('jwtToken');

  const [inputValues, setInputData] = useState({
    title: '',
    description: '',
    type: '',
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // get inputs data from the form then put it inside axios call
    const { title, description, type } = inputValues;
    const blog = {
      title,
      type,
      description,
      author: 'mock author',
      date: new Date(),
      likes: [],
      comments: [],
    };
    axios
      .post('http://localhost:3000/', blog)
      .then(() => {
        setIsLoading(true);
        isFetched.current = false;
      })
      .catch((err) => {
        console.error(err);
      });
    // re render the page when post
  };
  return (
    <>
      {token ? (
        <form onSubmit={handleSubmit} method="POST">
          Post Blog:
          <div className="input-group mb-3">
            <span className="input-group-text">Title</span>
            <input
              type="text"
              name="title"
              id="title"
              required
              onChange={handleInputChange}
              className="form-control"
              placeholder="placeholder"
              minLength={3}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type:
            </label>
            <input
              type="text"
              className="form-control"
              onChange={handleInputChange}
              name="type"
              id="type"
              aria-describedby="helpId"
              placeholder="sport"
              minLength={3}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Description:
            </label>
            <textarea
              className="form-control"
              name="description"
              onChange={handleInputChange}
              id="description"
              rows={3}
              placeholder="comment here."
              minLength={8}
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
