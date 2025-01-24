import Login from "./pages/Login";
import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvide router={appRouter} />
    </main>
  );
}

export default App;
