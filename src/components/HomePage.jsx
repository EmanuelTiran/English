import React from 'react';

function HomePage() {
  return (
<div
  className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center text-center px-4"
  style={{ backgroundImage: "url('/images/image.png')" }}
>
  <div className="bg-black bg-opacity-50 p-6 rounded-xl max-w-3xl">
    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
      Welcome to Fun English!
    </h1>
  </div>
</div>


  );
}

export default HomePage;