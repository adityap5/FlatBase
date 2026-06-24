import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Glide from "@glidejs/glide"
// Import Glide CSS via Vite's module system — replaces the broken node_modules HTML links
import "@glidejs/glide/dist/css/glide.core.min.css"
import "@glidejs/glide/dist/css/glide.theme.min.css"
import { Quote, Star } from "lucide-react"

const Testimonial = () => {
  const glideRef = useRef(null)

  useEffect(() => {
    if (glideRef.current) {
      const glide = new Glide(".glide", {
        type: "carousel",
        perView: 3,
        gap: 30,
        autoplay: 2500,
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
      name: "Sara Johnson",
      image:
        "https://images.unsplash.com/photo-1654512504066-e5af36ceaa27?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "The location was perfect, and the service was impeccable. I couldn't have asked for a better experience. Will definitely return!",
    },
    {
      name: "Chloe James",
      image:
        "https://images.unsplash.com/photo-1650612546797-4b8cf3625a11?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Modern amenities and stunning views. The frosted glass aesthetic of the platform translates perfectly to their property selection.",
    },
    {
      name: "Janet Smith",
      image:
        "https://images.unsplash.com/photo-1654944989990-9da8fa364ca1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "The stay was absolutely fantastic! The amenities were top-notch and the staff was incredibly friendly. I'll definitely be back!",
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-24 relative overflow-hidden w-full"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop text-center relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-body text-xs text-primary font-bold tracking-[0.2em] block mb-3 uppercase">GUEST STORIES</span>
          <h2 className="font-display text-4xl md:text-5xl text-on-background mb-4">What Our Guests Say</h2>
          <p className="font-body text-on-surface-variant max-w-2xl mx-auto opacity-70">
            Discover why luxury travelers choose FlatBase for their curated stays.
          </p>
        </motion.div>

        <div className="glide" ref={glideRef}>
          <div data-glide-el="track" className="glide__track overflow-visible">
            <ul className="glide__slides">
              {testimonials.map((testimonial, index) => (
                <li key={index} className="glide__slide h-auto">
                  <motion.div 
                    whileHover={{ y: -5 }} 
                    className="motionsite-card p-8 rounded-3xl h-full flex flex-col text-left transition-all duration-300 relative group"
                  >
                    <div className="mb-6 text-primary opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                      <Quote size={40} />
                    </div>

                    <p className="text-on-surface font-body text-base italic mb-8 flex-grow leading-relaxed opacity-95">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-glass-border/40">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-glass-border shadow-md"
                      />
                      <div>
                        <p className="font-display font-semibold text-on-background">{testimonial.name}</p>
                        <div className="flex gap-0.5 text-secondary mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" className="stroke-none" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Testimonial
