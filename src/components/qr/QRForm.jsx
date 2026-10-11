import {
  MapPin,
  Navigation,
  Plus,
  Trash2,
} from "lucide-react";

import Dropdown from "../ui/Dropdown";

import CountryPhoneField from "../forms/CountryPhoneField";
import SocialProfileField from "../forms/SocialProfileField";

/* =========================================
   BASIC INPUT
========================================= */

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  helper = "",
}) {
  return (
    <div className="form-field">
      <label>{label}</label>

      <input
        type={type}
        value={value || ""}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
      />

      {helper && (
        <div className="field-helper">
          {helper}
        </div>
      )}
    </div>
  );
}

/* =========================================
   TEXTAREA
========================================= */

function TextareaField({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
}) {
  return (
    <div className="form-field">
      <label>{label}</label>

      <textarea
        rows={rows}
        value={value || ""}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
      />
    </div>
  );
}

/* =========================================
   SECTION
========================================= */

function FormSection({
  title,
  description,
  children,
}) {
  return (
    <div className="form-section">
      <div className="form-section-heading">
        <div>
          <h3>{title}</h3>

          {description && (
            <p>{description}</p>
          )}
        </div>
      </div>

      <div className="form-section-body">
        {children}
      </div>
    </div>
  );
}

/* =========================================
   LOCATION FIELD
========================================= */

