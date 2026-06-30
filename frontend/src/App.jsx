
import { useEffect, useMemo, Suspense, lazy, memo } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import ReactGA from "react-ga4"
import NavScrollTop from "./components/NavScrollTop"
import Navbar from "./components/Navbar"
import PageTransition from "./components/PageTransition"
import LoadingScreen from "./components/LoadingScreen"
import Error404 from "./components/Error404"
import { Footer } from "./components/Footer"

// lazy imports...
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
const SellerDashboard = lazy(() => import("./pages/SellerDashboard"))
const SellerProfilePage = lazy(() => import("./pages/SellerProfilePage"))
const SellerAnalytics = lazy(() => import("./pages/SellerAnalytics"))
const SellerLayout = lazy(() => import("./components/SellerLayout"))

// ── Background blobs are static — memoize so they never re-render ──────────
const BackgroundBlobs = memo(function BackgroundBlobs() {
  return (
    <div className="fixed top-0 -z-10 h-full w-full bg-background overflow-hidden" aria-hidden="true">
      {/* Glowing Blobs */}
      <div className="glowing-blob w-[500px] h-[500px] bg-primary/10 top-[-10%] right-[5%]" />
      <div className="glowing-blob w-[600px] h-[600px] bg-secondary/5 top-[30%] left-[-10%]" style={{ animationDelay: '-5s' }} />
      <div className="glowing-blob w-[400px] h-[400px] bg-accent/10 bottom-[10%] right-[10%]" style={{ animationDelay: '-10s' }} />

      {/* Subtle grid lines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
  )
})

const AnalyticsTracker = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search })
  }, [location])

  return null
}

const MainLayout = ({ children }) => {
  const location = useLocation()
  const isSellerRoute = useMemo(
    () =>
      location.pathname.startsWith("/seller") ||
      location.pathname.startsWith("/mylistings") ||
      location.pathname.startsWith("/add-flat") ||
      location.pathname.startsWith("/updatePage"),
    [location.pathname]
  )

  return (
    <>
      {!isSellerRoute && <Navbar />}
      {children}
      {!isSellerRoute && <Footer />}
    </>
  )
}

const App = () => {
  useEffect(() => {
    // Defer GA initialisation until the browser is idle to reduce TBT
    const init = () => ReactGA.initialize("G-34YS1ZRZTT")

    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(init, { timeout: 3000 })
    } else {
      // Fallback for Safari which doesn't support requestIdleCallback
      setTimeout(init, 1000)
    }
  }, [])

  return (
    <>
      <BackgroundBlobs />

      <div className="min-h-screen w-full flex flex-col font-body bg-background text-on-background">
        <Router>
          <AnalyticsTracker />
          <NavScrollTop>
            <Suspense fallback={<LoadingScreen minimal />}>
              <MainLayout>
                {/*
                  mode="sync" — outgoing and incoming pages animate simultaneously,
                  which is faster and avoids the 300ms wait that "wait" mode adds.
                */}
                <AnimatePresence mode="sync">
                  <Routes>
                    <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                    <Route path="/flat/:id" element={<PageTransition><FlatDetailPage /></PageTransition>} />
                    <Route path="/search" element={<PageTransition><SearchResultsPage /></PageTransition>} />
                    <Route path="/category" element={<PageTransition><Category /></PageTransition>} />
                    <Route path="/success" element={<PageTransition><Success /></PageTransition>} />
                    <Route path="/logout" element={<PageTransition><LogoutPage /></PageTransition>} />
                    <Route path="/bookings" element={<PageTransition><BookingPage /></PageTransition>} />
                    <Route path="/checkout/:id" element={<PageTransition><Checkout /></PageTransition>} />
                    <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
                    <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
                    <Route element={<SellerLayout />}>
                      <Route path="/seller/dashboard" element={<SellerDashboard />} />
                      <Route path="/seller/profile" element={<SellerProfilePage />} />
                      <Route path="/seller/analytics" element={<SellerAnalytics />} />
                      <Route path="/mylistings" element={<MyListings />} />
                      <Route path="/add-flat" element={<AddFlatPage />} />
                      <Route path="/updatePage/:id" element={<UpdatePage />} />
                    </Route>
                    <Route path="/*" element={<PageTransition><Error404 /></PageTransition>} />
                  </Routes>
                </AnimatePresence>
              </MainLayout>
            </Suspense>
          </NavScrollTop>
        </Router>
      </div>
    </>
  )
}

export default App
