import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

function Dropdown({
  label,
  value,
  options = [],
  onChange,
  placeholder = "Select...",
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="dropdown-field" ref={dropdownRef}>
      {label && <label>{label}</label>}

      <button
        type="button"
        className={`dropdown-trigger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <div className="dropdown-value">
          {selectedOption?.icon && (
            <span className="dropdown-option-icon">
              <selectedOption.icon size={17} strokeWidth={1.8} />
            </span>
          )}

          <span>
            {selectedOption?.label || placeholder}
          </span>
        </div>

        <ChevronDown
          size={17}
          className={`dropdown-chevron ${open ? "rotate" : ""}`}
        />
      </button>

      {open && (
        <div className="dropdown-menu">
          {options.map((option) => {
            const Icon = option.icon;

            return (
              <button
                type="button"
                key={option.value}
                className={`dropdown-option ${
                  value === option.value ? "selected" : ""
                }`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <div className="dropdown-option-content">
                  {Icon && (
                    <span className="dropdown-option-icon">
                      <Icon size={17} strokeWidth={1.8} />
                    </span>
                  )}

                  <div>
                    <strong>{option.label}</strong>

                    {option.description && (
                      <small>{option.description}</small>
                    )}
                  </div>
                </div>

                {value === option.value && (
                  <Check size={16} strokeWidth={2} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dropdown;