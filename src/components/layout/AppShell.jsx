import { useState } from "react";

import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import Footer from "../Footer";
import PrivacyNotice from "../PrivacyNotice";

function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="app-shell">
      <MobileHeader
        onMenuClick={() => setSidebarOpen(true)}
      />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app-shell-main">
        <div className="app-shell-content">
          {children}
        </div>

        <Footer />
      </div>

      <PrivacyNotice />
    </div>
  );
}

export default AppShell;