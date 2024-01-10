import React from 'react';
import WelcomeBanner from 'components/page/dashboard/WelcomeBanner';

function Home() {

  return (
    <main>
      <div className="px-4 py-4 w-full mx-auto">
        <WelcomeBanner />
      </div>
    </main>
  );
}

export default Home;