import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import AppShell from "./components/layout/AppShell";
import Dashboard from "./pages/Dashboard";
import CreateQR from "./pages/CreateQR";
import HowToUse from "./pages/HowToUse";
import MyQRCodes from "./pages/MyQRCodes";
import Templates from "./pages/Templates";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import usePageMeta from "./hooks/usePageMeta";
import "./styles/workspacePages.css";
import "./styles/appLayout.css";
import "./styles/layoutRepair.css";
import "./styles/dropdown.css";

function NotFound() {
  usePageMeta("Page Not Found", "The requested Tiger QR Studio page could not be found.");

  return (
    <main className="workspace-page">
      <section className="workspace-empty">
        <span className="section-kicker">404 · PAGE NOT FOUND</span>
        <h1>We could not find that page.</h1>
        <p>The link may be outdated, or the page may have moved.</p>
        <a className="primary-button" href="/">Back to dashboard</a>
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateQR />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/my-qr-codes" element={<MyQRCodes />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;