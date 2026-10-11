import usePageMeta from "../hooks/usePageMeta";

function Terms() {
  usePageMeta("Terms and Conditions", "Read the terms for using Tiger QR Studio and its QR code creation, storage and export features.");

  return (
    <main className="workspace-page legal-page">
      <header className="workspace-heading">
        <div>
          <span className="section-kicker">USING THE SERVICE</span>
          <h1>Terms and Conditions</h1>
          <p>Last updated: 12 October 2026</p>
        </div>
      </header>

      <section className="legal-section">
        <h2>Using Tiger QR Studio</h2>
        <p>Tiger QR Studio is a browser-based tool for creating, customizing, saving and exporting QR codes. You may use it for lawful personal, educational and business purposes.</p>
      </section>

      <section className="legal-section">
        <h2>Your content and QR codes</h2>
        <p>You are responsible for the information you enter and the destinations you encode. Make sure you have permission to use that information, and do not use the service to distribute unlawful, harmful, deceptive or unauthorized content.</p>
      </section>

      <section className="legal-section">
        <h2>Test before sharing or printing</h2>
        <p>Always scan and test a generated QR code on a separate device before printing, publishing or using it for business. The app may not verify that an external URL, payment destination, profile page or third-party service exists or works as expected.</p>
      </section>

      <section className="legal-section">
        <h2>Storage and backups</h2>
        <p>Saved QR entries and preferences are stored locally in your browser. They may be lost if you clear site data, change browsers or use another device. Export a backup from Settings when you need to preserve your library. Cloud backup and account recovery are not available in this version.</p>
      </section>

      <section className="legal-section">
        <h2>Availability and limitations</h2>
        <p>The service is provided as available and may change over time. We do not guarantee that every QR destination, device, scanner or third-party service will behave identically. The app does not currently provide scan tracking or guarantee that a QR code will remain reachable indefinitely.</p>
      </section>

      <section className="legal-section">
        <h2>Contact and support</h2>
        <p>For questions, bug reports or suggestions, use the <a href="https://github.com/Bentiger255/tiger-qr-studio/issues" target="_blank" rel="noreferrer">project support page on GitHub</a>.</p>
      </section>
    </main>
  );
}

export default Terms;
