export default function Navigation() {
    return (
        <nav className="absolute top-0 left-0 right-0 px-8 py-6 flex justify-between items-center z-10 pointer-events-none">
          <div className="text-white text-2xl font-bold pointer-events-auto">
            Your Logo
          </div>
          <div className="flex gap-8 pointer-events-auto">
            <a href="#about" className="text-white no-underline hover:text-gray-300 transition-colors">About</a>
            <a href="#work" className="text-white no-underline hover:text-gray-300 transition-colors">Work</a>
            <a href="#contact" className="text-white no-underline hover:text-gray-300 transition-colors">Contact</a>
          </div>
        </nav>
    )
}