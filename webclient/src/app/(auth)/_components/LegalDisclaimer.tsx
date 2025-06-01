import React from "react";

const LegalDisclaimer = () => {
  return (
    <div className="max-w-[300px] text-sm text-justify text-[var(--text-secondary)]">
      By continuing, you agree to our{" "}
      <a href="/terms" className="underline">
        Terms & Conditions
      </a>{" "}
      and{" "}
      <a href="/privacy" className="underline">
        Privacy Policy
      </a>
      .
    </div>
  );
};

export default LegalDisclaimer;
