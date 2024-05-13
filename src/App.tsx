import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.scss';
// how to make fetching an image reusable?
// creating custom hook
const RedButton = styled.button`
  background-color: red;
  margin-left: 50px;
  display: flex;
  justify-content: center;
`;
function useImageUrl() {
  const [imageURL, setImageURL] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/photos',
          {
            mode: 'cors',
          }
        );
        const result = await response.json();
        setImageURL(result[0].url);
      } catch (error) {
        // fetch a default image or display error
        setIsError(true);
        console.log(error);
      } finally {
        // here is how to use finally
        setLoading(false);
      }
    })();
  }, []);
  return { imageURL, loading, isError };
}
const Image = () => {
  const { imageURL, isError, loading } = useImageUrl();

  if (isError) return <p>A network error was encountered</p>;
  if (loading) return <p> Happy loading...</p>;
  return (
    imageURL && (
      <>
        <RedButton className="button" id="button">
          {' '}
          hello
        </RedButton>
        <h1 className="button">An image</h1>

        <img src={imageURL} alt={'placeholder text'} />
      </>
    )
  );
};

export default Image;
