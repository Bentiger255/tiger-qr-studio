import { Mail, Globe } from "lucide-react";

import { useNavigate } from "react-router-dom";
import TigerLogo from "./brand/TigerLogo";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="app-footer">
      <div className="footer-main">
        <button
          type="button"
          className="footer-brand-button"
          onClick={() => navigate("/")}
        >
          <TigerLogo
            size={28}
            showText={false}
          />

          <span>
            TIGER QR STUDIO
          </span>
        </button>

        <p>
          One scan. Endless possibilities.
        </p>

        <div className="footer-actions">
          <a
            href="mailto:"
            aria-label="Email"
            title="Email"
          >
            <Mail size={15} />
          </a>

          <a
            href="https://benjamin.kesug.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Portfolio"
            title="Portfolio"
          >
            <Globe size={15} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} TIGER QR STUDIO
        </span>

        <span>
          Built by Benjamin George Mbega
        </span>
      </div>
    </footer>
  );
}

export default Footer;