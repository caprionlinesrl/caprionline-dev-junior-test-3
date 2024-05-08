import { useEffect, useState } from "react"
import { Button } from "flowbite-react";

export default function MoviesFilter({ allMovies, setFilteredMovies, loading }) {
  // Di solito uso un Interface o una Classe per gestire state del genere, ma la libreria di TypeScript non e' inclusa nell'ambiente di sviluppo
  const [filters, setFilters] = useState({
    rating: null, // "asc" | "desc" | null
    releaseDate: null, // "asc" | "desc" | null
    selectedGenres: null, // string[] | null
  })


  // Nell'esercizio mi e' stato chiesto di filtrare per genere, ma nella risposta API dei film non era incluso nessun campo del genere.
  // Ho filtrato quindi per anno, ma il codice e' sempre lo stesso eventualmente venisse cambiato il campo.
  const uniqueYears = [...new Set(allMovies.map(movie => String(movie.year)))];

  // Apply filters whenever there's a change in filters
  useEffect(() => {
    applyFilters()
  }, [filters])

  const applyFilters = () => {
    // Get a copy of all movies
    let filteredMovies = [...allMovies]

    // Sorting logic
    filteredMovies.sort((a, b) => {
      // Rating filter (asc | desc)
      if (filters.rating !== null) {
        return filters.rating === "desc" ? b.rating - a.rating : a.rating - b.rating
      } // Recent filter (asc | desc)
      else if (filters.releaseDate !== null) {
        return filters.releaseDate === "desc"
          ? new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
          : new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
      }
      // If both filters are null don't sort.
      return 0
    })

    // Nell'esercizio mi e' stato chiesto di filtrare per genere, ma nella risposta API non era incluso nessun campo del genere.
    // Ho filtrato quindi per anno, ma il codice e' sempre lo stesso eventualmente venisse cambiato il campo.
    if (filters.selectedGenres) {
      if (filters.selectedGenres.length > 0) {
        filteredMovies = filteredMovies.filter((movie) =>
          filters.selectedGenres.includes(String(movie.year))
        )
      }
    }

    setFilteredMovies(filteredMovies)
  }

  // Function to handle rating filter
  // filter : "asc" | "desc" | null
  const handleRatingFilter = (filter) => {
    setFilters({
      ...filters,
      rating: filter,
      releaseDate: null, // Reset releaseDate filter when rating filter is applied
    })
  }

  // Function to handle publication year filter
  // filter : "asc" | "desc" | null
  const handleReleaseDateFilter = (filter) => {
    setFilters({
      ...filters,
      releaseDate: filter,
      rating: null, // Reset rating filter when publication year filter is applied
    })
  }

  // Function to handle genre filter
  // selectedGenre : string | null
  const handleGenreFilter = (selectedGenre) => {
    setFilters({
      ...filters,
      selectedGenres:
        selectedGenre === null
          ? null
          : filters.selectedGenres?.includes(selectedGenre)
            ? filters.selectedGenres.filter((genre) => genre !== selectedGenre)
            : [...(filters.selectedGenres || []), selectedGenre],
    })
  }

  if (loading) return <></>;
  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between mb-3">
      <Button.Group>
        <Button
          color={!!filters.rating ? "blue" : "light"}
          onClick={() => handleRatingFilter(filters.rating === "desc" ? "asc" : "desc")}
        >
          Rating
          {filters.rating === "asc" ? " ⇈" : filters.rating === "desc" ? " ⇊" : " ⇅"}
        </Button>
        <Button
          color={!!filters.releaseDate ? "blue" : "light"}
          onClick={() => handleReleaseDateFilter(filters.releaseDate === "desc" ? "asc" : "desc")}
        >
          Release Date
          {filters.releaseDate === "asc" ? " ⇈" : filters.releaseDate === "desc" ? " ⇊" : " ⇅"}
        </Button>
        <Button
          color="light"
          onClick={() => {
            handleRatingFilter(null)
            handleReleaseDateFilter(null)
          }}>
          Clear
        </Button>
      </Button.Group>


      <Button.Group className="flex flex-wrap">
        {uniqueYears.map((year, i) => (
          <Button
            key={i}
            color={!!filters.selectedGenres?.includes(year) ? "blue" : "light"}
            onClick={() => handleGenreFilter(year)}
          >
            {year}
          </Button>
        ))}
        <Button
          color="light"
          onClick={() => handleGenreFilter(null)}>
          Clear
        </Button>
      </Button.Group>
    </div>
  )
}
