import { useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "tigerQRPrivacyNoticeDismissed";

function wasDismissed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function PrivacyNotice() {
  const [dismissed, setDismissed] = useState(wasDismissed);

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // The notice remains dismissed for this session if storage is unavailable.
    }
  };

  if (dismissed) return null;

  return (
    <aside className="privacy-notice" aria-label="Local data notice">
      <div>
        <strong>Saved data stays in this browser</strong>
        <p>Your QR library and preferences use local browser storage. They are not synced to an account. <Link to="/privacy">Read the privacy policy</Link>.</p>
      </div>
      <button type="button" className="secondary-button" onClick={dismiss}>Got it</button>
    </aside>
  );
}

export default PrivacyNotice;
