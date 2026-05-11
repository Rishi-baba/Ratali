import { Leaf, LogIn, LogOut, Sparkles } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import useAuthStore from "../store/authStore"
import navBg from "../assets/nav.png"

const Navbar = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const navLinks = [
    { name: "TASK", path: "/tasks" },
    { name: "FOCUS", path: "/dashboard" },
    { name: "PANDA", path: "/panda-zone" }
  ]

  const handleAuthAction = () => {
    if (user) {
      logout()
      navigate("/")
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="fixed top-3 left-1/2 z-50  -translate-x-1/2 ">
      <nav 
        style={{
          backgroundImage: `url(${navBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex   items-center gap-10 rounded-full border border-white/10  px-35 py-5 ">
        
        {/* Links */}
        <div className="hidden items-center ml-11 gap-8 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-sm text-[#e7dfb2] transition-all duration-300 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex mr-13 items-center">
          
          <button 
            onClick={handleAuthAction}
            className="flex items-center gap-2 rounded-full border border-[#8e8446]/50 bg-[#3b3817]/80 px-4 py-2 text-sm text-[#f2e8b5] transition-all duration-300 hover:bg-[#4b4720]">
            {user ? (
              <>
                <LogOut size={14} />
                Log Out
              </>
            ) : (
              <>
                <LogIn size={14} />
                Login
              </>
            )}
          </button>

        </div>
      </nav>
    </div>
  )
}

export default Navbar
