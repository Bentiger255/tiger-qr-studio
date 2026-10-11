import {
  BarChart3,
  ChevronRight,
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

const navigation = [
  {
    title: "Workspace",
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
    title: "Manage",
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
    title: "Insights",
    items: [
      {
        label: "Analytics",
        path: "/analytics",
        icon: BarChart3,
      },
    ],
  },
];

function Sidebar({ open = false, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (!path) return false;

    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const handleNavigation = (path) => {
    navigate(path);

    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${
          open ? "sidebar-overlay-visible" : ""
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />

      {/* Sidebar */}
      <aside
        className={`sidebar ${
          open ? "sidebar-open" : ""
        }`}
      >
        {/* Header */}
        <div className="sidebar-header">
          <button
            type="button"
            className="sidebar-brand"
            onClick={() => handleNavigation("/")}
            aria-label="Go to dashboard"
          >
            <TigerLogo size={36} />

            <div className="sidebar-brand-text">
              <strong>TIGER</strong>
              <span>QR STUDIO</span>
            </div>
          </button>

          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close navigation"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Create button */}
        <div className="sidebar-create">
          <button
            type="button"
            className="sidebar-create-button"
            onClick={() => handleNavigation("/create")}
          >
            <span className="sidebar-create-icon">
              <Plus size={17} />
            </span>

            <span>Create QR Code</span>

            <ChevronRight
              size={15}
              className="sidebar-create-arrow"
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-navigation">
          {navigation.map((group) => (
            <div
              className="sidebar-group"
              key={group.title}
            >
              <div className="sidebar-group-title">
                {group.title}
              </div>

              <div className="sidebar-group-list">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <button
                      type="button"
                      key={item.path}
                      className={`sidebar-link ${
                        active
                          ? "sidebar-link-active"
                          : ""
                      }`}
                      onClick={() =>
                        handleNavigation(item.path)
                      }
                    >
                      <span className="sidebar-link-icon">
                        <Icon
                          size={17}
                          strokeWidth={1.8}
                        />
                      </span>

                      <span className="sidebar-link-label">
                        {item.label}
                      </span>

                      {active && (
                        <span className="sidebar-active-dot" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="sidebar-bottom">
          <button
            type="button"
            className="sidebar-bottom-link"
            onClick={() =>
              handleNavigation("/how-to-use")
            }
          >
            <HelpCircle size={17} />
            <span>How to use</span>
          </button>

          <button
            type="button"
            className="sidebar-bottom-link"
            onClick={() =>
              handleNavigation("/settings")
            }
          >
            <Settings size={17} />
            <span>Settings</span>
          </button>

          {/* User */}
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              B
            </div>

            <div className="sidebar-user-info">
              <strong>Benjamin</strong>
              <span>Free Plan</span>
            </div>

            <ChevronRight
              size={15}
              className="sidebar-user-arrow"
            />
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;