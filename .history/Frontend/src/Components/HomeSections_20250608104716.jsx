export const HeroBanner = ({ heroBanner }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 0,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setCurrentSlide(0);
    },
    mode: "snap",
    drag: true,
    renderMode: "performance",
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 1, spacing: 0 },
      },
    },
  });

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
      <div ref={sliderRef} className="keen-slider h-full w-full">
        {heroBanner.images && heroBanner.images.length > 0 ? 
          heroBanner.images.map((image, index) => (
            <div 
              key={index} 
              className="keen-slider__slide h-full w-full"
            >
              <div 
                className="w-full h-full bg-cover bg-center transition-opacity duration-1000"
                style={{ 
                  backgroundImage: `url(${image})`, 
                  filter: 'brightness(0.7)',
                  opacity: index === currentSlide ? 1 : 0
                }}
              />
            </div>
          )) : (
            <div className="keen-slider__slide h-full w-full">
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url('https://source.unsplash.com/random/1920x1080?news')`, 
                  filter: 'brightness(0.7)' 
                }} 
              />
            </div>
          )
        }
      </div>
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-white"
        >
          {heroBanner.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white"
        >
          {heroBanner.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            {heroBanner.button1Text}
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
            {heroBanner.button2Text}
          </button>
        </motion.div>
      </div>
    </section>
  );
};