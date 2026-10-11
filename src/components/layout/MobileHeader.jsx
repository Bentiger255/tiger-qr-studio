import {
  HelpCircle,
  Menu,
  Search,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import TigerLogo from "../brand/TigerLogo";

function MobileHeader({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar-logo-button"
        onClick={() => navigate("/")}
        aria-label="Go to dashboard"
      >
        <TigerLogo size={34} />
      </button>

      <div className="topbar-actions">
        <button
          type="button"
          className="topbar-icon-button"
          title="Search"
          aria-label="Search saved QR codes"
          onClick={() => navigate("/my-qr-codes")}
        >
          <Search size={18} />
        </button>

        <button
          type="button"
          className="topbar-icon-button"
          title="Help"
          aria-label="Help"
          onClick={() => navigate("/how-to-use")}
        >
          <HelpCircle size={18} />
        </button>

        <button
          type="button"
          className="topbar-avatar"
          title="Benjamin"
          aria-label="Benjamin"
        >
          B
        </button>

        <button
          type="button"
          className="topbar-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}

export default MobileHeader;