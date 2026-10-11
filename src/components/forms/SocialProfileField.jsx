import { Share2 } from "lucide-react";
import Dropdown from "../ui/Dropdown";
import { socialPlatforms } from "../../data/socialPlatforms";

function SocialProfileField({
  platform = "instagram",
  username = "",
  onPlatformChange = () => {},
  onUsernameChange = () => {},
}) {
  const platformOptions = socialPlatforms.map((item) => ({
    value: item.value,
    label: item.label,
    description: item.description,
    icon: item.icon || Share2,
  }));

  const selectedPlatform = socialPlatforms.find(
    (item) => item.value === platform
  );

  return (
    <div className="form-section">
      <div className="form-grid">
        <Dropdown
          label="Platform"
          value={platform}
          options={platformOptions}
          onChange={onPlatformChange}
        />

        <div className="form-field">
          <label htmlFor="socialUsername">Username or Profile URL</label>
          <input
            id="socialUsername"
            type="text"
            value={username || ""}
            onChange={(event) => onUsernameChange(event.target.value)}
            placeholder={selectedPlatform?.placeholder || "@username or profile URL"}
            autoComplete="url"
          />
          <small className="form-help">
            {selectedPlatform?.example
              ? `Example: ${selectedPlatform.example}`
              : "Enter your username or profile URL"}
          </small>
        </div>
      </div>
    </div>
  );
}

export default SocialProfileField;
