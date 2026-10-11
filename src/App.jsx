import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import AppShell from "./components/layout/AppShell";

import Dashboard from "./pages/Dashboard";
import CreateQR from "./pages/CreateQR";
import HowToUse from "./pages/HowToUse";

function PlaceholderPage({ title }) {
  return (
    <main className="page">
      <div className="placeholder-page">
        <div className="placeholder-card">
          <span className="eyebrow">
            TIGER QR STUDIO
          </span>

          <h1>{title}</h1>

          <p>
            This workspace is being prepared.
          </p>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/create"
            element={<CreateQR />}
          />

          <Route
            path="/how-to-use"
            element={<HowToUse />}
          />

          <Route
            path="/my-qr-codes"
            element={
              <PlaceholderPage title="My QR Codes" />
            }
          />

          <Route
            path="/templates"
            element={
              <PlaceholderPage title="Templates" />
            }
          />

          <Route
            path="/analytics"
            element={
              <PlaceholderPage title="Analytics" />
            }
          />

          <Route
            path="/settings"
            element={
              <PlaceholderPage title="Settings" />
            }
          />

          <Route
            path="*"
            element={<Dashboard />}
          />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;