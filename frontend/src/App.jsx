import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FlatDetailPage from './pages/FlatDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LogoutPage from './pages/LogoutPage';
import AddFlatPage from './pages/AddFlatPage';
import SearchResultsPage from './pages/SearchResultsPage';
import BookingPage from './pages/BookingPage';
import MyListings from './pages/MyListings';
import { useEffect } from 'react';
import { Footer } from './components/Footer';
import Error404 from './components/Error404';
import Checkout from './pages/Checkout';
import UpdatePage from './pages/UpdatePage';
import Category from './pages/Category';

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 800);
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
            </Routes>
          </Router>


        }
        <Footer />

      </div>
    </>
  );
};

export default App;
