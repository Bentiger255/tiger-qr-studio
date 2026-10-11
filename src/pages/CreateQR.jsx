import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Download,
  Save,
  Share2,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Dropdown from "../components/ui/Dropdown";
import QRForm from "../components/qr/QRForm";
import QRCustomizer from "../components/qr/QRCustomizer";
import QRPreview from "../components/qr/QRPreview";

import { qrTypes } from "../data/qrTypes";
import { generateQRValue } from "../utils/qrGenerator";

const initialData = {
  name: "",
  title: "",
  organization: "",
  email: "",
  website: "",
  location: "",

  phone: "",
  phoneCountry: "TZ",

  whatsapp: "",
  whatsappCountry: "TZ",
  message: "",

  socialPlatform: "instagram",
  socialUsername: "",

  wifiName: "",
  wifiPassword: "",
  wifiSecurity: "WPA",

  locationLatitude: "",
  locationLongitude: "",

  text: "",

  emailSubject: "",
  emailMessage: "",

  restaurantName: "",
  description: "",
  currency: "TZS",

  restaurantCategories: [],
  restaurantItemCategory: "",

  restaurantCategory: "",
  restaurantItemName: "",
  restaurantItemDescription: "",
  restaurantItemPrice: "",
  restaurantItems: [],

  restaurantOrderingMode: "menu",

  paymentMode: "tanqr",
  paymentProvider: "",
  paymentMerchantName: "",
  paymentMerchantCode: "",
  paymentAmount: "",
  paymentReference: "",
  paymentDescription: "",
  paymentUrl: "",

  profileSlug: "",
};

const initialSettings = {
  qrColor: "#111111",
  backgroundColor: "#FFFFFF",
  size: "320",
  margin: "4",
  level: "M",
};

