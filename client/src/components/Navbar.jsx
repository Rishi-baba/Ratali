import { Leaf, LogIn, Sparkles } from "lucide-react"
import navBg from "../assets/nav.png"

const Navbar = () => {
  return (
    <div className="fixed top-3 left-1/2 z-50  -translate-x-1/2 ">
      <nav 
        style={{
          backgroundImage: `url(${navBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex   items-center gap-10 rounded-full border border-white/10  px-35 py-5 ">
        
        {/* Logo */}
        {/* <div className="flex items-center gap-1.3 text-[#f6f2d8]">
          <Leaf size={16} className="text-[#d6c36f]" />
          <span className="text-sm font-semibold tracking-wide">
            RATALI
          </span>
        </div> */}

        {/* Links */}
        <div className="hidden items-center ml-11 gap-8 md:flex">
          {["TASK", "DASHBOARD", "PANDA" ].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-[#e7dfb2] transition-all duration-300 hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex mr-13 items-center">
          
          <button className="flex items-center gap-2 rounded-full border border-[#8e8446]/50 bg-[#3b3817]/80 px-4 py-2 text-sm text-[#f2e8b5] transition-all duration-300 hover:bg-[#4b4720]">
            <LogIn size={14} />
            Login
          </button>

        </div>
      </nav>
    </div>
  )
}

export default Navbar

