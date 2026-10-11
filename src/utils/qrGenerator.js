import {
  normalizePhoneNumber,
} from "./phone";

import {
  generateSocialUrl,
} from "./social";

/* =========================================
   URL NORMALIZATION
========================================= */

function normalizeUrl(value) {
  if (!value?.trim()) {
    return "";
  }

  const trimmed =
    value.trim();

  /*
   * If the user already supplied
   * a protocol, keep it.
   */
  if (
    trimmed.startsWith(
      "http://"
    ) ||
    trimmed.startsWith(
      "https://"
    )
  ) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

/* =========================================
   SLUG
========================================= */

function createSlug(value) {
  if (!value?.trim()) {
    return "profile";
  }

  return value
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9\s-]/g,
      ""
    )
    .replace(
      /\s+/g,
      "-"
    )
    .replace(
      /-+/g,
      "-"
    )
    .replace(
      /^-|-$/g,
      ""
    );
}

/* =========================================
   URL ENCODING
========================================= */

function encode(value) {
  return encodeURIComponent(
    value || ""
  );
}

/* =========================================
   PHONE
========================================= */

function generatePhoneQR(data) {
  const phone =
    normalizePhoneNumber(
      data.phone,
      data.phoneCountry ||
        "TZ"
    );

  if (!phone) {
    return "";
  }

  return `tel:${phone}`;
}

/* =========================================
   WHATSAPP
========================================= */

function generateWhatsAppQR(data) {
  const phone =
    normalizePhoneNumber(
      data.whatsapp,
      data.whatsappCountry ||
        "TZ"
    );

  if (!phone) {
    return "";
  }

  const digits =
    phone.replace(
      /^\+/,
      ""
    );

  const message =
    data.whatsappMessage?.trim();

  if (message) {
    return `https://wa.me/${digits}?text=${encode(
      message
    )}`;
  }

  return `https://wa.me/${digits}`;
}

/* =========================================
   EMAIL
========================================= */

function generateEmailQR(data) {
  const email =
    data.email?.trim();

  if (!email) {
    return "";
  }

  const params =
    new URLSearchParams();

  if (
    data.emailSubject?.trim()
  ) {
    params.set(
      "subject",
      data.emailSubject.trim()
    );
  }

  if (
    data.emailMessage?.trim()
  ) {
    params.set(
      "body",
      data.emailMessage.trim()
    );
  }

  const query =
    params.toString();

  return query
    ? `mailto:${email}?${query}`
    : `mailto:${email}`;
}

/* =========================================
   WIFI
========================================= */

function generateWifiQR(data) {
  const ssid =
    data.wifiName?.trim();

  if (!ssid) {
    return "";
  }

  const security =
    data.wifiSecurity ||
    "WPA";

  const password =
    security === "nopass"
      ? ""
      : data.wifiPassword ||
        "";

  /*
   * Escape special characters
   * required by the Wi-Fi QR
   * format.
   */
  const escapeWifiValue = (
    value
  ) => {
    return String(value)
      .replace(
        /\\/g,
        "\\\\"
      )
      .replace(
        /;/g,
        "\\;"
      )
      .replace(
        /,/g,
        "\\,"
      )
      .replace(
        /:/g,
        "\\:"
      )
      .replace(
        /"/g,
        '\\"'
      );
  };

  return [
    "WIFI:",
    `T:${security};`,
    `S:${escapeWifiValue(
      ssid
    )};`,
    `P:${escapeWifiValue(
      password
    )};`,
    ";",
  ].join("");
}

/* =========================================
   LOCATION
========================================= */

function generateLocationQR(data) {
  const latitude =
    data.locationLatitude;

  const longitude =
    data.locationLongitude;

  /*
   * GPS coordinates take priority.
   */
  if (
    latitude !== "" &&
    longitude !== "" &&
    latitude !== null &&
    longitude !== null
  ) {
    return `https://www.google.com/maps/search/?api=1&query=${encode(
      `${latitude},${longitude}`
    )}`;
  }

  /*
   * Otherwise use the
   * manually entered location.
   */
  if (
    data.location?.trim()
  ) {
    return `https://www.google.com/maps/search/?api=1&query=${encode(
      data.location.trim()
    )}`;
  }

  return "";
}

/* =========================================
   VCARD
========================================= */

function escapeVCard(value) {
  return String(value || "")
    .replace(
      /\\/g,
      "\\\\"
    )
    .replace(
      /;/g,
      "\\;"
    )
    .replace(
      /,/g,
      "\\,"
    )
    .replace(
      /\n/g,
      "\\n"
    );
}

