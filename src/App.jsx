import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import Home from './pages/Home'
// import SignUp from './pages/Signup'
// import LogIn from './pages/Login'
// import CreatePost from './pages/CreatePost'
// import Profile from './pages/Profile'
// import Navbar from './components/Navbar'
// import PageNotFound from './pages/PageNotFound'
// import EditPost from './pages/editPost'
import { useAuth } from "./context/Authcontext";
import LoadingPage from "./components/LoadingPage";

const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/Signup"));
const LogIn = lazy(() => import("./pages/Login"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const Profile = lazy(() => import("./pages/Profile"));
const Navbar = lazy(() => import("./components/Navbar"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const EditPost = lazy(() => import("./pages/editPost"));

function App() {
  const { user } = useAuth();

  let routes;

  if (!user) {
    routes = (
      <>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LogIn />} />
        </Routes>
      </>
    );
  } else {
    routes = (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Suspense fallback={<LoadingPage/>}>
        {routes}
      </Suspense>
    </>
  );
}

export default App;
