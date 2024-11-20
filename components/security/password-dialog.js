// app/components/PasswordPromptDialog.js

"use client";

import React, { Children, useState } from 'react';

const PasswordPromptDialog = ({children}) => {
  const [password, setPassword] = useState('');
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/route`, {
        body: JSON.stringify({ password }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      console.log('Response Status:', response.status);
      const data = await response.json();
      console.log('Response Data:', data);

      if (response.status !== 200) {
        setPasswordIncorrect(true);
        setLoading(false);
      } else {
       onLoginSuccess(); // Call the onLoginSuccess callback
       //window.location.reload(); // Optionally reload the page
      }
    } catch (error) {
      console.error('Error:', error);
      setPasswordIncorrect(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white password-prompt-dialog p-auto">
      <form onSubmit={handleSubmit}>
        <h1>PROMPT DIALOG {password} </h1>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>Submit</button>
      </form>
      {passwordIncorrect && <p>Password is incorrect</p>}
      {children}
    </div>
  );
};

export default PasswordPromptDialog;

