"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavBar from "../components/navbar";
import EmailControls from "../components/emailControl";
import EmailList from "../components/emailList";
import axios from "axios";

const home = () => {
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!data) {
      router.push("/login");
    }
  }, [data]);

  const [emails, setEmails] = useState([]);
  const [numEmails, setNumEmails] = useState(15);
  const [showClassifications, setShowClassifications] = useState(false);

  useEffect(() => {
    // The purpose of this function is to skip classification of emails that have already been categorized.
    // When new emails arrive, they will be stored in local storage while retaining
    // the categories of previously classified emails.

    const fetchEmails = async () => {
      // To manage rate limit constraints, I have created two versions of each email:
      // one is the original from the email API to identify updated emails,
      // and the other is a trimmed version that will be sent to GPT for classification.
      try {
        console.log("Fetching emails...");
        let emails = localStorage.getItem("emails")
          ? JSON.parse(localStorage.getItem("emails"))
          : [];
        const response = await axios.post(`http://localhost:4000/email`, {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        // Check if the emails stored in local storage differ from the newly fetched emails
        if (emails.length !== 0) {
          if (JSON.stringify(emails) !== JSON.stringify(response.data.emails)) {
            // Update local storage with the new emails
            localStorage.setItem(
              "emails",
              JSON.stringify(response.data.emails)
            );

            let trimmedEmails = JSON.parse(
              localStorage.getItem("trimmedEmails")
            );
            let updtrim = [];

            // Compare and update the list of trimmed emails for classification
            for (let i = 0; i < response.data.emails.length; i++) {
              if (
                emails[i].senderEmail !== response.data.emails[i].senderEmail
              ) {
                updtrim.push(response.data.trimmedEmails[i]);
              } else {
                break;
              }
            }

            // Preserve the classification of already processed emails
            for (
              let i = updtrim.length;
              i < response.data.trimmedEmails.length;
              i++
            ) {
              updtrim.push(trimmedEmails[i]);
            }

            console.log(updtrim);
            setEmails(updtrim || []);
            localStorage.setItem("trimmedEmails", JSON.stringify(updtrim));
            console.log("showing unsaved trim");
          } else {
            let trimmedEmails = JSON.parse(
              localStorage.getItem("trimmedEmails")
            );
            setEmails(trimmedEmails || []);
            console.log("showing saved trim");
          }
        } else {
          // If no emails are stored, save the fetched emails and their trimmed versions
          localStorage.setItem("emails", JSON.stringify(response.data.emails));
          localStorage.setItem(
            "trimmedEmails",
            JSON.stringify(response.data.trimmedEmails)
          );
          setEmails(response.data.trimmedEmails || []);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, [data]);

  const handleSelectEmails = (count) => {
    // Update the number of emails to be displayed
    setNumEmails(count);
    let trimmedEmails = JSON.parse(localStorage.getItem("trimmedEmails"));
    updateEmailsToShow(trimmedEmails, count);
  };

  const updateEmailsToShow = (trimmedEmails, count) => {
    // Update the state with the specified number of emails to show
    const emailsToShow = trimmedEmails.slice(0, count);
    setEmails(emailsToShow);
  };

  const handleClassify = async () => {
    // Classify the trimmed emails using the GPT model
    let emails = JSON.parse(localStorage.getItem("trimmedEmails"));
    try {
      const response = await axios.post("http://localhost:4000/classify", {
        emails,
        apikey: localStorage.getItem("apikey"),
      });

      // Update local storage and state with the classified emails
      localStorage.setItem("trimmedEmails", JSON.stringify(response.data));
      const emailsToShow = response.data.slice(0, numEmails);
      setEmails(emailsToShow);
      setShowClassifications(true);
      console.log("Classification response:", response.data);
    } catch (error) {
      console.error("Error classifying emails:", error);
    }
  };

  return (
    <>
      <NavBar />
      <EmailControls
        onSelectEmails={handleSelectEmails}
        onClassify={handleClassify}
      />
      <EmailList showClassifications={showClassifications} emails={emails} />
    </>
  );
};

export default home;
