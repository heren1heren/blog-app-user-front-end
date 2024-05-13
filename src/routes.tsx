import App, { Profile, ErrorPage, HomePage } from './router-template';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'profile/:name',
    element: <Profile />,
  },
  {
    path: 'profile/',
    element: <Profile />,
  },
  {
    path: 'homePage', // new element
    element: <HomePage />,
  },
];
export default routes;
