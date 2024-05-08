// components/PasswordPromptDialog.js
"use client";

import React, { useState } from 'react';

const PasswordPromptDialog = ({ onSubmit }) => {
 const [password, setPassword] = useState('');
 const [passwordIncorrect, setPasswordIncorrect] = useState(false)
 const [loading, setLoading] = useState(false);

 const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);
  fetch(`/api`, {
   body: JSON.stringify({password}),
   headers: {"Content-Type": "application/json"},
   method: "post",
  })
  .then(response => {
   if (response.status !== 200) {
    setPasswordIncorrect(true);
    setLoading(false);
   } else {
    window.location.reload();
   }
  });
 }; 

 return (
  <div className="password-prompt-dialog">
    <form onSubmit={handleSubmit}>
      <label htmlFor="password">Password:</label>
      <input
       type="password"
       id="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  </div>
 );
};

export default PasswordPromptDialog;
