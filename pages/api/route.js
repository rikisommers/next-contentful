// api/route.js
import { serialize } from "cookie";

// export default async function POST(request, params) {

//   console.log('PAGE_PASSWORD:', process.env.PAGE_PASSWORD);
//   console.log('PASSWORD_COOKIE_NAME:', process.env.PASSWORD_COOKIE_NAME);

//   console.log('POST request received'); // Log when the function is called
//   try {
//     const data = await request.json();
//     console.log('Received data:', data); // Log the received data

//     const password = data.password;
//     const cookie = serialize(process.env.PASSWORD_COOKIE_NAME, "true", {
//       httpOnly: true,
//       path: "/",
//     });

//     if (process.env.PAGE_PASSWORD !== password) {
//       console.log('Incorrect password');
//       return new Response("incorrect password", {
//         status: 401,
//       });
//     }
//     console.log('Correct password');

//     return new Response("password correct", {
//       status: 200,
//       headers: {
//         "Set-Cookie": cookie,
//       },
//     });
//   } catch (error) {
//     console.error('Error processing request:', error); // Log any errors
//     return new Response("Internal Server Error", {
//       status: 500,
//     });
//   }
// }

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body; // Access the parsed JSON data directly from req.body
      console.log('Received data:', data); // Log the received data

      const password = data.password;


      if (process.env.PAGE_PASSWORD !== password) {
        console.log('Incorrect password');
        return res.status(401).json({ message: "incorrect password you fool" }); // Use res to send the response
      }
      
      if (process.env.PAGE_PASSWORD === password) {
        console.log('Correct password');
        const cookie = serialize(process.env.PASSWORD_COOKIE_NAME, "true", {
         // httpOnly: true,
          path: "/",
        });
        res.setHeader('Set-Cookie', cookie); // Set the cookie in the response
        return res.status(200).json({ message: "password correct yaaaay" });
      }


    } catch (error) {
      console.error('Error processing request:', error); // Log any errors
      return res.status(500).json({ message: "Internal Server Error" }); // Handle internal server errors
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed Not Allowed` }); // Handle unsupported methods
  }
}