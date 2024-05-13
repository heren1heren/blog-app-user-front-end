import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
export const Popeye = () => {
  return (
    <>
      <p>Hi, I am Popeye! I love to eat Spinach!</p>
      <Link to="/">Click here to go back</Link>
    </>
  );
};
export const Spinach = () => {
  return (
    <>
      <p>Hi, I am Spinach! Popeye loves to eat me!</p>
      <Link to="/">Click here to go back</Link>
    </>
  );
};
const App = () => {
  return (
    <div>
      <h1>Hello from the main page of the app!</h1>
      <p>Here are some examples of links to other pages</p>
      <nav>
        <ul>
          <li>
            <Link to="profile">Profile page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export const DefaultProfile = () => {
  return <p>Oh, nothing to see here!</p>;
};
export const ErrorPage = () => {
  return (
    <div>
      <h1>Oh no, this route doesn&apos;t exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};
export const DefaultProfilePage = () => {
  return (
    <div>
      <h1>Hello from profile page!</h1>
      <p>So, how are you?</p>
      <hr />
      <h2>The profile visited is here:</h2>
      {/* <Outlet /> */}

      <DefaultProfile />
    </div>
  );
};
export const Profile = () => {
  const { name } = useParams();
  console.log(name);
  return (
    <div>
      <h1>Hello from profile page!</h1>
      <p>So, how are you?</p>
      <hr />
      <h2>The profile visited is here:</h2>
      {/* <Outlet /> */}
      {name === 'popeye' ? (
        <Popeye />
      ) : name === 'spinach' ? (
        <Spinach />
      ) : (
        <DefaultProfile />
      )}

      <div>
        {' '}
        navigation:
        <div>
          <Link to="http://localhost:5173/profile/spinach">
            go to spinach page
          </Link>
        </div>
        <div>
          <Link to="http://localhost:5173/profile/popeye">
            go to popeye page
          </Link>
        </div>
      </div>
    </div>
  );
};
export function HomePage() {
  return <div> I am nothingness</div>;
}

export default App;
