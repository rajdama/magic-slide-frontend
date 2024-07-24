// components/EmailList.js
"use client";
import React from "react";
import EmailCard from "./emailCard";

const EmailList = ({ emails, showClassifications }) => {
  // const emailList = Array.isArray(emails) ? emails : [];
  return (
    <div className="max-w-2xl mx-auto mt-5">
      {Array.isArray(emails) && emails.length > 0 ? (
        emails.map((email, index) => (
          <EmailCard
            showClassifications={showClassifications}
            key={index}
            email={email}
          />
        ))
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default EmailList;
