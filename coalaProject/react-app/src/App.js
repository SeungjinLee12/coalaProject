import "./style.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
// import Home2 from "./pages/Home2";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Register_interest from "./pages/Register_interest";
import ModifyUserCheck from "./pages/Modify_checkUser";
import ModifyInfo from "./pages/Modify_Information";
import ModifyPayment from "./pages/Modify_Payment";
import ModifyInterest from "./pages/Modify_Interest";
import ModifyPassword from "./pages/Modify_Password";
import LectureInfo from "./pages/lectureInfo";
import LectureInfo2 from "./pages/lectureInfo2";
import WriteReview from "./pages/WriteReview";
import QNAList from "./pages/QNAList";
import WriteQNA from "./pages/WriteQNA";
import QNA from "./pages/QNA";

import Lecture_watch from "./pages/Lecture_watch";

import Navbar from "./components/Navbar2";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/lecture/writeReview",
        element: <WriteReview />,
      },
      {
        path: "/lecture/writeQNA",
        element: <WriteQNA />,
      },

      {
        path: "/lecture",
        element: <LectureInfo />,
      },
      {
        path: "/lecture2",
        element: <LectureInfo2 />,
      },
      {
        path: "/api/",
        element: <Home />,
      },
      // {
      //   path: "/api/2",
      //   element: <Home2 />,
      // },
      {
        path: "/modifyUser/userCheck",
        element: <ModifyUserCheck />,
      },
      {
        path: "/modifyUser/information",
        element: <ModifyInfo />,
      },
      {
        path: "/modifyUser/payment",
        element: <ModifyPayment />,
      },
      {
        path: "/modifyUser/interest",
        element: <ModifyInterest />,
      },
      {
        path: "/modifyUser/password",
        element: <ModifyPassword />,
      },
      {
        path: "/api/search",
        element: <Search />,
      },
      {
        path: "/modifyUser/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/Register_interest",
        element: <Register_interest />,
      },
      {
        path: "/lecture/QNAList",
        element: <QNAList />,
      },
      {
        path: "/lecture/QNA",
        element: <QNA />,
      },
    ],
  },
  {
    path: "/lecture/watch",
    element: <Lecture_watch />,
  },
]);
function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
