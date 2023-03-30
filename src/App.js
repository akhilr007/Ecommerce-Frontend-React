import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import store from "./store";
import Checkout from "./pages/Checkout";
import AuthProvider, { useAuth } from "./firebase/Auth";
import Registration from "./pages/Registration";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [],
      },
      {
        path: "cart",
        element: <Cart />,
        children: [],
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
        children: [],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    children: [],
  },
  {
    path: "/register",
    element: <Registration />,
    children: [],
  },
]);

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router}> </RouterProvider>
      </Provider>
    </AuthProvider>
  );
}

export default App;
