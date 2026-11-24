import React from "react";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { safeRedirectPath } from '../components/utils/links';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/route`, {
        body: JSON.stringify({ password }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (response.status === 200) {
        setPasswordIncorrect(false);
        // /api/route sets the httpOnly access cookie.
        router.replace(safeRedirectPath(router.query.redirect));
      } else {
        setPasswordIncorrect(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setPasswordIncorrect(true);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white password-prompt-dialog p-auto">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        <label htmlFor="password" className="mb-2">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 border rounded"
          required
        />
        <button type="submit"  className="p-2 text-white bg-blue-500 rounded">
          Submit
        </button>
      </form>
      {passwordIncorrect && <p className="mt-2 text-red-500">Password is incorrect</p>}
    </div>
  );
};

export default LoginPage;