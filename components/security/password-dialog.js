// app/components/PasswordPromptDialog.js

"use client";

import React, { useState } from 'react';

const PasswordPromptDialog = () => {
  const [password, setPassword] = useState('');
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api`, {
        body: JSON.stringify({ password }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (response.status !== 200) {
        setPasswordIncorrect(true);
        setLoading(false);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
      setPasswordIncorrect(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-white password-prompt-dialog p-auto">
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default PasswordPromptDialog;
