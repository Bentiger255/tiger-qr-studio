import usePageMeta from "../hooks/usePageMeta";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { qrTypes } from "../data/qrTypes";

const examples = {
  profile: { title: "Digital contact card", description: "Share your name and contact details from one scan.", use: "Networking and professional introductions" },
  phone: { title: "Call me", description: "Give customers or contacts a quick way to call you.", use: "Business cards and service desks" },
  whatsapp: { title: "WhatsApp contact", description: "Start a WhatsApp conversation without typing a number.", use: "Customer support and orders" },
  website: { title: "Website link", description: "Send people to a website, landing page or portfolio.", use: "Posters, packaging and social profiles" },
  social: { title: "Social profile", description: "Make your social account easier to find.", use: "Events, shops and creator profiles" },
  email: { title: "Email contact", description: "Open an email with the recipient already filled in.", use: "Enquiries and support" },
  wifi: { title: "Wi-Fi access", description: "Let visitors connect to a Wi-Fi network by scanning.", use: "Offices, homes and hospitality" },
  location: { title: "Map location", description: "Share a place or meeting point.", use: "Directions, venues and events" },
  contact: { title: "Contact card", description: "Share contact details in a scannable vCard format.", use: "Teams and business contacts" },
  text: { title: "Plain text", description: "Display a short message, instruction or note.", use: "Labels and quick instructions" },
  menu: { title: "Restaurant menu", description: "Help guests open menu information from a QR code.", use: "Restaurants and cafes" },
  payment: { title: "Payment details", description: "Prepare a QR code with supported payment information.", use: "Shops and service businesses" }
};

function Templates() {
  usePageMeta("QR Templates", "Choose a QR code format and start with a ready-to-use configuration.");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(qrTypes.map((item) => item.category))];
  const filtered = useMemo(() => qrTypes.filter((item) => {
    const details = examples[item.value] || {};
    const text = [item.label, item.description, item.category, details.title, details.use].join(" ").toLowerCase();
    return text.includes(query.toLowerCase()) && (category === "All" || item.category === category);
  }), [query, category]);

  return (
    <main className="workspace-page">
      <header className="workspace-heading">
        <div>
          <span className="section-kicker">START WITH A FORMAT</span>
          <h1>QR Templates</h1>
          <p>Choose a starting point. Add your own information and customize the QR code before saving it.</p>
        </div>
      </header>

      <section className="template-intro">
        <div>
          <span className="section-kicker">HOW TEMPLATES WORK</span>
          <h2>Pick the job. Add the details.</h2>
          <p>These ready-to-use formats open the QR builder with the right type selected. Nothing is saved until you create and save your QR code.</p>
        </div>
        <a href="/create" className="secondary-button">Open QR builder <ArrowUpRight size={15} /></a>
      </section>

      <section className="workspace-toolbar" aria-label="Filter templates">
        <label className="workspace-search">
          <Search size={16} aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search templates" />
        </label>
        <div className="template-categories" aria-label="Template categories">
          {categories.map((item) => <button key={item} className={category === item ? "template-category active" : "template-category"} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}
        </div>
      </section>

      {filtered.length ? (
        <section className="template-grid">
          {filtered.map((item) => {
            const Icon = item.icon;
            const details = examples[item.value] || {};
            return (
              <article className="template-item" key={item.value}>
                <div className="template-item-top">
                  <span className="template-icon"><Icon size={21} strokeWidth={1.7} /></span>
                  <span className="workspace-tag">{item.category}</span>
                </div>
                <h2>{details.title || item.label}</h2>
                <p>{details.description || item.description}</p>
                <div className="template-use"><span>Useful for</span><strong>{details.use || item.description}</strong></div>
                <button className="template-use-button" onClick={() => navigate("/create?type=" + encodeURIComponent(item.value))}>Use this template <ArrowUpRight size={16} /></button>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="workspace-empty"><h2>No templates found</h2><p>Try another search or category.</p></section>
      )}
    </main>
  );
}

export default Templates;