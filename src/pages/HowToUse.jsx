import usePageMeta from "../hooks/usePageMeta";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  Palette,
  QrCode,
  ScanLine,
  Share2,
  Smartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function HowToUse() {
  usePageMeta("How to Use", "Learn how to create, customize, download and manage QR codes with Tiger QR Studio.");
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      icon: QrCode,
      title: "Choose a QR type",
      description:
        "Start by selecting what you want your QR code to do. You can create QR codes for websites, phone numbers, WhatsApp, social profiles, Wi-Fi, locations, menus and more.",
    },
    {
      number: "02",
      icon: Smartphone,
      title: "Enter your information",
      description:
        "Fill in the required information. The QR preview updates as you enter your details.",
    },
    {
      number: "03",
      icon: Palette,
      title: "Customize your QR",
      description:
        "Change the QR color, background, size, margin and error correction settings to match your needs.",
    },
    {
      number: "04",
      icon: ScanLine,
      title: "Check the preview",
      description:
        "Use the live preview to make sure the QR code looks correct before downloading or sharing it.",
    },
    {
      number: "05",
      icon: Download,
      title: "Download your QR",
      description:
        "Download your QR code as a PNG image and use it on posters, menus, cards, websites, packaging or social media.",
    },
    {
      number: "06",
      icon: Share2,
      title: "Share it",
      description:
        "Share the QR destination or your QR code with customers, friends, clients or your audience.",
    },
  ];

  return (
    <div className="page">
      <main className="how-to-page">
        <section className="how-to-hero">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
          </button>

          <span className="eyebrow">GETTING STARTED</span>

          <h1>How to use TIGER QR STUDIO</h1>

          <p>
            Create a professional QR code in a few simple
            steps. No technical knowledge required.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/create")}
          >
            Create a QR Code
            <ArrowRight size={17} />
          </button>
        </section>

        <section className="how-to-steps">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                className="how-to-step"
                key={step.number}
              >
                <div className="step-number">
                  {step.number}
                </div>

                <div className="step-icon">
                  <Icon size={22} />
                </div>

                <div className="step-content">
                  <h2>{step.title}</h2>
                  <p>{step.description}</p>
                </div>
              </article>
            );
          })}
        </section>

        <section className="static-smart-section">
          <div>
            <span className="section-kicker">
              UNDERSTAND QR TYPES
            </span>

            <h2>Static QR vs Smart QR</h2>

            <p>
This version creates static QR codes with information embedded directly in the code. Dynamic destination editing and scan analytics are not available yet.
            </p>
          </div>

          <div className="qr-explanation-grid">
            <div className="explanation-card">
              <div className="explanation-icon">
                <QrCode size={20} />
              </div>

              <h3>Static QR</h3>

              <p>
                The information is stored directly inside
                the QR code. It is simple and does not
                require a TIGER-hosted destination.
              </p>

              <ul>
                <li>
                  <Check size={15} />
                  Simple
                </li>

                <li>
                  <Check size={15} />
                  Works offline after creation
                </li>

                <li>
                  <Check size={15} />
                  Great for basic information
                </li>
              </ul>
            </div>

            <div className="explanation-card">
              <div className="explanation-icon">
                <ScanLine size={20} />
              </div>

              <h3>Smart QR</h3>

              <p>
Dynamic QR codes can use a hosted redirect to change destinations and measure scans. Those features are not available in this version of Tiger QR Studio.
              </p>

              <ul>
                <li>
                  <Check size={15} />
                  Requires hosted redirect
                </li>

                <li>
                  <Check size={15} />
                  Web-based experiences
                </li>

                <li>
                  <Check size={15} />
                  Requires scan tracking
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="how-to-cta">
          <div>
            <span className="section-kicker">
              READY?
            </span>

            <h2>Create your first QR code.</h2>

            <p>
              Choose a QR type and start building.
            </p>
          </div>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/create")}
          >
            Start Creating
            <ArrowRight size={17} />
          </button>
        </section>
      </main>
    </div>
  );
}

export default HowToUse;