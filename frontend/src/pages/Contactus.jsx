import React from 'react';

function Contactus() {
  return (
    <div className="w-96 max-w-5xl p-5 bg-black shadow-md rounded-lg mx-auto my-10">
      <h1 className="text-center text-aliceblue text-4xl mb-10">Contact Us</h1>
      <div className="flex flex-col items-center gap-5">
        <div className="w-full max-w-2xl p-5 bg-gray-800 text-white rounded-lg">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-bold mb-1">Name:</label>
              <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded-md text-black" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold mb-1">Email:</label>
              <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded-md text-black" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="font-bold mb-1">Message:</label>
              <textarea id="message" name="message" rows="5" className="w-full p-2 border border-gray-300 rounded-md text-black" required></textarea>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="p-2 bg-green-600 text-white rounded-md self-start hover:bg-green-700">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contactus;




