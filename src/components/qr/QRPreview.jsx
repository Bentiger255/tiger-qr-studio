import { Download, ExternalLink, Share2 } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

function QRPreview({
  value,
  settings,
  onDownload,
  onShare,
}) {
  const hasValue = Boolean(value);

  return (
    <div className="qr-preview-card">
      <div className="preview-header">
        <div>
          <p className="eyebrow">LIVE PREVIEW</p>
          <h3>Your QR Code</h3>
        </div>
      </div>

      <div className="qr-preview-stage">
        {hasValue ? (
          <div className="qr-canvas-wrapper">
            <QRCodeCanvas
              id="tiger-qr-canvas"
              value={value}
              size={Number(settings.size)}
              level={settings.level}
              fgColor={settings.qrColor}
              bgColor={settings.backgroundColor}
              includeMargin
            />
          </div>
        ) : (
          <div className="qr-empty">
            <div className="qr-empty-icon">
              <ExternalLink size={22} />
            </div>

            <strong>QR preview</strong>

            <span>
              Enter your information to generate the QR code.
            </span>
          </div>
        )}
      </div>

      <div className="preview-actions">
        <button
          type="button"
          className="primary-button"
          disabled={!hasValue}
          onClick={onDownload}
        >
          <Download size={16} />
          Download
        </button>

        <button
          type="button"
          className="secondary-button"
          disabled={!hasValue}
          onClick={onShare}
        >
          <Share2 size={16} />
          Share
        </button>
      </div>

      {hasValue && (
        <div className="qr-value">
          <span>Destination</span>
          <p>{value}</p>
        </div>
      )}
    </div>
  );
}

export default QRPreview;