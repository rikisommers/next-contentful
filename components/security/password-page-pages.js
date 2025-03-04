import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion } from "../../utils/motion";;
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";

export default function PagesPasswordPage({ children, locked }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loginCookie = Cookies.get(process.env.PASSWORD_COOKIE_NAME);
    console.log("Login cookie:", loginCookie);
    setIsLoggedIn(!!loginCookie);
    setIsLoading(false);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/route`, {
        body: JSON.stringify({ password }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      console.log("Response Status:", response.status);
      const data = await response.json();
      console.log("Response Data:", data);

      if (response.status !== 200) {
        setPasswordIncorrect(true);
        setLoading(false);
      } else {
        setPasswordIncorrect(false);
        setIsLoggedIn(true); // Update the login state
        // Optionally, you can check the cookie here if needed
      }
    } catch (error) {
      console.error("Error:", error);
      setPasswordIncorrect(true);
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...tttt</div>; // Or any loading indicator
  }

  if (!isLoggedIn && locked) {
    return (
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full h-screen bg-white password-prompt-dialog p-auto"
        style={{
          backgroundColor: "var(--background-color)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        <div className="flex flex-col w-panel-sm">
          <AnimatedElement type={AnimStyleEl.FADEIN}>
            <div className="flex w-full gap-1">
              <input
                className="flex-grow p-4 font-normal border-2 rounded-xl text-md"
                style={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--text-color-inv)",
                  borderColor: "var(--accent)",
                }}
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--text-color)",
                }}
                className="relative flex items-center px-4 py-3 text-xs uppercase cursor-pointer rounded-xl"
              >
                Submit
              </button>
            </div>
          </AnimatedElement>
          {passwordIncorrect && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="py-2 text-sm text-left"
              style={{
                color: "var(--accent-pri)",
                borderColor: "var(--accent-sec)",
              }}
            >
              Password is incorrect
            </motion.p>
          )}
        </div>
      </motion.form>
    );
  } else {
    // User is authenticated, render all children (the entire slug page content)
    return (
      <>
        {children} {/* Render the entire slug page content here */}
      </>
    );
  }
}

// If you need server-side authentication, you can use getServerSideProps
export async function getServerSideProps(context) {
  const { req } = context;
  const loginCookie = req.cookies[process.env.PASSWORD_COOKIE_NAME];
  console.log("cookie", loginCookie);
  console.log("is logged in", isLoggedIn);

  if (!loginCookie) {
    return {
      props: {
        isLoggedIn: false,
        content: null,
      },
    };
  }

  // User is authenticated, fetch and return content
  const content = await fetchContent(); // Implement this function to fetch your content

  return {
    props: {
      isLoggedIn: true,
      content,
    },
  };
}
