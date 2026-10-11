import usePageMeta from "../hooks/usePageMeta";

function Privacy() {
  usePageMeta("Privacy Policy", "Learn how Tiger QR Studio stores QR codes and preferences in your browser and what data the app does not collect.");

  return (
    <main className="workspace-page legal-page">
      <header className="workspace-heading">
        <div>
          <span className="section-kicker">YOUR DATA</span>
          <h1>Privacy Policy</h1>
          <p>Last updated: 12 October 2026</p>
        </div>
      </header>

      <section className="legal-section">
        <h2>How the app stores information</h2>
        <p>Tiger QR Studio stores saved QR entries and preferences in your browser using local storage. The library uses the <code>tigerQRs</code> key, and preferences use <code>tigerQRSettings</code>. This data stays in the browser profile on the device where you created it. It is not synced to an account or uploaded to a Tiger QR Studio server by this version of the app.</p>
      </section>

      <section className="legal-section">
        <h2>What the app does not currently collect</h2>
        <p>This version does not have user accounts, cloud synchronization, server-side QR libraries, scan tracking, visitor analytics or conversion tracking. The local Analytics page only summarizes saved QR entries on this device. It does not count scans.</p>
      </section>

      <section className="legal-section">
        <h2>Information encoded in QR codes</h2>
        <p>Information you enter may be embedded directly in a QR code or used to form its destination. Anyone who scans or receives that code may be able to read the encoded information. Do not encode passwords, confidential records or other sensitive information unless you understand the risks.</p>
      </section>

      <section className="legal-section">
        <h2>Third-party destinations</h2>
        <p>QR codes may open services such as websites, email, phone dialers, maps or messaging platforms. When you or another person opens one of those destinations, that service's own privacy policy and terms apply. Tiger QR Studio does not control how external services handle information.</p>
      </section>

      <section className="legal-section">
        <h2>Your choices</h2>
        <p>You can export your library from Settings, remove individual entries from My QR Codes, or clear the local library. Clearing browser site data may also remove saved entries and preferences. Keep a backup if you need to preserve them.</p>
      </section>

      <section className="legal-section">
        <h2>Contact and questions</h2>
        <p>For a question about this policy or to report a privacy concern, use the <a href="https://github.com/Bentiger255/tiger-qr-studio/issues" target="_blank" rel="noreferrer">project support page on GitHub</a>.</p>
      </section>
    </main>
  );
}

export default Privacy;
