import {
  ArrowRight,
  BarChart3,
  Clock3,
  Download,
  Plus,
  QrCode,
  ScanLine,
  Smartphone,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { qrTypes } from "../data/qrTypes";

function Dashboard() {
  const navigate = useNavigate();

  let recentQRs;

  try {
    recentQRs = JSON.parse(
      localStorage.getItem("tigerQRs") || "[]"
    );
  } catch {
    recentQRs = [];
  }

  const quickTypes = qrTypes.slice(0, 6);
  const totalQRs = recentQRs.length;

  const todayQRs = recentQRs.filter((item) => {
    if (!item.createdAt) return false;

    const created = new Date(item.createdAt);
    const today = new Date();

    return created.toDateString() === today.toDateString();
  }).length;

  const handleQuickCreate = (type) => {
    navigate(`/create?type=${type}`);
  };

  return (
    <div className="page">
      <main className="dashboard-page">

        {/* HERO */}
        <section className="dashboard-hero">
          <div className="dashboard-hero-content">
            <div className="dashboard-status">
              <span className="dashboard-status-dot" />
              <span>YOUR QR WORKSPACE</span>
            </div>

            <h1>
              Turn information into
              <span> one simple scan.</span>
            </h1>

            <p>
              Create professional QR codes for your profile,
              website, business, payments and more.
            </p>
          </div>

          <button
            type="button"
            className="primary-button hero-create-button"
            onClick={() => navigate("/create")}
          >
            <Plus size={18} />
            Create QR Code
          </button>
        </section>

        {/* STATS */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-icon">
                <QrCode size={18} />
              </div>

              <span className="stat-label">
                TOTAL
              </span>
            </div>

            <div className="stat-value-row">
              <strong>{totalQRs}</strong>
              <span>QR codes</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-icon">
                <Clock3 size={18} />
              </div>

              <span className="stat-label">
                TODAY
              </span>
            </div>

            <div className="stat-value-row">
              <strong>{todayQRs}</strong>
              <span>created today</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-icon">
                <ScanLine size={18} />
              </div>

              <span className="stat-label">
                AVAILABLE
              </span>
            </div>

            <div className="stat-value-row">
              <strong>{qrTypes.length}</strong>
              <span>QR types</span>
            </div>
          </div>

          <div className="stat-card stat-card-plan">
            <div className="stat-card-top">
              <div className="stat-icon">
                <Sparkles size={18} />
              </div>

              <span className="stat-label">
                PLAN
              </span>
            </div>

            <div className="stat-value-row">
              <strong>Free</strong>
              <span>current plan</span>
            </div>
          </div>
        </section>

        {/* QUICK CREATE */}
        <section className="dashboard-section quick-section">
          <div className="dashboard-section-header">
            <div>
              <span className="section-kicker">
                STEP 1 · CHOOSE CONTENT
              </span>

              <h2>What do you want to turn into a QR code?</h2>

              <p>
                Choose a type, add your details, customize the design, then download your QR code.
              </p>
            </div>

            <button
              type="button"
              className="text-button"
              onClick={() => navigate("/create")}
            >
              View all
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="quick-create-grid">
            {quickTypes.map((type) => {
              const Icon = type.icon;

              return (
                <button
                  type="button"
                  className="quick-create-card"
                  key={type.value}
                  onClick={() => handleQuickCreate(type.value)}
                >
                  <div className="quick-create-icon">
                    <Icon
                      size={19}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="quick-create-content">
                    <strong>{type.label}</strong>

                    <span>
                      {type.description}
                    </span>
                  </div>

                  <div className="quick-create-arrow">
                    <ArrowRight size={16} />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* LOWER CONTENT */}
        <section className="dashboard-two-column">

          {/* RECENT */}
          <div className="dashboard-panel recent-panel">
            <div className="dashboard-panel-header">
              <div>
                <span className="section-kicker">
                  YOUR WORK
                </span>

                <h2>Recent QR codes</h2>
              </div>

              {recentQRs.length > 0 && (
                <button
                  type="button"
                  className="text-button"
                  onClick={() =>
                    navigate("/my-qr-codes")
                  }
                >
                  View all
                  <ArrowRight size={16} />
                </button>
              )}
            </div>

            {recentQRs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <QrCode size={21} />
                </div>

                <h3>Your QR library is empty</h3>

                <p>
                  Create your first QR code and it will
                  appear here for quick access.
                </p>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => navigate("/create")}
                >
                  <Plus size={16} />
                  Create your first QR
                </button>
              </div>
            ) : (
              <div className="recent-list">
                {recentQRs.slice(0, 5).map((item) => (
                  <button
                    type="button"
                    className="recent-item"
                    key={item.id}
                    onClick={() =>
                      navigate(
                        `/my-qr-codes?id=${item.id}`
                      )
                    }
                  >
                    <div className="recent-item-icon">
                      <QrCode size={17} />
                    </div>

                    <div className="recent-item-content">
                      <strong>
                        {item.name || "Untitled QR"}
                      </strong>

                      <span>
                        {item.typeLabel ||
                          item.type ||
                          "QR Code"}
                      </span>
                    </div>

                    <span className="recent-item-date">
                      {item.createdAt
                        ? new Date(
                            item.createdAt
                          ).toLocaleDateString()
                        : ""}
                    </span>

                    <ArrowRight size={15} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* GET STARTED */}
          <div className="dashboard-help-card">
            <div className="help-card-header">
              <div className="help-card-icon">
                <Smartphone size={20} />
              </div>

              <span className="help-card-badge">
                QUICK GUIDE
              </span>
            </div>

            <span className="section-kicker">
              GET STARTED
            </span>

            <h2>
              Everything you need to get your QR out there.
            </h2>

            <p>
              Create, customize, download and share a
              professional QR code in just a few steps.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={() => navigate("/how-to-use")}
            >
              Learn how it works
              <ArrowRight size={17} />
            </button>

            <div className="help-card-features">
              <div>
                <QrCode size={15} />
                <span>Create QR codes</span>
              </div>

              <div>
                <Download size={15} />
                <span>Download & share</span>
              </div>

              <div>
                <WalletCards size={15} />
                <span>Business-ready tools</span>
              </div>

              <div>
                <BarChart3 size={15} />
                <span>Track performance</span>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}

export default Dashboard;