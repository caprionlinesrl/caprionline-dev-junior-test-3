import React                from "react";
import { Button, Rating }   from "flowbite-react";
import { MovieInterface } from "../../api/interface/movieInterface";

const MovieItem:React.FC<MovieInterface> = props => {
	return (
		<div className="flex flex-col w-full h-full rounded-lg shadow-md lg:max-w-sm">
			<div className="grow">
				<img
					className="object-cover w-full h-60 md:h-80"
					src={props.imageUrl}
					alt={props.title}
					loading="lazy"
				/>
			</div>
			<div className="grow flex flex-col h-full p-3">
				<div className="grow mb-3 last:mb-0">
					{props.year || props.rating
						? <div className="flex justify-between align-middle text-gray-900 text-xs font-medium mb-2">
							<span>{props.year}</span>

							{props.rating
								? <Rating>
									<Rating.Star />

									<span className="ml-0.5">
										{props.rating}
									</span>
								</Rating>
								: null
							}
						</div>
						: null
					}
					<h3 className="text-gray-900 text-lg leading-tight font-semibold mb-1">
						{props.title}
					</h3>
					<p className="text-gray-600 text-sm leading-normal mb-4 last:mb-0">
						{props.plot.substr(0, 80)}...
					</p>
				</div>

				{props.wikipediaUrl
					? <Button
						color="light"
						size="xs"
						className="w-full"
						onClick={() => window.open(props.wikipediaUrl, '_blank')}
					>
						More
					</Button>
					: null
				}
			</div>
		</div>
	);
};

export default MovieItem;