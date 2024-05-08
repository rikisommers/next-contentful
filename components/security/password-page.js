import { cookies } from 'next/headers'
import PasswordPromptDialog from './password-dialog';
export default function PasswordPage({ content }) {
const cookiesStore = cookies();
const loginCookies = cookiesStore.get(process.env.PASSWORD_COOKIE_NAME);
const isLoggedIn = !!loginCookies?.value;


if (!isLoggedIn) {
    return <PasswordPromptDialog />;
  } else {
  // User is authenticated, load data and render content
    return(
        {content}
    )
  // …
  }


}