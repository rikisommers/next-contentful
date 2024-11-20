import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import PasswordPromptDialog from './password-dialog';

export default function PagesPasswordPage({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loginCookie = Cookies.get('hasAccess');
    console.log('Login cookie:', loginCookie);
    setIsLoggedIn(!!loginCookie);
    setIsLoading(false);
  }, []);

  console.log('Is user logged in:', isLoggedIn); // Log the login state

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  if (!isLoggedIn) {
    return <PasswordPromptDialog onLoginSuccess={() => setIsLoggedIn(true)} />;
  } else {
    // User is authenticated, render children
    return <>
    
    <h1>it worked</h1>
    {children}</>;
  }
}

// If you need server-side authentication, you can use getServerSideProps
export async function getServerSideProps(context) {
  const { req } = context;
  const loginCookie = req.cookies[process.env.PASSWORD_COOKIE_NAME];
  console.log('cookie',loginCookie)
  console.log('is logged in',isLoggedIn)


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