import {
  parsePhoneNumberFromString,
} from "libphonenumber-js";

export function normalizePhoneNumber(
  phone,
  countryCode = "TZ"
) {
  if (!phone?.trim()) {
    return "";
  }

  try {
    const parsed = parsePhoneNumberFromString(
      phone,
      countryCode
    );

    if (!parsed) {
      return "";
    }

    return parsed.number;
  } catch {
    return "";
  }
}

export function formatPhoneNumber(
  phone,
  countryCode = "TZ"
) {
  if (!phone?.trim()) {
    return "";
  }

  try {
    const parsed = parsePhoneNumberFromString(
      phone,
      countryCode
    );

    if (!parsed) {
      return phone;
    }

    return parsed.formatInternational();
  } catch {
    return phone;
  }
}

export function isValidPhoneNumber(
  phone,
  countryCode = "TZ"
) {
  if (!phone?.trim()) {
    return false;
  }

  try {
    const parsed = parsePhoneNumberFromString(
      phone,
      countryCode
    );

    return Boolean(parsed?.isValid());
  } catch {
    return false;
  }
}