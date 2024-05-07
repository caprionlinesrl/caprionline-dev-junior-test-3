import React from "react";

const Heading:React.FC = props => {
	return (
		<div className="mx-auto max-w-screen-sm text-center">
			<h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
				Movie Collection
			</h1>

			<p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
				Explore the whole collection of movies
			</p>
		</div>
	);
};

export default Heading;