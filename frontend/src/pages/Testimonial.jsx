"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Glide from "@glidejs/glide"
import { Quote, Star } from "lucide-react"

const Testimonial = () => {
  const glideRef = useRef(null)

  useEffect(() => {
    if (glideRef.current) {
      const glide = new Glide(".glide", {
        type: "carousel",
        perView: 3,
        gap: 30,
        autoplay: 2000,
        breakpoints: {
          1024: {
            perView: 2,
          },
          640: {
            perView: 1,
          },
        },
      })

      glide.mount()

      return () => {
        glide.destroy()
      }
    }
  }, [])

  const testimonials = [
    {
      name: "Janet",
      image:
        "https://images.unsplash.com/photo-1654944989990-9da8fa364ca1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "The stay was absolutely fantastic! The amenities were top-notch and the staff was incredibly friendly. I'll definitely be coming back!",
    },
    {
      name: "Jane Smith",
      image:
        "https://images.unsplash.com/photo-1690544252334-ff1765e6d212?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "I was blown away by the beautiful views and the comfort of my room. It felt like a home away from home. Highly recommended!",
    },
    {
      name: "Mike Johnson",
      image:
        "https://images.unsplash.com/photo-1719464791083-65240362d001?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "The location was perfect, and the service was impeccable. I couldn't have asked for a better experience. Will definitely return!",
    },
    {
      name: "Sara Johnson",
      image:
        "https://images.unsplash.com/photo-1654512504066-e5af36ceaa27?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "The location was perfect, and the service was impeccable. I couldn't have asked for a better experience. Will definitely return!",
    },
    {
      name: "Chloe James",
      image:
        "https://images.unsplash.com/photo-1650612546797-4b8cf3625a11?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "The location was perfect, and the service was impeccable. I couldn't have asked for a better experience. Will definitely return!",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16  rounded-2xl my-12"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">What Our Guests Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why our guests love staying with us and what makes our accommodations special
          </p>
        </motion.div>

        <div className="glide" ref={glideRef}>
          <div data-glide-el="track" className="glide__track">
            <ul className="glide__slides">
              {testimonials.map((testimonial, index) => (
                <li key={index} className="glide__slide">
                  <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col">
                    <div className="mb-4 text-[#76ABAE]">
                      <Quote size={32} />
                    </div>

                    <p className="text-gray-700 italic mb-6 flex-grow">"{testimonial.text}"</p>

                    <div className="flex items-center">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <div className="flex text-yellow-400 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="glide__bullets  flex justify-center" data-glide-el="controls[nav]">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className="glide__bullet w-3 h-3 bg-gray-300 rounded-full mx-1 focus:outline-none"
                data-glide-dir={`=${index}`}
              ></button>
            ))}
          </div> */}
        </div>
      </div>
    </motion.div>
  )
}

export default Testimonial
