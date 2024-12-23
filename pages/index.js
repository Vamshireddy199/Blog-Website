// pages/index.js
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  const handleAdminPageClick = () => {
    // Perform authentication check here (optional)
    router.push('/admin');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleAdminPageClick}>Go to Admin Page</button>
    </div>
  );
};

export default HomePage;
