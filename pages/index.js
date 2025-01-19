import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to a specific landing page
    router.push('/home'); // Replace with your desired landing page slug
  }, [router]);

  return null; // You can also return a loading spinner or message if needed
};

export default Index;
