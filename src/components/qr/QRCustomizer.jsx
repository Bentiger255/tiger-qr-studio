import { ChevronDown, Palette, Settings2, Sparkles } from "lucide-react";

function QRCustomizer({ settings, setSettings }) {
  const update = (field, value) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <div className="customizer">
      <div className="customizer-header">
        <div>
          <p className="eyebrow">APPEARANCE</p>
          <h3>Customize</h3>
        </div>
      </div>

      <details open>
        <summary>
          <span>
            <Palette size={16} />
            Colors
          </span>

          <ChevronDown size={16} />
        </summary>

        <div className="customizer-content">
          <div className="color-row">
            <label>QR Color</label>

            <div className="color-control">
              <input
                type="color"
                value={settings.qrColor}
                onChange={(event) =>
                  update("qrColor", event.target.value)
                }
              />

              <span>{settings.qrColor.toUpperCase()}</span>
            </div>
          </div>

          <div className="color-row">
            <label>Background</label>

            <div className="color-control">
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(event) =>
                  update("backgroundColor", event.target.value)
                }
              />

              <span>
                {settings.backgroundColor.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </details>

      <details>
        <summary>
          <span>
            <Sparkles size={16} />
            Style
          </span>

          <ChevronDown size={16} />
        </summary>

        <div className="customizer-content">
          <div className="form-field">
            <label>Size</label>

            <select
              value={settings.size}
              onChange={(event) =>
                update("size", event.target.value)
              }
            >
              <option value="240">Small</option>
              <option value="320">Medium</option>
              <option value="400">Large</option>
            </select>
          </div>

          <div className="form-field">
            <label>Margin</label>

            <select
              value={settings.margin}
              onChange={(event) =>
                update("margin", event.target.value)
              }
            >
              <option value="2">Compact</option>
              <option value="4">Standard</option>
              <option value="8">Large</option>
            </select>
          </div>
        </div>
      </details>

      <details>
        <summary>
          <span>
            <Settings2 size={16} />
            Advanced
          </span>

          <ChevronDown size={16} />
        </summary>

        <div className="customizer-content">
          <div className="form-field">
            <label>Error Correction</label>

            <select
              value={settings.level}
              onChange={(event) =>
                update("level", event.target.value)
              }
            >
              <option value="L">Low</option>
              <option value="M">Medium</option>
              <option value="Q">Quartile</option>
              <option value="H">High</option>
            </select>
          </div>
        </div>
      </details>
    </div>
  );
}

export default QRCustomizer;