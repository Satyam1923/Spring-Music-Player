import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Contributors() {
  const [contributors, setContributors] = useState([]);
  useEffect(() => {
    async function Contributors() {
      try {
        const response = await axios.get(
          'https://api.github.com/repos/Satyam1923/Spring-Music-Player/contributors'
        );
        setContributors(response.data);
      } catch (error) {
        console.error('Error in fetching contributors:', error);
      }
    }
    Contributors();
  }, []);
  return (
    <div className="w-full h-full mb-8 pt-8 overflow-hidden bg-black">
      <h1 className="text-center text-4xl font-semibold text-gray-200 mb-8 uppercase">
        Contributors
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {contributors.map((contributor) => (
          <div
            key={contributor.id}
            className="w-full md:w-1/3 lg:w-1/4 flex flex-col items-center bg-gray-800 border border-gray-300 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <a
              href={contributor.html_url}
              className="block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            </a>
            <h2 className="text-lg font-medium text-gray-100 mb-2">
              {contributor.login}
            </h2>
            <p className="text-gray-300">
              Contributions: {contributor.contributions}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contributors;