function generateVCard(data) {
  const name =
    data.name?.trim();

  if (!name) {
    return "";
  }

  const phone =
    normalizePhoneNumber(
      data.phone,
      data.phoneCountry ||
        "TZ"
    );

  const whatsapp =
    normalizePhoneNumber(
      data.whatsapp,
      data.whatsappCountry ||
        "TZ"
    );

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCard(
      name
    )}`,
  ];

  if (phone) {
    lines.push(
      `TEL;TYPE=CELL:${phone}`
    );
  }

  if (whatsapp) {
    lines.push(
      `X-WHATSAPP:${whatsapp}`
    );
  }

  if (data.email?.trim()) {
    lines.push(
      `EMAIL:${escapeVCard(
        data.email.trim()
      )}`
    );
  }

  if (data.organization?.trim()) {
    lines.push(
      `ORG:${escapeVCard(
        data.organization.trim()
      )}`
    );
  }

  if (data.title?.trim()) {
    lines.push(
      `TITLE:${escapeVCard(
        data.title.trim()
      )}`
    );
  }

  if (data.website?.trim()) {
    lines.push(
      `URL:${normalizeUrl(
        data.website
      )}`
    );
  }

  if (data.location?.trim()) {
    lines.push(
      `ADR:;;${escapeVCard(
        data.location.trim()
      )};;;;`
    );
  }

  lines.push(
    "END:VCARD"
  );

  return lines.join(
    "\n"
  );
}

/* =========================================
   DIGITAL PROFILE
========================================= */

function generateProfileQR(data) {
  /*
   * A digital profile is intended
   * to become a Smart QR.
   *
   * The public TIGER backend will
   * eventually resolve:
   *
   * /p/<slug>
   *
   * For now we generate the
   * destination URL architecture.
   */

  const slug =
    createSlug(
      data.profileSlug ||
        data.name
    );

  if (
    !data.name?.trim()
  ) {
    return "";
  }

  return `https://tigerqr.com/p/${slug}`;
}

/* =========================================
   RESTAURANT MENU
========================================= */

function generateRestaurantQR(
  data
) {
  const slug =
    createSlug(
      data.restaurantName
    );

  if (
    !data.restaurantName?.trim()
  ) {
    return "";
  }

  /*
   * Smart restaurant QR.
   *
   * Later:
   *
   * /menu/<slug>
   *
   * can resolve to a dynamic
   * TIGER-hosted menu.
   */

  let url = `https://tigerqr.com/menu/${slug}`;

  /*
   * We can preserve the
   * ordering mode as a query
   * parameter for the future
   * hosted menu.
   */

  if (
    data.restaurantOrderingMode
  ) {
    url += `?mode=${encode(
      data.restaurantOrderingMode
    )}`;
  }

  return url;
}

/* =========================================
   PAYMENT
========================================= */

function generatePaymentQR(
  data
) {
  /*
   * IMPORTANT:
   *
   * We do not invent proprietary
   * M-Pesa / Mixx / Airtel /
   * HaloPesa QR payloads.
   *
   * Production payment QR should
   * eventually be generated from
   * an authorized TANQR / PSP /
   * acquirer integration.
   */

  if (
    data.paymentMode ===
    "payment-link"
  ) {
    return normalizeUrl(
      data.paymentUrl
    );
  }

  if (
    data.paymentMode ===
    "tanqr"
  ) {
    const merchant =
      data.paymentMerchantCode?.trim();

    /*
     * During the frontend MVP,
     * create a TIGER payment
     * configuration URL rather
     * than pretending it is an
     * official TANQR payload.
     */

    if (!merchant) {
      return "";
    }

    const params =
      new URLSearchParams();

    params.set(
      "merchant",
      merchant
    );

    if (
      data.paymentAmount
    ) {
      params.set(
        "amount",
        data.paymentAmount
      );
    }

    if (
      data.paymentReference
    ) {
      params.set(
        "reference",
        data.paymentReference
      );
    }

    if (
      data.paymentProvider
    ) {
      params.set(
        "provider",
        data.paymentProvider
      );
    }

    return `https://tigerqr.com/pay?${params.toString()}`;
  }

  return "";
}

/* =========================================
   MAIN GENERATOR
========================================= */

export function generateQRValue(
  type,
  data
) {
  if (!type) {
    return "";
  }

  if (!data) {
    return "";
  }

  switch (type) {
    /* ===============================
       SMART PROFILE
    =============================== */

    case "profile":
      return generateProfileQR(
        data
      );

    /* ===============================
       PHONE
    =============================== */

    case "phone":
      return generatePhoneQR(
        data
      );

    /* ===============================
       WHATSAPP
    =============================== */

    case "whatsapp":
      return generateWhatsAppQR(
        data
      );

    /* ===============================
       WEBSITE
    =============================== */

    case "website":
      return normalizeUrl(
        data.website
      );

    /* ===============================
       SOCIAL
    =============================== */

    case "social":
      return generateSocialUrl(
        data.socialPlatform,
        data.socialUsername
      );

    /* ===============================
       EMAIL
    =============================== */

    case "email":
      return generateEmailQR(
        data
      );

    /* ===============================
       WIFI
    =============================== */

    case "wifi":
      return generateWifiQR(
        data
      );

    /* ===============================
       LOCATION
    =============================== */

    case "location":
      return generateLocationQR(
        data
      );

    /* ===============================
       CONTACT
    =============================== */

    case "contact":
      return generateVCard(
        data
      );

    /* ===============================
       TEXT
    =============================== */

    case "text":
      return data.text?.trim() ||
        "";

    /* ===============================
       RESTAURANT
    =============================== */

    case "menu":
      return generateRestaurantQR(
        data
      );

    /* ===============================
       PAYMENT
    =============================== */

    case "payment":
      return generatePaymentQR(
        data
      );

    default:
      return "";
  }
}

/* =========================================
   OPTIONAL HELPERS
========================================= */

export function isSmartQR(
  type
) {
  return [
    "profile",
    "menu",
    "payment",
  ].includes(type);
}

export function isStaticQR(
  type
) {
  return !isSmartQR(type);
}