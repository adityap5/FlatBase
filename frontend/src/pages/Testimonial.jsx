import React, { useEffect } from 'react';
import Glide from '@glidejs/glide';

const Testimonial = () => {
  useEffect(() => {
    const glide = new Glide('.glide', {
      type: 'carousel',
      perView: 3,
      autoplay: 2000
    });
    glide.mount();

    return () => {
      glide.destroy();
    };
  }, []);

  return (
    <div className="w-full text-center mt-8 relative">
      <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4 text-start">Testimonials</h1>
      <div className="glide">
  <div data-glide-el="track" className="glide__track">
    <ul className="glide__slides">
      <li className="glide__slide">
        <div className="flex flex-col items-center p-4">
          <img src="https://images.unsplash.com/photo-1654944989990-9da8fa364ca1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Happy guest" className="w-96 h-64 object-cover mb-4 rounded-lg" />
          <div className="text-center">
            <p className="text-lg font-semibold">John Doe</p>
            <p className="text-sm italic mt-2">&ldquo;The stay was absolutely fantastic! The amenities were top-notch and the staff was incredibly friendly. I&apos;ll definitely be coming back!&rdquo;</p>
          </div>
        </div>
      </li>
      <li className="glide__slide">
        <div className="flex flex-col items-center p-4">
          <img src="https://images.unsplash.com/photo-1690544252334-ff1765e6d212?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Satisfied customer" className="w-96 h-64 object-cover mb-4 rounded-lg" />
          <div className="text-center">
            <p className="text-lg font-semibold">Jane Smith</p>
            <p className="text-sm italic mt-2">&ldquo;I was blown away by the beautiful views and the comfort of my room. It felt like a home away from home. Highly recommended!&rdquo;</p>
          </div>
        </div>
      </li>
      <li className="glide__slide">
        <div className="flex flex-col items-center p-4">
          <img src="https://images.unsplash.com/photo-1719464791083-65240362d001?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Delighted guest" className="w-96 h-64 object-cover mb-4 rounded-lg" />
          <div className="text-center">
            <p className="text-lg font-semibold">Mike Johnson</p>
            <p className="text-sm italic mt-2">&ldquo;The location was perfect, and the service was impeccable. I couldn&apos;t have asked for a better experience. Will definitely return!&rdquo;</p>
          </div>
        </div>
      </li>
      <li className="glide__slide">
        <div className="flex flex-col items-center p-4">
          <img src="https://images.unsplash.com/photo-1654512504066-e5af36ceaa27?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Delighted guest" className="w-96 h-64 object-cover mb-4 rounded-lg" />
          <div className="text-center">
            <p className="text-lg font-semibold">Mike Johnson</p>
            <p className="text-sm italic mt-2">&ldquo;The location was perfect, and the service was impeccable. I couldn&apos;t have asked for a better experience. Will definitely return!&rdquo;</p>
          </div>
        </div>
      </li>
      <li className="glide__slide">
        <div className="flex flex-col items-center p-4">
          <img src="https://images.unsplash.com/photo-1650612546797-4b8cf3625a11?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Delighted guest" className="w-96 h-64 object-cover mb-4 rounded-lg" />
          <div className="text-center">
            <p className="text-lg font-semibold">Mike Johnson</p>
            <p className="text-sm italic mt-2">&ldquo;The location was perfect, and the service was impeccable. I couldn&apos;t have asked for a better experience. Will definitely return!&rdquo;</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>

    </div>
    </div>
  )
}

export default Testimonial
