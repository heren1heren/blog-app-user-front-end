import App, {
  About,
  ErrorPage,
  LoginForm,
  SignUpForm,
  BlogDetail,
} from './router-template';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },

  {
    path: '/signUp',
    element: <SignUpForm />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    // dynamic routes?
    path: '/blogs/:id',
    element: <BlogDetail />,
  },
];
export default routes;
