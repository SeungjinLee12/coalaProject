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
import InstructorList from "./pages/InstructorList";
import InstructorInfo from "./pages/InstructorInfo";
import QNAAllList from "./pages/QNAAllList";
import WriteQNA from "./pages/WriteQNA";
import QNA from "./pages/QNA";
import ModifyReview from "./pages/ModifyReview";
import BuyLecture from "./pages/buyLecture";
import BuyLecture2 from "./pages/buyLecture2";
import Lecture_watch from "./pages/Lecture_watch";
import RegisterKakao from "./pages/Register_kakao";
import ManageInstructor from "./pages/management/manageInstructor";
import ManageLecture from "./pages/management/manageLecture";
import ManageHome from "./pages/management/manageHome";

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
        path: "/management/addInstructor",
        element: <ManageInstructor />,
      },
      {
        path: "/management/addLecture",
        element: <ManageLecture />,
      },
      {
        path: "/management/manage",
        element: <ManageHome />,
      },
      {
        path: "/instructorInfo/:insNo",
        element: <InstructorInfo />,
      },
      {
        path: "/lecture/modifyReview",
        element: <ModifyReview />,
      },
      {
        path: "/registerKakao",
        element: <RegisterKakao />,
      },

      {
        path: "/lecture/writeReview",
        element: <WriteReview />,
      },
      {
        path: "/api/buyLecture",
        element: <BuyLecture />,
      },
      {
        path: "/api/buyLecture2",
        element: <BuyLecture2 />,
      },

      {
        path: "/lecture/writeQNA",
        element: <WriteQNA />,
      },

      {
        path: "/lecture/:lectureNo",
        element: <LectureInfo />,
      },
      {
        path: "/instructorList",
        element: <InstructorList />,
      },
      {
        path: "/lecture/title/:title",
        element: <LectureInfo2 />,
      },
      {
        path: "/api/",
        element: <Home />,
      },
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
        path: "/QNAAllList",
        element: <QNAAllList />,
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
