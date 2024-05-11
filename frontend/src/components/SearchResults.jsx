import React from "react";

const SearchResults = ({ data }) => {
	const renderResults = () => {
		if (!data || !data.length) {
			return <div className="results">No search results found.</div>;
		}

		return (
			<div className="results">
				{data.map((item, index) => (
					<div className="result-item" key={index}>
						<div className="songresult">
							<img src={item.img} alt="Album cover" />
							<div className="search-details">
								<h4 className="element-name">{item.name}</h4>
								<p className="artist-year">{`${item.artist} - ${item.year}`}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	};

	return renderResults();
};

export default SearchResults;
