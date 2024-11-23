// // app/page.js

// "use client";

// import React, { useState, useEffect } from 'react';
// import PasswordPromptDialog from '../../components/security/password-dialog';

// const ProtectedPage = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const res = await fetch('/api/check-auth');
//       if (res.status === 200) {
//         setIsAuthenticated(true);
//       }
//     };
//     checkAuth();
//   }, []);

//   if (!isAuthenticated) {
//     return <PasswordPromptDialog />;
//   }

//   return (
//     <div>
//       <h1>Protected Content</h1>
//       <p>This content is protected by a password.</p>
//     </div>
//   );
// };

// export default ProtectedPage;
