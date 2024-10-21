$(document).ready(function() {
    $('#search-button').on('click', function() {
        const movieName = $('#movie-input').val().trim();

        if (!movieName) {
            alert('Por favor, escreva o nome do filme');
            return;
        }

        const apiKey = '362394dd'; // Sua API Key
        const url = `http://www.omdbapi.com/?s=${encodeURIComponent(movieName)}&apikey=${apiKey}&type=movie`;

        $.get(url, function(data) {
            if (data.Response === 'True') {
                $('#movies-list').empty(); // Limpa a lista de filmes
                data.Search.forEach(movie => {
                    const movieDetailsUrl = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;

                    $.get(movieDetailsUrl, function(movieDetails) {
                        const movieDiv = $(`
                            <div class="movie">
                                <img src="${movieDetails.Poster}" alt="${movieDetails.Title} Poster">
                                <h3>${movieDetails.Title}</h3>
                                <p><strong>Diretor:</strong> ${movieDetails.Director}</p>
                                <p><strong>IMDb:</strong> ${movieDetails.imdbRating}</p>
                                <p>${movieDetails.Plot}</p>
                            </div>
                        `);
                        $('#movies-list').append(movieDiv);
                    });
                });
            } else {
                alert('Filme não encontrado!');
            }
        }).fail(function() {
            alert('Erro ao buscar os filmes. Verifique sua conexão.');
        });
    });
});
