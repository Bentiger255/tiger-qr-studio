import usePageMeta from "../hooks/usePageMeta";
import { useRef, useState } from "react";
import { Download, FileUp, RotateCcw, Trash2 } from "lucide-react";

function readLibrary() {
  try {
    const value = JSON.parse(localStorage.getItem("tigerQRs") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function Settings() {
  usePageMeta("Settings", "Manage QR defaults and back up your local QR code library.");
  const [codes, setCodes] = useState(readLibrary);
  const [notice, setNotice] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const fileRef = useRef(null);
  const [preferences, setPreferences] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tigerQRSettings") || '{"defaultSize":"320","defaultLevel":"M","downloadName":"tiger-qr"}');
    } catch {
      return { defaultSize: "320", defaultLevel: "M", downloadName: "tiger-qr" };
    }
  });

  const savePreferences = (next) => {
    setPreferences(next);
    localStorage.setItem("tigerQRSettings", JSON.stringify(next));
    setNotice("Preferences saved on this browser.");
  };

  const exportLibrary = () => {
    const blob = new Blob([JSON.stringify({ app: "Tiger QR Studio", version: 1, exportedAt: new Date().toISOString(), codes }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tiger-qr-studio-backup.json";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Library backup downloaded.");
  };

  const importLibrary = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const imported = Array.isArray(parsed) ? parsed : parsed.codes;
      if (!Array.isArray(imported) || imported.some((code) => !code || typeof code.value !== "string")) {
        throw new Error("The file does not contain a valid Tiger QR Studio library.");
      }
      const existing = readLibrary();
      const merged = [...existing];
      const ids = new Set(existing.map((code) => String(code.id)));
      imported.forEach((code) => {
        if (!ids.has(String(code.id))) {
          merged.push({ ...code, id: code.id || (Date.now() + Math.random()).toString() });
        }
      });
      localStorage.setItem("tigerQRs", JSON.stringify(merged));
      setCodes(merged);
      setNotice("Backup imported. Existing entries were kept; duplicate IDs were skipped.");
    } catch (error) {
      setNotice(error.message || "Could not import this backup.");
    } finally {
      event.target.value = "";
    }
  };

  const clearLibrary = () => {
    localStorage.removeItem("tigerQRs");
    setCodes([]);
    setConfirmClear(false);
    setNotice("Saved QR codes were removed from this browser.");
  };

  return (
    <main className="workspace-page">
      <header className="workspace-heading">
        <div>
          <span className="section-kicker">PREFERENCES & DATA</span>
          <h1>Settings</h1>
          <p>Manage local preferences and protect your saved QR library.</p>
        </div>
      </header>

      {notice && <div className="workspace-notice" role="status">{notice}<button onClick={() => setNotice("")}>Dismiss</button></div>}

      <section className="settings-section">
        <div className="settings-section-heading"><span className="section-kicker">QR DEFAULTS</span><h2>Creation preferences</h2><p>These preferences are stored in this browser. They do not change QR codes you have already saved.</p></div>
        <div className="settings-fields">
          <label className="settings-field"><span>Default QR size</span><select value={preferences.defaultSize || "320"} onChange={(event) => savePreferences({ ...preferences, defaultSize: event.target.value })}><option value="192">192 px</option><option value="256">256 px</option><option value="320">320 px</option><option value="512">512 px</option><option value="1024">1024 px</option></select></label>
          <label className="settings-field"><span>Error correction</span><select value={preferences.defaultLevel || "M"} onChange={(event) => savePreferences({ ...preferences, defaultLevel: event.target.value })}><option value="L">Low (L)</option><option value="M">Medium (M)</option><option value="Q">Quartile (Q)</option><option value="H">High (H)</option></select></label>
          <label className="settings-field"><span>Default file name</span><input value={preferences.downloadName || "tiger-qr"} maxLength={60} onChange={(event) => savePreferences({ ...preferences, downloadName: event.target.value })} /></label>
        </div>
      </section>

      <section className="settings-section">
        <div className="settings-section-heading"><span className="section-kicker">BACKUP & RESTORE</span><h2>Your QR library</h2><p>{codes.length} saved QR code{codes.length === 1 ? "" : "s"} found in this browser. Export a backup before clearing browser data or moving to another device.</p></div>
        <div className="settings-action-row"><div className="settings-action-copy"><strong>Export backup</strong><span>Download your saved QR codes as a JSON file.</span></div><button className="secondary-button" onClick={exportLibrary}><Download size={15} /> Export library</button></div>
        <div className="settings-action-row"><div className="settings-action-copy"><strong>Import backup</strong><span>Restore entries from a previous Tiger QR Studio JSON backup.</span></div><button className="secondary-button" onClick={() => fileRef.current?.click()}><FileUp size={15} /> Choose backup</button><input ref={fileRef} type="file" accept=".json,application/json" hidden onChange={importLibrary} /></div>
      </section>

      <section className="settings-section settings-danger">
        <div className="settings-section-heading"><span className="section-kicker">DESTRUCTIVE ACTIONS</span><h2>Clear saved QR codes</h2><p>This removes your saved QR library from this browser only. Download a backup first if you may need these codes later.</p></div>
        {!confirmClear ? <button className="danger-button danger-button-wide" onClick={() => setConfirmClear(true)}><Trash2 size={15} /> Clear local library</button> : <div className="settings-confirm"><strong>Are you sure you want to delete all {codes.length} saved QR codes?</strong><div><button className="secondary-button" onClick={() => setConfirmClear(false)}>Cancel</button><button className="danger-button" onClick={clearLibrary}><Trash2 size={15} /> Delete all</button></div></div>}
      </section>

      <div className="settings-footnote"><RotateCcw size={15} /><p>Tiger QR Studio currently stores its library and preferences in your browser. Clearing site data or switching browsers can remove access to this local information. Cloud sync and account-based backup are not available yet.</p></div>
    </main>
  );
}

export default Settings;