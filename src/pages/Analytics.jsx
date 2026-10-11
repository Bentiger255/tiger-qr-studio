import { useMemo, useState } from "react";
import { BarChart3, CalendarDays, QrCode, TrendingUp } from "lucide-react";

function readLibrary() {
  try {
    const value = JSON.parse(localStorage.getItem("tigerQRs") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function Analytics() {
  const [codes] = useState(readLibrary);
  const [period, setPeriod] = useState("30");
  const days = Number(period);

  const inPeriod = useMemo(() => {
    const end = new Date();
    const cutoff = new Date(end);
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setDate(cutoff.getDate() - (days - 1));
    return codes.filter((code) => {
      if (!code.createdAt) return false;
      const date = new Date(code.createdAt);
      return !Number.isNaN(date.getTime()) && date >= cutoff && date <= end;
    });
  }, [codes, days]);

  const daily = useMemo(() => {
    const rows = [];
    for (let offset = days - 1; offset >= 0; offset -= 1) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - offset);
      const count = inPeriod.filter((code) => new Date(code.createdAt).toDateString() === date.toDateString()).length;
      rows.push({ label: days <= 7 ? date.toLocaleDateString(undefined, { weekday: "short" }) : date.toLocaleDateString(undefined, { day: "numeric", month: "short" }), count });
    }
    return rows;
  }, [inPeriod, days]);

  const byType = useMemo(() => {
    const counts = {};
    inPeriod.forEach((code) => {
      const type = code.typeLabel || code.type || "Other";
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [inPeriod]);

  const maxDaily = Math.max(1, ...daily.map((row) => row.count));
  const maxType = Math.max(1, ...byType.map((row) => row[1]));
  const today = codes.filter((code) => code.createdAt && new Date(code.createdAt).toDateString() === new Date().toDateString()).length;

  return (
    <main className="workspace-page">
      <header className="workspace-heading">
        <div>
          <span className="section-kicker">LOCAL ACTIVITY REPORT</span>
          <h1>Analytics</h1>
          <p>Understand how many QR codes you have created in this browser. Scan tracking is not currently available.</p>
        </div>
        <label className="workspace-period"><CalendarDays size={16} /><span>Period</span><select value={period} onChange={(event) => setPeriod(event.target.value)}><option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option></select></label>
      </header>

      <div className="analytics-notice"><strong>What this report measures</strong><span>Creation and saved-library activity only. QR scans, visits, and conversions are not tracked by this version of Tiger QR Studio.</span></div>

      <section className="analytics-stat-grid">
        <article className="analytics-stat"><span className="analytics-stat-icon"><QrCode size={17} /></span><span className="analytics-stat-label">Total saved QR codes</span><strong>{codes.length}</strong><small>Currently in this browser</small></article>
        <article className="analytics-stat"><span className="analytics-stat-icon"><CalendarDays size={17} /></span><span className="analytics-stat-label">Created in selected period</span><strong>{inPeriod.length}</strong><small>Based on saved creation dates</small></article>
        <article className="analytics-stat"><span className="analytics-stat-icon"><TrendingUp size={17} /></span><span className="analytics-stat-label">Created today</span><strong>{today}</strong><small>Saved today in local time</small></article>
      </section>

      <section className="analytics-panel">
        <div className="analytics-panel-heading"><div><span className="section-kicker">TREND</span><h2>QR codes created</h2><p>Number of saved QR codes per day.</p></div><span className="analytics-total">{inPeriod.length} total</span></div>
        {inPeriod.length === 0 ? <div className="analytics-empty">No saved QR codes were created during this period.</div> : (
          <div className={days > 7 ? "analytics-bars analytics-bars-long" : "analytics-bars"}>
            {daily.map((row, index) => <div className="analytics-bar-column" key={row.label + index} title={row.label + ": " + row.count}><span className="analytics-bar-value">{row.count || ""}</span><div className="analytics-bar-track"><div className="analytics-bar-fill" style={{ height: ((row.count / maxDaily) * 100) + "%" }} /></div><span className="analytics-bar-label">{row.label}</span></div>)}
          </div>
        )}
      </section>

      <section className="analytics-panel">
        <div className="analytics-panel-heading"><div><span className="section-kicker">BREAKDOWN</span><h2>QR types</h2><p>Which QR formats appear in your saved library during this period.</p></div><BarChart3 size={19} /></div>
        {byType.length === 0 ? <div className="analytics-empty">Save a QR code to see your type breakdown.</div> : <div className="analytics-type-list">{byType.map(([type, count]) => <div className="analytics-type-row" key={type}><div className="analytics-type-label"><span>{type}</span><strong>{count}</strong></div><div className="analytics-type-track"><div className="analytics-type-fill" style={{ width: ((count / maxType) * 100) + "%" }} /></div></div>)}</div>}
      </section>
    </main>
  );
}

export default Analytics;