import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to a the home landing page - you MUST have a slug of 'home' in CMS entries
    router.push('/home'); 
  }, [router]);

  return null; 
};

export default Index;
