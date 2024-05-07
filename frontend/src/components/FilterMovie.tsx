import React from "react";

const FilterMovies = ({ genres, actors, handleSubmitForm }) => { 
    return (
        <div className="max-auto mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <form onSubmit={(event) => { handleSubmitForm(event)} }>
                <div className="grid grid-cols-4 gap-4 mb-4">                            
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="order">
                            Ordinamento
                        </label>
                        <select id="order" name="order" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="releaseDate_asc">Meno recenti</option>    
                            <option value="releaseDate_desc">Più recenti</option>                                                
                            <option value="rating_desc">Più votati</option>
                            <option value="rating_asc">Meno votati</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genreId">
                            Genere
                        </label>
                        <select id="genre" name="genre" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value=''>Scegli</option>
                            {genres && genres.map((item, key) => (
                                <option key={key} value={item.id}>{item.name}</option>
                            ))};
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="actorId">
                            Attore
                        </label>
                        <select id="actor" name="actor" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value=''>Scegli</option>
                            {actors && actors.map((item, key) => (
                                <option key={key} value={item.id}>{item.name}</option>
                            ))};
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="actorId">
                                &nbsp;
                        </label>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Filtra
                        </button>
                    </div>
                </div>                
            </form>
        </div>
    );
};

export default FilterMovies;