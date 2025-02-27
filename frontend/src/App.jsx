import { useState,useEffect ,Suspense, lazy} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavScrollTop from './components/NavScrollTop';
import Navbar from './components/Navbar';
const HomePage = lazy(() => import("./pages/HomePage"));
const FlatDetailPage = lazy(() => import("./pages/FlatDetailPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LogoutPage = lazy(() => import("./pages/LogoutPage"));
const AddFlatPage = lazy(() => import("./pages/AddFlatPage"));
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const MyListings = lazy(() => import("./pages/MyListings"));
const Checkout = lazy(() => import("./pages/Checkout"));
const UpdatePage = lazy(() => import("./pages/UpdatePage"));
const Category = lazy(() => import("./pages/Category"));
import Error404 from "./components/Error404";
import {Footer} from "./components/Footer";
const Success = lazy(() => import("./components/Success"))
const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  return (
    <>
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-white">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div></div>
      </div>
      <div className="container px-8">

        {loading ? <div className="h-screen flex justify-center items-center">
          <h1>DISCOVER BOOK LIVE</h1></div> :
          <Router>
             <NavScrollTop>
            <Suspense fallback={<div />}>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/flat/:id" element={<FlatDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/add-flat" element={<AddFlatPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/bookings" element={<BookingPage />} />
              <Route path="/mylistings" element={<MyListings />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/updatePage/:id" element={<UpdatePage />} />
              <Route path="/category" element={<Category />} />
              <Route path="/*" component={<Error404 />} />
              <Route path="/success" element={<Success />} />
            </Routes>
            <Footer />
            </Suspense>
            </NavScrollTop>
          </Router>


        }
     

      </div>
    </>
  );
};

export default App;
