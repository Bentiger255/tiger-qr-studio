import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

function Dropdown({
  label,
  value,
  options = [],
  onChange,
  placeholder = "Select...",
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState(null);
  const fieldRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const optionRefs = useRef([]);
  const generatedId = useId();
  const triggerId = `dropdown-trigger-${generatedId}`;
  const labelId = `dropdown-label-${generatedId}`;
  const menuId = `dropdown-menu-${generatedId}`;
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;

  const updatePosition = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const viewportPadding = 12;
    const width = Math.min(rect.width, window.innerWidth - viewportPadding * 2);
    const left = Math.max(
      viewportPadding,
      Math.min(rect.left, window.innerWidth - width - viewportPadding)
    );
    const estimatedHeight = Math.min(320, Math.max(52, options.length * 52));
    const below = window.innerHeight - rect.bottom - viewportPadding;
    const above = rect.top - viewportPadding;
    const placeAbove = below < Math.min(estimatedHeight, 220) && above > below;
    const available = Math.max(
      120,
      Math.min(320, (placeAbove ? above : below) - 8)
    );

    setPosition({
      left,
      top: placeAbove
        ? Math.max(viewportPadding, rect.top - Math.min(estimatedHeight, available) - 6)
        : rect.bottom + 6,
      width,
      maxHeight: available,
    });
  };

  useLayoutEffect(() => {
    if (!open) return undefined;

    updatePosition();

    const handleOutsidePointer = (event) => {
      if (
        !fieldRef.current?.contains(event.target) &&
        !menuRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    document.addEventListener("pointerdown", handleOutsidePointer);
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      document.removeEventListener("pointerdown", handleOutsidePointer);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, options.length]);

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  const openMenu = (index = selectedIndex >= 0 ? selectedIndex : 0) => {
    if (!options.length) return;
    setActiveIndex(Math.max(0, Math.min(index, options.length - 1)));
    setOpen(true);
  };

  const chooseOption = (option) => {
    onChange?.(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMenu(selectedIndex >= 0 ? selectedIndex : 0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(selectedIndex >= 0 ? selectedIndex : options.length - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      openMenu(0);
    } else if (event.key === "End") {
      event.preventDefault();
      openMenu(options.length - 1);
    }
  };

  const handleOptionKeyDown = (event, index) => {
    let nextIndex = index;

    if (event.key === "ArrowDown") nextIndex = (index + 1) % options.length;
    else if (event.key === "ArrowUp") nextIndex = (index - 1 + options.length) % options.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = options.length - 1;
    else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    } else {
      return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
  };

  return (
    <div className="dropdown-field" ref={fieldRef}>
      {label && (
        <label className="dropdown-label" id={labelId} htmlFor={triggerId}>
          {label}
        </label>
      )}

      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        className={`dropdown-trigger ${open ? "is-open" : ""}`}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-labelledby={label ? `${labelId} ${triggerId}` : undefined}
        disabled={options.length === 0}
      >
        <span className="dropdown-value">
          {selectedOption?.icon && (
            <span className="dropdown-option-icon" aria-hidden="true">
              <selectedOption.icon size={17} strokeWidth={1.8} />
            </span>
          )}
          <span className="dropdown-selected-label">
            {selectedOption?.label || placeholder}
          </span>
        </span>
        <ChevronDown size={17} className={`dropdown-chevron ${open ? "rotate" : ""}`} aria-hidden="true" />
      </button>

      {open && position && createPortal(
        <div
          ref={menuRef}
          id={menuId}
          className="dropdown-menu"
          role="listbox"
          aria-labelledby={label ? labelId : triggerId}
          style={{
            left: position.left,
            top: position.top,
            width: position.width,
            maxHeight: position.maxHeight,
          }}
        >
          {options.map((option, index) => {
            const Icon = option.icon;
            const selected = value === option.value;

            return (
              <button
                ref={(node) => { optionRefs.current[index] = node; }}
                type="button"
                role="option"
                aria-selected={selected}
                tabIndex={activeIndex === index ? 0 : -1}
                key={option.value}
                className={`dropdown-option ${selected ? "selected" : ""} ${activeIndex === index ? "is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
                onClick={() => chooseOption(option)}
              >
                <span className="dropdown-option-content">
                  {Icon && (
                    <span className="dropdown-option-icon" aria-hidden="true">
                      <Icon size={17} strokeWidth={1.8} />
                    </span>
                  )}
                  <span className="dropdown-option-copy">
                    <strong>{option.label}</strong>
                    {option.description && <small>{option.description}</small>}
                  </span>
                </span>
                {selected && <Check size={16} strokeWidth={2} aria-hidden="true" />}
              </button>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
}

export default Dropdown;
