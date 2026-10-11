import { useState } from "react";

import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import Footer from "../Footer";

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

      <div className="app-main">
        <div className="app-content">
          {children}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default AppShell;