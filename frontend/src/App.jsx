"use client"

import { useState, useEffect, Suspense, lazy } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import NavScrollTop from "./components/NavScrollTop"
import Navbar from "./components/Navbar"
import PageTransition from "./components/PageTransition"
import LoadingScreen from "./components/LoadingScreen"
import Error404 from "./components/Error404"
import { Footer } from "./components/Footer"

const HomePage = lazy(() => import("./pages/HomePage"))
const FlatDetailPage = lazy(() => import("./pages/FlatDetailPage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const LogoutPage = lazy(() => import("./pages/LogoutPage"))
const AddFlatPage = lazy(() => import("./pages/AddFlatPage"))
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage"))
const BookingPage = lazy(() => import("./pages/BookingPage"))
const MyListings = lazy(() => import("./pages/MyListings"))
const Checkout = lazy(() => import("./pages/Checkout"))
const UpdatePage = lazy(() => import("./pages/UpdatePage"))
const Category = lazy(() => import("./pages/Category"))
const Success = lazy(() => import("./components/Success"))

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-white">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
      </div>

      <div className="container px-8 mx-auto">
        {loading ? (
          <LoadingScreen />
        ) : (
          <Router>
            <NavScrollTop>
              <Suspense fallback={<LoadingScreen minimal />}>
                <Navbar />
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <PageTransition>
                          <HomePage />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/flat/:id"
                      element={
                        <PageTransition>
                          <FlatDetailPage />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/login"
                      element={
                        <PageTransition>
                          <LoginPage />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/register"
                      element={
                        <PageTransition>
                          <RegisterPage />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/add-flat"
                      element={
                        <PageTransition>
                          <AddFlatPage />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/search"
                      element={
                        <PageTransition>
                          <SearchResultsPage />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/logout"
                      element={
                        <PageTransition>
                          <LogoutPage />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/bookings"
                      element={
                        <PageTransition>
                          <BookingPage />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/mylistings"
                      element={
                        <PageTransition>
                          <MyListings />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/checkout/:id"
                      element={
                        <PageTransition>
                          <Checkout />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/updatePage/:id"
                      element={
                        <PageTransition>
                          <UpdatePage />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/category"
                      element={
                        <PageTransition>
                          <Category />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/*"
                      element={
                        <PageTransition>
                          <Error404 />
                        </PageTransition>
                      }
                    />
                    <Route
                      path="/success"
                      element={
                        <PageTransition>
                          <Success />
                        </PageTransition>
                      }
                    />
                  </Routes>
                </AnimatePresence>
                <Footer />
              </Suspense>
            </NavScrollTop>
          </Router>
        )}
      </div>
    </>
  )
}

export default App