function LocationField({
  data,
  updateData,
}) {
  function useCurrentLocation() {
    if (!navigator.geolocation) {
      alert(
        "Location detection is not supported by this browser."
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        updateData(
          "locationLatitude",
          latitude
        );

        updateData(
          "locationLongitude",
          longitude
        );

        updateData(
          "location",
          `${latitude.toFixed(
            6
          )}, ${longitude.toFixed(6)}`
        );
      },
      (error) => {
        console.error(
          "Location error:",
          error
        );

        let message =
          "Unable to detect your location.";

        if (
          error.code ===
          error.PERMISSION_DENIED
        ) {
          message =
            "Location permission was denied. Please allow location access in your browser.";
        }

        if (
          error.code ===
          error.POSITION_UNAVAILABLE
        ) {
          message =
            "Your current location is unavailable.";
        }

        if (
          error.code ===
          error.TIMEOUT
        ) {
          message =
            "Location detection timed out. Please try again.";
        }

        alert(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }

  return (
    <div className="location-builder">
      <div className="location-action-row">
        <button
          type="button"
          className="secondary-action-button"
          onClick={
            useCurrentLocation
          }
        >
          <Navigation size={16} />

          Use my current location
        </button>
      </div>

      <Field
        label="Location"
        value={data.location}
        onChange={(value) =>
          updateData(
            "location",
            value
          )
        }
        placeholder="Enter an area, address or place"
        helper="You can enter a location manually or use your current GPS location."
      />

      {data.locationLatitude &&
        data.locationLongitude && (
          <div className="location-detected">
            <MapPin size={16} />

            <div>
              <strong>
                Location detected
              </strong>

              <span>
                {data.locationLatitude},{" "}
                {data.locationLongitude}
              </span>
            </div>
          </div>
        )}
    </div>
  );
}

/* =========================================
   RESTAURANT MENU
========================================= */

function RestaurantMenuBuilder({
  data,
  updateData,
}) {
  const categories =
    Array.isArray(
      data.restaurantCategories
    )
      ? data.restaurantCategories
      : [];

  const items =
    Array.isArray(
      data.restaurantItems
    )
      ? data.restaurantItems
      : [];

  function addCategory() {
    const name =
      data.restaurantCategory?.trim();

    if (!name) {
      return;
    }

    if (
      categories.some(
        (category) =>
          category.name.toLowerCase() ===
          name.toLowerCase()
      )
    ) {
      return;
    }

    updateData(
      "restaurantCategories",
      [
        ...categories,
        {
          id: Date.now(),
          name,
        },
      ]
    );

    updateData(
      "restaurantCategory",
      ""
    );
  }

  function removeCategory(id) {
    updateData(
      "restaurantCategories",
      categories.filter(
        (category) =>
          category.id !== id
      )
    );

    updateData(
      "restaurantItems",
      items.filter(
        (item) =>
          item.categoryId !== id
      )
    );
  }

  function addItem() {
    const name =
      data.restaurantItemName?.trim();

    const price =
      data.restaurantItemPrice?.trim();

    if (!name || !price) {
      alert(
        "Please enter the item name and price."
      );

      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      description:
        data.restaurantItemDescription?.trim() ||
        "",
      price,
      categoryId:
        data.restaurantItemCategory || "",
      available: true,
    };

    updateData(
      "restaurantItems",
      [...items, newItem]
    );

    updateData(
      "restaurantItemName",
      ""
    );

    updateData(
      "restaurantItemDescription",
      ""
    );

    updateData(
      "restaurantItemPrice",
      ""
    );

    updateData(
      "restaurantItemCategory",
      ""
    );
  }

  function removeItem(id) {
    updateData(
      "restaurantItems",
      items.filter(
        (item) => item.id !== id
      )
    );
  }

  const categoryOptions =
    categories.map(
      (category) => ({
        value: String(
          category.id
        ),
        label: category.name,
      })
    );

  const orderingOptions = [
    {
      value: "menu",
      label: "Menu only",
      description:
        "Customers only view the menu.",
    },
    {
      value: "whatsapp",
      label: "WhatsApp ordering",
      description:
        "Customers order through WhatsApp.",
    },
    {
      value: "dine-in",
      label: "Dine-in ordering",
      description:
        "Designed for table ordering.",
    },
    {
      value: "takeaway",
      label: "Takeaway",
      description:
        "Customers order for collection.",
    },
    {
      value: "delivery",
      label: "Delivery",
      description:
        "Customers order for delivery.",
    },
  ];

  return (
    <div className="restaurant-builder">
      <FormSection
        title="Restaurant information"
        description="Set up the information customers see when they open your menu."
      >
        <div className="form-grid">
          <Field
            label="Restaurant name"
            value={
              data.restaurantName
            }
            onChange={(value) =>
              updateData(
                "restaurantName",
                value
              )
            }
            placeholder="e.g. Garden Restaurant"
          />

          <Field
            label="Currency"
            value={
              data.restaurantCurrency
            }
            onChange={(value) =>
              updateData(
                "restaurantCurrency",
                value
              )
            }
            placeholder="TZS"
          />
        </div>

        <TextareaField
          label="Description"
          value={
            data.restaurantDescription
          }
          onChange={(value) =>
            updateData(
              "restaurantDescription",
              value
            )
          }
          placeholder="Tell customers about your restaurant..."
          rows={3}
        />

        <div className="form-grid">
          <CountryPhoneField
            label="Restaurant phone"
            country={
              data.restaurantPhoneCountry ||
              "TZ"
            }
            phone={
              data.restaurantPhone
            }
            onCountryChange={(
              value
            ) =>
              updateData(
                "restaurantPhoneCountry",
                value
              )
            }
            onPhoneChange={(value) =>
              updateData(
                "restaurantPhone",
                value
              )
            }
          />

          <CountryPhoneField
            label="WhatsApp"
            country={
              data.restaurantWhatsappCountry ||
              "TZ"
            }
            phone={
              data.restaurantWhatsapp
            }
            onCountryChange={(
              value
            ) =>
              updateData(
                "restaurantWhatsappCountry",
                value
              )
            }
            onPhoneChange={(value) =>
              updateData(
                "restaurantWhatsapp",
                value
              )
            }
          />
        </div>

        <Field
          label="Location"
          value={
            data.restaurantLocation
          }
          onChange={(value) =>
            updateData(
              "restaurantLocation",
              value
            )
          }
          placeholder="e.g. Kinondoni, Dar es Salaam"
        />
      </FormSection>

      <FormSection
        title="Menu categories"
        description="Organize your menu into clear sections."
      >
        <div className="form-inline-action">
          <Field
            label="Category name"
            value={
              data.restaurantCategory
            }
            onChange={(value) =>
              updateData(
                "restaurantCategory",
                value
              )
            }
            placeholder="Breakfast"
          />

          <button
            type="button"
            className="secondary-action-button"
            onClick={addCategory}
          >
            <Plus size={16} />

            Add category
          </button>
        </div>

        {categories.length > 0 && (
          <div className="builder-list">
            {categories.map(
              (category) => (
                <div
                  className="builder-list-item"
                  key={category.id}
                >
                  <span>
                    {category.name}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      removeCategory(
                        category.id
                      )
                    }
                    aria-label={`Remove ${category.name}`}
                  >
                    <Trash2
                      size={15}
                    />
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </FormSection>

      <FormSection
        title="Menu items"
        description="Add dishes, drinks and other products with their prices."
      >
        <div className="form-grid">
          <Field
            label="Item name"
            value={
              data.restaurantItemName
            }
            onChange={(value) =>
              updateData(
                "restaurantItemName",
                value
              )
            }
            placeholder="Chicken & Chips"
          />

          <Field
            label="Price"
            type="number"
            value={
              data.restaurantItemPrice
            }
            onChange={(value) =>
              updateData(
                "restaurantItemPrice",
                value
              )
            }
            placeholder="12000"
          />
        </div>

        {categoryOptions.length >
          0 && (
          <Dropdown
            label="Category"
            value={
              data.restaurantItemCategory ||
              ""
            }
            options={
              categoryOptions
            }
            onChange={(value) =>
              updateData(
                "restaurantItemCategory",
                value
              )
            }
            placeholder="Select category"
          />
        )}

        <TextareaField
          label="Description"
          value={
            data.restaurantItemDescription
          }
          onChange={(value) =>
            updateData(
              "restaurantItemDescription",
              value
            )
          }
          placeholder="Grilled chicken served with chips..."
          rows={3}
        />

        <button
          type="button"
          className="secondary-action-button"
          onClick={addItem}
        >
          <Plus size={16} />

          Add menu item
        </button>

        {items.length > 0 && (
          <div className="builder-list">
            {items.map((item) => {
              const category =
                categories.find(
                  (cat) =>
                    String(
                      cat.id
                    ) ===
                    String(
                      item.categoryId
                    )
                );

              return (
                <div
                  className="builder-list-item builder-menu-item"
                  key={item.id}
                >
                  <div>
                    <strong>
                      {item.name}
                    </strong>

                    {category && (
                      <small>
                        {
                          category.name
                        }
                      </small>
                    )}

                    {item.description && (
                      <p>
                        {
                          item.description
                        }
                      </p>
                    )}
                  </div>

                  <div className="builder-item-right">
                    <strong>
                      {data.restaurantCurrency ||
                        "TZS"}{" "}
                      {Number(
                        item.price
                      ).toLocaleString()}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(
                          item.id
                        )
                      }
                    >
                      <Trash2
                        size={15}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </FormSection>

      <FormSection
        title="Ordering"
        description="Choose what customers can do after opening your menu."
      >
        <Dropdown
          label="Ordering mode"
          value={
            data.restaurantOrderingMode ||
            "menu"
          }
          options={
            orderingOptions
          }
          onChange={(value) =>
            updateData(
              "restaurantOrderingMode",
              value
            )
          }
        />

        <div className="field-helper">
          You can add full cart,
          table ordering and kitchen
          management later without
          changing the QR itself.
        </div>
      </FormSection>
    </div>
  );
}

/* =========================================
   PAYMENT BUILDER
========================================= */

function PaymentBuilder({
  data,
  updateData,
}) {
  const paymentOptions = [
    {
      value: "tanqr",
      label: "TANQR",
      description:
        "Interoperable merchant QR architecture.",
    },
    {
      value: "payment-link",
      label: "Payment Link",
      description:
        "Open a hosted payment page.",
    },
  ];

  const providerOptions = [
    {
      value: "mpesa",
      label: "M-Pesa",
    },
    {
      value: "mixx",
      label: "Mixx by Yas",
    },
    {
      value: "airtel",
      label: "Airtel Money",
    },
    {
      value: "halopesa",
      label: "HaloPesa",
    },
    {
      value: "azampesa",
      label: "AzamPesa",
    },
    {
      value: "ttcl",
      label: "TTCL Pesa",
    },
  ];

  return (
    <div className="payment-builder">
      <FormSection
        title="Payment setup"
        description="Prepare the merchant information for your payment QR."
      >
        <Dropdown
          label="Payment mode"
          value={
            data.paymentMode ||
            "tanqr"
          }
          options={
            paymentOptions
          }
          onChange={(value) =>
            updateData(
              "paymentMode",
              value
            )
          }
        />

        {data.paymentMode ===
          "tanqr" && (
          <>
            <Dropdown
              label="Preferred network"
              value={
                data.paymentProvider ||
                ""
              }
              options={
                providerOptions
              }
              onChange={(value) =>
                updateData(
                  "paymentProvider",
                  value
                )
              }
              placeholder="Select network"
            />

            <div className="form-grid">
              <Field
                label="Merchant name"
                value={
                  data.paymentMerchantName
                }
                onChange={(value) =>
                  updateData(
                    "paymentMerchantName",
                    value
                  )
                }
                placeholder="Your business name"
              />

              <Field
                label="Merchant code"
                value={
                  data.paymentMerchantCode
                }
                onChange={(value) =>
                  updateData(
                    "paymentMerchantCode",
                    value
                  )
                }
                placeholder="Merchant code"
              />
            </div>

            <div className="form-grid">
              <Field
                label="Amount (optional)"
                type="number"
                value={
                  data.paymentAmount
                }
                onChange={(value) =>
                  updateData(
                    "paymentAmount",
                    value
                  )
                }
                placeholder="10000"
              />

              <Field
                label="Reference (optional)"
                value={
                  data.paymentReference
                }
                onChange={(value) =>
                  updateData(
                    "paymentReference",
                    value
                  )
                }
                placeholder="INV-001"
              />
            </div>

            <TextareaField
              label="Payment description"
              value={
                data.paymentDescription
              }
              onChange={(value) =>
                updateData(
                  "paymentDescription",
                  value
                )
              }
              placeholder="Payment for..."
              rows={3}
            />

            <div className="payment-notice">
              <strong>
                TANQR integration
              </strong>

              <p>
                This form prepares the
                merchant configuration.
                Production payment
                processing requires a
                legitimate TANQR/PSP,
                acquirer or payment
                provider integration.
              </p>
            </div>
          </>
        )}

        {data.paymentMode ===
          "payment-link" && (
          <Field
            label="Payment URL"
            value={
              data.paymentUrl
            }
            onChange={(value) =>
              updateData(
                "paymentUrl",
                value
              )
            }
            placeholder="https://example.com/pay/..."
            type="url"
          />
        )}
      </FormSection>
    </div>
  );
}

/* =========================================
   MAIN FORM
========================================= */

function QRForm({
  type,
  data,
  setData,
  updateData: externalUpdateData,
}) {
  function updateData(
    field,
    value
  ) {
    if (externalUpdateData) {
      externalUpdateData(
        field,
        value
      );

      return;
    }

    setData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /* =======================================
     PERSONAL PROFILE
  ======================================= */

  if (type === "profile") {
    return (
      <div className="qr-form">
        <FormSection
          title="Profile information"
          description="Create a professional digital identity that people can open from your QR code."
        >
          <div className="form-grid">
            <Field
              label="Full name"
              value={data.name}
              onChange={(value) =>
                updateData(
                  "name",
                  value
                )
              }
              placeholder="Benjamin George Mbega"
            />

            <Field
              label="Professional title"
              value={data.title}
              onChange={(value) =>
                updateData(
                  "title",
                  value
                )
              }
              placeholder="Data Engineer"
            />
          </div>

          <Field
            label="Organization"
            value={
              data.organization
            }
            onChange={(value) =>
              updateData(
                "organization",
                value
              )
            }
            placeholder="Company or organization"
          />

          <CountryPhoneField
            country={
              data.phoneCountry ||
              "TZ"
            }
            phone={data.phone}
            onCountryChange={(
              value
            ) =>
              updateData(
                "phoneCountry",
                value
              )
            }
            onPhoneChange={(value) =>
              updateData(
                "phone",
                value
              )
            }
          />

          <Field
            label="Email"
            type="email"
            value={data.email}
            onChange={(value) =>
              updateData(
                "email",
                value
              )
            }
            placeholder="you@example.com"
          />

          <Field
            label="Website"
            type="url"
            value={data.website}
            onChange={(value) =>
              updateData(
                "website",
                value
              )
            }
            placeholder="https://example.com"
          />

          <Field
            label="Location"
            value={
              data.location
            }
            onChange={(value) =>
              updateData(
                "location",
                value
              )
            }
            placeholder="Dar es Salaam, Tanzania"
          />
        </FormSection>

        <FormSection
          title="WhatsApp"
          description="Give people a direct way to start a conversation."
        >
          <CountryPhoneField
            label="WhatsApp number"
            country={
              data.whatsappCountry ||
              "TZ"
            }
            phone={
              data.whatsapp
            }
            onCountryChange={(
              value
            ) =>
              updateData(
                "whatsappCountry",
                value
              )
            }
            onPhoneChange={(value) =>
              updateData(
                "whatsapp",
                value
              )
            }
          />

          <TextareaField
            label="Default message"
            value={
              data.whatsappMessage
            }
            onChange={(value) =>
              updateData(
                "whatsappMessage",
                value
              )
            }
            placeholder="Hello, I found your digital card..."
            rows={3}
          />
        </FormSection>

        <FormSection
          title="Social profile"
          description="Add one social profile to your digital identity."
        >
          <SocialProfileField
            platform={
              data.socialPlatform ||
              "instagram"
            }
            username={
              data.socialUsername
            }
            onPlatformChange={(
              value
            ) =>
              updateData(
                "socialPlatform",
                value
              )
            }
            onUsernameChange={(value) =>
              updateData(
                "socialUsername",
                value
              )
            }
          />
        </FormSection>
      </div>
    );
  }

  /* =======================================
     PHONE
  ======================================= */

  if (type === "phone") {
    return (
      <div className="qr-form">
        <FormSection
          title="Phone number"
          description="Create a QR code that opens the phone dialer."
        >
          <CountryPhoneField
            country={
              data.phoneCountry ||
              "TZ"
            }
            phone={data.phone}
            onCountryChange={(
              value
            ) =>
              updateData(
                "phoneCountry",
                value
              )
            }
            onPhoneChange={(value) =>
              updateData(
                "phone",
                value
              )
            }
          />
        </FormSection>
      </div>
    );
  }

  /* =======================================
     WHATSAPP
  ======================================= */

  if (type === "whatsapp") {
    return (
      <div className="qr-form">
        <FormSection
          title="WhatsApp"
          description="Open a WhatsApp conversation with a pre-filled message."
        >
          <CountryPhoneField
            label="WhatsApp number"
            country={
              data.whatsappCountry ||
              "TZ"
            }
            phone={
              data.whatsapp
            }
            onCountryChange={(
              value
            ) =>
              updateData(
                "whatsappCountry",
                value
              )
            }
            onPhoneChange={(value) =>
              updateData(
                "whatsapp",
                value
              )
            }
          />

          <TextareaField
            label="Message"
            value={
              data.whatsappMessage
            }
            onChange={(value) =>
              updateData(
                "whatsappMessage",
                value
              )
            }
            placeholder="Hello, I found you through your QR code."
          />
        </FormSection>
      </div>
    );
  }

  /* =======================================
     WEBSITE
  ======================================= */

  if (type === "website") {
    return (
      <div className="qr-form">
        <FormSection
          title="Website"
          description="Send visitors directly to a website or landing page."
        >
          <Field
            label="Website URL"
            type="url"
            value={data.website}
            onChange={(value) =>
              updateData(
                "website",
                value
              )
            }
            placeholder="https://example.com"
          />
        </FormSection>
      </div>
    );
  }

  /* =======================================
     SOCIAL
  ======================================= */

  if (type === "social") {
    return (
      <div className="qr-form">
        <FormSection
          title="Social profile"
          description="Choose the platform and enter only the username or handle."
        >
          <SocialProfileField
            platform={
              data.socialPlatform ||
              "instagram"
            }
            username={
              data.socialUsername
            }
            onPlatformChange={(
              value
            ) =>
              updateData(
                "socialPlatform",
                value
              )
            }
            onUsernameChange={(value) =>
              updateData(
                "socialUsername",
                value
              )
            }
          />
        </FormSection>
      </div>
    );
  }

  /* =======================================
     EMAIL
  ======================================= */

  if (type === "email") {
    return (
      <div className="qr-form">
        <FormSection
          title="Email"
          description="Open the visitor's email application with optional subject and message."
        >
          <Field
            label="Email address"
            type="email"
            value={data.email}
            onChange={(value) =>
              updateData(
                "email",
                value
              )
            }
            placeholder="hello@example.com"
          />

          <Field
            label="Subject"
            value={
              data.emailSubject
            }
            onChange={(value) =>
              updateData(
                "emailSubject",
                value
              )
            }
            placeholder="Hello"
          />

          <TextareaField
            label="Message"
            value={
              data.emailMessage
            }
            onChange={(value) =>
              updateData(
                "emailMessage",
                value
              )
            }
            placeholder="Write your message..."
          />
        </FormSection>
      </div>
    );
  }

  /* =======================================
     WIFI
  ======================================= */

  if (type === "wifi") {
    const securityOptions = [
      {
        value: "WPA",
        label: "WPA / WPA2 / WPA3",
      },
      {
        value: "WEP",
        label: "WEP",
      },
      {
        value: "nopass",
        label: "No password",
      },
    ];

    return (
      <div className="qr-form">
        <FormSection
          title="Wi-Fi access"
          description="Let visitors connect to a Wi-Fi network by scanning the QR code."
        >
          <Field
            label="Network name"
            value={
              data.wifiName
            }
            onChange={(value) =>
              updateData(
                "wifiName",
                value
              )
            }
            placeholder="My Wi-Fi"
          />

          <Dropdown
            label="Security"
            value={
              data.wifiSecurity ||
              "WPA"
            }
            options={
              securityOptions
            }
            onChange={(value) =>
              updateData(
                "wifiSecurity",
                value
              )
            }
          />

          {data.wifiSecurity !==
            "nopass" && (
            <Field
              label="Wi-Fi password"
              type="password"
              value={
                data.wifiPassword
              }
              onChange={(value) =>
                updateData(
                  "wifiPassword",
                  value
                )
              }
              placeholder="Enter Wi-Fi password"
            />
          )}
        </FormSection>
      </div>
    );
  }

  /* =======================================
     LOCATION
  ======================================= */

  if (type === "location") {
    return (
      <div className="qr-form">
        <FormSection
          title="Location"
          description="Create a QR code that opens this location on a map."
        >
          <LocationField
            data={data}
            updateData={
              updateData
            }
          />
        </FormSection>
      </div>
    );
  }

  /* =======================================
     CONTACT
  ======================================= */

  if (type === "contact") {
    return (
      <div className="qr-form">
        <FormSection
          title="Contact card"
          description="Create a standard vCard that can be saved directly to a phone."
        >
          <div className="form-grid">
            <Field
              label="Full name"
              value={data.name}
              onChange={(value) =>
                updateData(
                  "name",
                  value
                )
              }
              placeholder="Benjamin George Mbega"
            />

            <Field
              label="Job title"
              value={data.title}
              onChange={(value) =>
                updateData(
                  "title",
                  value
                )
              }
              placeholder="Data Engineer"
            />
          </div>

          <Field
            label="Organization"
            value={
              data.organization
            }
            onChange={(value) =>
              updateData(
                "organization",
                value
              )
            }
            placeholder="Company name"
          />

          <CountryPhoneField
            country={
              data.phoneCountry ||
              "TZ"
            }
            phone={data.phone}
            onCountryChange={(
              value
            ) =>
              updateData(
                "phoneCountry",
                value
              )
            }
            onPhoneChange={(value) =>
              updateData(
                "phone",
                value
              )
            }
          />

          <Field
            label="Email"
            type="email"
            value={data.email}
            onChange={(value) =>
              updateData(
                "email",
                value
              )
            }
            placeholder="hello@example.com"
          />

          <Field
            label="Website"
            type="url"
            value={data.website}
            onChange={(value) =>
              updateData(
                "website",
                value
              )
            }
            placeholder="https://example.com"
          />

          <Field
            label="Location"
            value={
              data.location
            }
            onChange={(value) =>
              updateData(
                "location",
                value
              )
            }
            placeholder="Dar es Salaam, Tanzania"
          />
        </FormSection>
      </div>
    );
  }

  /* =======================================
     TEXT
  ======================================= */

  if (type === "text") {
    return (
      <div className="qr-form">
        <FormSection
          title="Plain text"
          description="Encode any text directly into the QR code."
        >
          <TextareaField
            label="Text"
            value={data.text}
            onChange={(value) =>
              updateData(
                "text",
                value
              )
            }
            placeholder="Enter the text you want to share..."
            rows={7}
          />
        </FormSection>
      </div>
    );
  }

  /* =======================================
     RESTAURANT
  ======================================= */

  if (type === "menu") {
    return (
      <div className="qr-form">
        <RestaurantMenuBuilder
          data={data}
          updateData={
            updateData
          }
        />
      </div>
    );
  }

  /* =======================================
     PAYMENT
  ======================================= */

  if (type === "payment") {
    return (
      <div className="qr-form">
        <PaymentBuilder
          data={data}
          updateData={
            updateData
          }
        />
      </div>
    );
  }

  /* =======================================
     FALLBACK
  ======================================= */

  return (
    <div className="qr-form">
      <FormSection
        title="QR content"
        description="Enter the information for your QR code."
      >
        <Field
          label="Content"
          value={data.text}
          onChange={(value) =>
            updateData(
              "text",
              value
            )
          }
          placeholder="Enter content..."
        />
      </FormSection>
    </div>
  );
}

export default QRForm;