function CreateQR() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFromUrl = searchParams.get("type") || "profile";

  const validType = qrTypes.some(
    (item) => item.value === typeFromUrl
  );

  const [selectedType, setSelectedType] = useState(
    validType ? typeFromUrl : "profile"
  );

  const [data, setData] = useState(initialData);
  const [settings, setSettings] = useState(() => {
    try {
      const preferences = JSON.parse(localStorage.getItem("tigerQRSettings") || "{}");
      return {
        ...initialSettings,
        size: preferences.defaultSize || initialSettings.size,
        level: preferences.defaultLevel || initialSettings.level,
      };
    } catch {
      return initialSettings;
    }
  });

  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("form");

  const selectedQRType = useMemo(
    () =>
      qrTypes.find(
        (item) => item.value === selectedType
      ),
    [selectedType]
  );

  const qrValue = useMemo(() => {
    try {
      return generateQRValue(selectedType, data);
    } catch (error) {
      console.error("QR generation error:", error);
      return "";
    }
  }, [selectedType, data]);

  const updateData = (field, value) => {
    setData((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const updateSettings = (field, value) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);

    setSearchParams({
      type: value,
    });

    setSaved(false);
  };

  const handleSave = () => {
    if (!qrValue) {
      alert("Please complete the required information first.");
      return;
    }

    try {
      const existing = JSON.parse(
        localStorage.getItem("tigerQRs") || "[]"
      );

      const newQR = {
        id: Date.now().toString(),
        name:
          data.name ||
          data.restaurantName ||
          data.paymentMerchantName ||
          selectedQRType?.label ||
          "Untitled QR Code",
        type: selectedType,
        typeLabel:
          selectedQRType?.label || selectedType,
        value: qrValue,
        settings,
        data,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "tigerQRs",
        JSON.stringify([
          newQR,
          ...existing,
        ])
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (error) {
      console.error("Save QR error:", error);
      alert("Unable to save this QR code.");
    }
  };

  const handleDownload = () => {
    const canvas = document.getElementById(
      "tiger-qr-canvas"
    );

    if (!canvas) {
      alert("QR code is not ready yet.");
      return;
    }

    const link = document.createElement("a");

    link.download = `${(data.name || data.restaurantName || JSON.parse(localStorage.getItem("tigerQRSettings") || "{}").downloadName || selectedQRType?.value || "tiger-qr").replace(/[<>:"\\|?*]+/g, "-").replaceAll("/", "-")}.png`;

    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleShare = async () => {
    if (!qrValue) {
      alert("Please complete the required information first.");
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: "TIGER QR CODE STUDIO",
          text: "QR code created with TIGER QR CODE STUDIO",
          url: qrValue,
        });
      } else {
        await navigator.clipboard.writeText(qrValue);
        alert("QR destination copied to clipboard.");
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Share error:", error);
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="page">
      <main className="create-page">

        {/* TOP BAR */}
        <header className="create-header">

          <div className="create-header-left">

            <button
              type="button"
              className="back-button"
              onClick={handleBack}
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={17} />
            </button>

            <div className="create-title-block">

              <div className="create-breadcrumb">
                <span>QR STUDIO</span>
                <ChevronRight size={12} />
                <span>CREATE</span>
              </div>

              <h1>Create QR Code</h1>

              <p>
                Build a QR code that is ready to share.
              </p>

            </div>

          </div>

          <div className="create-header-actions">

            <button
              type="button"
              className="secondary-button"
              onClick={handleSave}
            >
              {saved ? (
                <Check size={16} />
              ) : (
                <Save size={16} />
              )}

              {saved ? "Saved" : "Save"}
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={handleDownload}
            >
              <Download size={16} />
              Download
            </button>

          </div>

        </header>

        {/* TYPE SELECTOR */}
        <section className="create-type-selector">

          <div className="create-type-selector-heading">

            <div className="create-step-number">
              01
            </div>

            <div>
              <span className="section-kicker">
                QR TYPE
              </span>

              <h2>
                What do you want to share?
              </h2>
            </div>

          </div>

          <div className="create-type-selector-control">

            <Dropdown
              label="QR Type"
              value={selectedType}
              options={qrTypes}
              onChange={handleTypeChange}
              placeholder="Select QR type"
            />

          </div>

          {selectedQRType && (
            <div className="selected-type-info">

              <div className="selected-type-icon">
                {selectedQRType.icon && (
                  <selectedQRType.icon
                    size={18}
                    strokeWidth={1.8}
                  />
                )}
              </div>

              <div>
                <strong>
                  {selectedQRType.label}
                </strong>

                <span>
                  {selectedQRType.description}
                </span>
              </div>

            </div>
          )}

        </section>

        {/* MOBILE TABS */}
        <nav className="mobile-create-tabs">

          <button
            type="button"
            className={
              activeTab === "form"
                ? "active"
                : ""
            }
            onClick={() => setActiveTab("form")}
          >
            <span>02</span>
            Information
          </button>

          <button
            type="button"
            className={
              activeTab === "customize"
                ? "active"
                : ""
            }
            onClick={() => setActiveTab("customize")}
          >
            <span>03</span>
            Customize
          </button>

          <button
            type="button"
            className={
              activeTab === "preview"
                ? "active"
                : ""
            }
            onClick={() => setActiveTab("preview")}
          >
            <span>04</span>
            Preview
          </button>

        </nav>

        {/* WORKSPACE */}
        <div className="create-workspace">

          {/* INFORMATION */}
          <section
            className={`create-workspace-panel create-form-panel ${
              activeTab !== "form"
                ? "mobile-hidden"
                : ""
            }`}
          >

            <div className="create-panel-heading">

              <div className="create-panel-number">
                02
              </div>

              <div>
                <span className="section-kicker">
                  INFORMATION
                </span>

                <h2>
                  Add your content
                </h2>

                <p>
                  Enter the information your QR code
                  should contain.
                </p>
              </div>

            </div>

            <div className="create-panel-body">
              <QRForm
                type={selectedType}
                data={data}
                setData={setData}
                updateData={updateData}
              />
            </div>

          </section>

          {/* CUSTOMIZE */}
          <section
            className={`create-workspace-panel create-customize-panel ${
              activeTab !== "customize"
                ? "mobile-hidden"
                : ""
            }`}
          >

            <div className="create-panel-heading">

              <div className="create-panel-number">
                03
              </div>

              <div>
                <span className="section-kicker">
                  APPEARANCE
                </span>

                <h2>
                  Make it yours
                </h2>

                <p>
                  Adjust colors, size and QR appearance.
                </p>
              </div>

            </div>

            <div className="create-panel-body">
              <QRCustomizer
                settings={settings}
                setSettings={setSettings}
                updateSettings={updateSettings}
              />
            </div>

          </section>

          {/* PREVIEW */}
          <aside
            className={`create-workspace-panel create-preview-panel ${
              activeTab !== "preview"
                ? "mobile-hidden"
                : ""
            }`}
          >

            <div className="create-panel-heading preview-heading">

              <div className="create-panel-number">
                04
              </div>

              <div>
                <span className="section-kicker">
                  LIVE PREVIEW
                </span>

                <h2>
                  Your QR code
                </h2>

                <p>
                  Scan it to make sure everything works.
                </p>
              </div>

            </div>

            <div className="preview-workspace">

              <div className="preview-qr-container">
                <QRPreview
                  value={qrValue}
                  settings={settings}
                  onDownload={handleDownload}
                  onShare={handleShare}
                />
              </div>

              <div className="preview-status">

                <span
                  className={
                    qrValue
                      ? "preview-status-dot ready"
                      : "preview-status-dot"
                  }
                />

                <span>
                  {qrValue
                    ? "QR code ready"
                    : "Waiting for information"}
                </span>

              </div>

            </div>

            <div className="preview-actions">

              <button
                type="button"
                className="secondary-button full-button"
                onClick={handleShare}
              >
                <Share2 size={16} />
                Share
              </button>

              <button
                type="button"
                className="primary-button full-button"
                onClick={handleDownload}
              >
                <Download size={16} />
                Download PNG
              </button>

            </div>

          </aside>

        </div>

      </main>
    </div>
  );
}

export default CreateQR;