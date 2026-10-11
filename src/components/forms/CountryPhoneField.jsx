import { useMemo } from "react";
import Dropdown from "../ui/Dropdown";
import { countries } from "../../data/countries";
import {
  formatPhoneNumber,
  isValidPhoneNumber,
} from "../../utils/phone";

function CountryPhoneField({
  label = "Phone number",
  country = "TZ",
  phone = "",
  onCountryChange,
  onPhoneChange,
}) {
  const selectedCountry = useMemo(
    () =>
      countries.find(
        (item) => item.code === country
      ) || countries[0],
    [country]
  );

  const valid = phone
    ? isValidPhoneNumber(phone, country)
    : null;

  const countryOptions = countries.map((item) => ({
    value: item.code,
    label: `${item.flag} ${item.name} ${item.dialCode}`,
  }));

  function handlePhoneChange(event) {
    onPhoneChange(event.target.value);
  }

  const formatted = phone
    ? formatPhoneNumber(phone, country)
    : "";

  return (
    <div className="smart-phone-field">
      <div className="smart-phone-grid">
        <Dropdown
          label="Country"
          value={country}
          options={countryOptions}
          onChange={onCountryChange}
        />

        <div className="form-field">
          <label>{label}</label>

          <div
            className={`phone-input-wrapper ${
              valid === true
                ? "is-valid"
                : valid === false
                ? "is-invalid"
                : ""
            }`}
          >
            <span className="phone-prefix">
              {selectedCountry.dialCode}
            </span>

            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="712 345 678"
              autoComplete="tel"
            />
          </div>

          {formatted && (
            <div
              className={`field-helper ${
                valid === true
                  ? "success"
                  : valid === false
                  ? "error"
                  : ""
              }`}
            >
              {valid === true
                ? `✓ ${formatted}`
                : valid === false
                ? "Enter a valid phone number"
                : formatted}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryPhoneField;