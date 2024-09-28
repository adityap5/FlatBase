import Search from "../components/Search"


const Banner = () => {
  return (
    <div className="w-full text-white text-center mt-8 relative">
        <img 
        className="w-full h-[50vh] md:h-[70vh] object-cover rounded-lg"
        src="https://images.unsplash.com/photo-1421941027568-40ab08ee5592?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="Banner background" />
        <h1 className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl md:text-6xl lg:text-8xl font-bold text-black text-center w-full px-4">
          Find Your Perfect Stay
        </h1>
      <Search css={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-50% md:w-3/4 lg:w-1/2 px-4"}/>
    </div>
  )
}

export default Banner
