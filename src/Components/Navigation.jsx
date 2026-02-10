export default function Navigation() {
    // Dispatch custom event to unlock scroll when navigation is clicked
    const handleNavClick = () => {
        window.dispatchEvent(new CustomEvent('unlock-scroll'))
    }

    return (
        <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 pointer-events-none">
          <div className="text-white text-4xl font-bold pointer-events-auto">
            CZT
          </div>
          <div className="flex flex-col text-right font-secondary pointer-events-auto">
            <a href="#home" className="text-white" onClick={handleNavClick}>• Home</a>
            <a href="#about" className="text-white" onClick={handleNavClick}>About</a>
            <a href="#work" className="text-white" onClick={handleNavClick}>Work</a>
            <a href="#contact" className="text-white" onClick={handleNavClick}>Contact</a>
          </div>
        </nav>
    )
}