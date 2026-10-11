import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Download, Eye, Search, Trash2 } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

import usePageMeta from "../hooks/usePageMeta";
function readLibrary() {
  try {
    const value = JSON.parse(localStorage.getItem("tigerQRs") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function MyQRCodes() {
  usePageMeta("My QR Codes", "Browse, preview, download and manage QR codes saved in this browser.");
  const [codes, setCodes] = useState(readLibrary);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [manualSelected, setManualSelected] = useState(null);
  const requestedId = searchParams.get("id");
  const selected = requestedId
    ? codes.find((code) => String(code.id) === requestedId) || manualSelected
    : manualSelected;
  const [notice, setNotice] = useState("");

  const types = useMemo(
    () => [...new Set(codes.map((code) => code.typeLabel || code.type).filter(Boolean))].sort(),
    [codes]
  );

  const filteredCodes = useMemo(() => codes.filter((code) => {
    const matchesQuery = (code.name || "").toLowerCase().includes(query.toLowerCase());
    const matchesType = typeFilter === "all" || (code.typeLabel || code.type) === typeFilter;
    return matchesQuery && matchesType;
  }), [codes, query, typeFilter]);

  const removeCode = (id) => {
    if (!window.confirm("Delete this saved QR code? This cannot be undone.")) return;
    const next = codes.filter((code) => code.id !== id);
    localStorage.setItem("tigerQRs", JSON.stringify(next));
    setCodes(next);
    if (selected?.id === id) setManualSelected(null);
    if (requestedId === String(id)) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("id");
      setSearchParams(nextParams, { replace: true });
    }
    setNotice("QR code deleted.");
  };

  const openPreview = (code) => {
    setManualSelected(code);
    if (requestedId) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("id");
      setSearchParams(nextParams, { replace: true });
    }
  };

  const closePreview = () => {
    setManualSelected(null);
    if (requestedId) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("id");
      setSearchParams(nextParams, { replace: true });
    }
  };

  const downloadCode = (code) => {
    const canvas = document.getElementById("library-qr-" + code.id);
    if (!canvas) {
      setNotice("Could not prepare this QR image. Please try again.");
      return;
    }
    const link = document.createElement("a");
    link.download = (code.name || "tiger-qr").replace(/[<>:"/\\|?*]+/g, "-") + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="workspace-page">
      <header className="workspace-heading">
        <div>
          <span className="section-kicker">YOUR WORKSPACE</span>
          <h1>My QR Codes</h1>
          <p>Find, preview, download or remove QR codes saved in this browser.</p>
        </div>
        <div className="workspace-count"><strong>{codes.length}</strong><span>saved</span></div>
      </header>

      {notice && <div className="workspace-notice" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notice">Dismiss</button></div>}

      <section className="workspace-toolbar" aria-label="Filter saved QR codes">
        <label className="workspace-search">
          <Search size={16} aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search QR codes by name" />
        </label>
        <label className="workspace-filter">
          <span>Type</span>
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            <option value="all">All types</option>
            {types.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
      </section>

      {filteredCodes.length === 0 ? (
        <section className="workspace-empty">
          <div className="workspace-empty-mark"><span>QR</span></div>
          <h2>{codes.length ? "No matching QR codes" : "Your library is empty"}</h2>
          <p>{codes.length ? "Try another name or change the type filter." : "Create a QR code and choose Save. It will appear here on this browser."}</p>
          {codes.length === 0 && <a className="primary-button" href="/create">Create your first QR code</a>}
        </section>
      ) : (
        <section className="qr-library-grid" aria-label="Saved QR codes">
          {filteredCodes.map((code) => (
            <article className="qr-library-item" key={code.id}>
              <div className="qr-library-image">
                <QRCodeCanvas id={"library-qr-" + code.id} value={code.value || " "} size={144} level={code.settings?.level || "M"} fgColor={code.settings?.qrColor || "#111111"} bgColor={code.settings?.backgroundColor || "#FFFFFF"} includeMargin />
              </div>
              <div className="qr-library-copy">
                <span className="workspace-tag">{code.typeLabel || code.type || "QR Code"}</span>
                <h2 title={code.name}>{code.name || "Untitled QR code"}</h2>
                <p>Saved {code.createdAt ? new Date(code.createdAt).toLocaleDateString() : "date unavailable"}</p>
              </div>
              <div className="qr-library-actions">
                <button className="secondary-button" onClick={() => openPreview(code)}><Eye size={15} /> Preview</button>
                <button className="secondary-button" onClick={() => downloadCode(code)}><Download size={15} /> PNG</button>
                <button className="danger-button" onClick={() => removeCode(code.id)} aria-label={"Delete " + (code.name || "QR code")}><Trash2 size={15} /></button>
              </div>
            </article>
          ))}
        </section>
      )}

      {selected && (
        <div className="workspace-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closePreview(); }}>
          <section className="workspace-modal" role="dialog" aria-modal="true" aria-labelledby="qr-preview-title">
            <button className="workspace-modal-close" onClick={closePreview} aria-label="Close preview">×</button>
            <span className="section-kicker">SAVED QR CODE</span>
            <h2 id="qr-preview-title">{selected.name || "Untitled QR code"}</h2>
            <div className="workspace-modal-qr"><QRCodeCanvas value={selected.value || " "} size={240} level={selected.settings?.level || "M"} fgColor={selected.settings?.qrColor || "#111111"} bgColor={selected.settings?.backgroundColor || "#FFFFFF"} includeMargin /></div>
            <p className="workspace-destination">{selected.value}</p>
            <button className="primary-button" onClick={() => downloadCode(selected)}><Download size={16} /> Download PNG</button>
          </section>
        </div>
      )}
    </main>
  );
}

export default MyQRCodes;