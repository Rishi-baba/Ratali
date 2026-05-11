import bgVideo from "../assets/bg.mp4"
import Navbar from "../components/Navbar"

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Optional Dark Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Navbar */}
      <Navbar />

    </div>
  )
}

export default LandingPage