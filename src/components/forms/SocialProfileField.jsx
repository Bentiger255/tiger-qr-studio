import { Share2 } from "lucide-react";
import Dropdown from "../ui/Dropdown";
import { socialPlatforms } from "../../data/socialPlatforms";

function SocialProfileField({
  data = {},
  updateData = () => {},
  setData,
}) {
  const handleUpdate = (field, value) => {
    if (typeof updateData === "function") {
      updateData(field, value);
      return;
    }

    if (typeof setData === "function") {
      setData((current) => ({
        ...current,
        [field]: value,
      }));
    }
  };

  const platformOptions = socialPlatforms.map((platform) => ({
    value: platform.value,
    label: platform.label,
    description: platform.description,
    icon: platform.icon || Share2,
  }));

  const selectedPlatform = socialPlatforms.find(
    (platform) => platform.value === data.socialPlatform
  );

  return (
    <div className="form-section">
      <div className="form-grid">
        <Dropdown
          label="Platform"
          value={data.socialPlatform || "instagram"}
          options={platformOptions}
          onChange={(value) =>
            handleUpdate("socialPlatform", value)
          }
        />

        <div className="form-field">
          <label htmlFor="socialUsername">
            Username or Profile URL
          </label>

          <input
            id="socialUsername"
            type="text"
            value={data.socialUsername || ""}
            onChange={(event) =>
              handleUpdate(
                "socialUsername",
                event.target.value
              )
            }
            placeholder={
              selectedPlatform?.placeholder ||
              "@username or profile URL"
            }
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