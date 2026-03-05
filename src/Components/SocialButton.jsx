export default function SocialButton({ href, iconPath, label, className }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer" 
      className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full transition-all duration-300 text-xl font-bold font-secondary group hover:-translate-y-1 ${className || ''}`}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-7 h-7 group-hover:scale-110 transition-transform"
      >
        <path d={iconPath} />
      </svg>
      {label}
    </a>
  );
}
