import {
  BarChart3,
  HelpCircle,
  LayoutDashboard,
  Plus,
  QrCode,
  Settings,
  Sparkles,
  X,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import TigerLogo from "../brand/TigerLogo";

const groups = [
  {
    label: "WORKSPACE",
    items: [
      {
        label: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
      },
      {
        label: "Create QR Code",
        path: "/create",
        icon: Plus,
      },
    ],
  },
  {
    label: "MANAGE",
    items: [
      {
        label: "My QR Codes",
        path: "/my-qr-codes",
        icon: QrCode,
      },
      {
        label: "Templates",
        path: "/templates",
        icon: Sparkles,
      },
    ],
  },
  {
    label: "INSIGHTS",
    items: [
      {
        label: "Analytics",
        path: "/analytics",
        icon: BarChart3,
      },
    ],
  },
];

function MobileDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path) => {
    navigate(path);
    onClose();
  };

  const active = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <>
      <div
        className={`drawer-overlay ${
          open ? "visible" : ""
        }`}
        onClick={onClose}
      />

      <aside
        className={`mobile-drawer ${
          open ? "open" : ""
        }`}
      >
        <div className="drawer-header">
          <TigerLogo size={34} />

          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="drawer-navigation">
          {groups.map((group) => (
            <div
              className="drawer-group"
              key={group.label}
            >
              <span className="drawer-group-label">
                {group.label}
              </span>

              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.path}
                    type="button"
                    className={`drawer-link ${
                      active(item.path)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => goTo(item.path)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="drawer-footer">
          <button
            type="button"
            className="drawer-link"
            onClick={() => goTo("/how-to-use")}
          >
            <HelpCircle size={18} />
            <span>How to use</span>
          </button>

          <button
            type="button"
            className="drawer-link"
            onClick={() => goTo("/settings")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <div className="drawer-user">
            <div className="drawer-user-avatar">
              B
            </div>

            <div>
              <strong>Benjamin</strong>
              <span>Free plan</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default MobileDrawer;