import { ArrowUpRight, BookOpen, House } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TigerLogo from "./brand/TigerLogo";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="app-footer">
      <div className="footer-main">
        <button type="button" className="footer-brand-button" onClick={() => navigate("/")} aria-label="Tiger QR Studio home">
          <TigerLogo size={30} showText={false} />
          <span>TIGER QR STUDIO</span>
        </button>
        <p>Create, customize and manage QR codes in one workspace.</p>
        <nav className="footer-actions" aria-label="Footer navigation">
          <button type="button" onClick={() => navigate("/")}><House size={14} /><span>Dashboard</span></button>
          <button type="button" onClick={() => navigate("/how-to-use")}><BookOpen size={14} /><span>Help guide</span></button>
          <a href="https://github.com/Bentiger255/tiger-qr-studio" target="_blank" rel="noreferrer"><span className="footer-source-mark" aria-hidden="true">{"</>"}</span><span>Source code</span><ArrowUpRight size={12} /></a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} TIGER QR STUDIO</span>
        <span>Built by Benjamin George Mbega</span>
      </div>
    </footer>
  );
}

export default Footer;