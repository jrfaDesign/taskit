import React from "react";

type Props = {
  url: string;
  message: string;
  linkText: string;
};
const AuthRedirectMessage = ({ url, message, linkText }: Props) => {
  return (
    <div className="text-md text-center">
      {message}{" "}
      <a href={url} className="underline font-bold text-primary">
        {linkText}
      </a>
    </div>
  );
};

export default AuthRedirectMessage;
