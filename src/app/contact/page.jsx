"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && subject && email && message) {
      toast.success("Email sent successfully");
      setName("");
      setSubject("");
      setEmail("");
      setMessage("");
      setEmailSent(true);
    } else {
      toast.error("Please fill in all input fields");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let&apos;s Keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src="/contact.png"
            alt="Contact Image"
            fill={true}
            className={styles.image}
          />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subject"
            className={styles.input}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className={styles.textArea}
            placeholder="Message"
            cols="30"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit" className={styles.button}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
