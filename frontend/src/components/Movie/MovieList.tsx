import React        from "react";
import { Spinner }  from "flowbite-react";

interface MovieListProps {
	loading:boolean,
	children:any
}

const MovieList:React.FC<MovieListProps> = props => {
	if (props.loading) {
		return (
			<div className="text-center">
				<Spinner size="xl" />
			</div>
		);
	}

	return (
		<div className="grid gap-4 md:gap-y-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
			{props.children}
		</div>
	);
};

export default MovieList;