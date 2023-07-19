class APIManager {
    constructor() {
        this.data = {}
    }

    async loadData() {
        console.log("loadData called");
        // Fetch random user data
        const userPromise = $.ajax({
            url: 'https://randomuser.me/api/?results=7',
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: (response) => {
                this.data.user = response.results[0];
                this.data.friends = response.results.slice(1);
            },
            error: (error) => {
                console.error('Error loading user data:', error);
            }
        });

        // Fetch Kanye quote
        const quotePromise = $.ajax({
            url: 'https://api.kanye.rest/',
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: (response) => {
                this.data.quote = response.quote;
            },
            error: (error) => {
                console.error('Error loading Kanye quote:', error);
            }
        });

        // Fetch random Pokemon
        const fetchPokemon = () => {
            return new Promise((resolve, reject) => {
                const fetchData = async () => {
                    let id = Math.floor(Math.random() * 949) + 1;
                    try {
                        const response = await $.ajax({
                            url: `https://pokeapi.co/api/v2/pokemon/${id}`,
                            method: 'GET',
                            dataType: 'json',
                            cache: false,
                        });

                        if (!response.sprites.other.dream_world.front_default) {
                            fetchData();
                        } else {
                            resolve({
                                name: response.name,
                                img: response.sprites.other.dream_world.front_default
                            });
                        }
                    } catch (error) {
                        console.error('Error loading Pokemon data:', error);
                        reject(error);
                    }
                };
                fetchData();
            });
        }

        let pokemonPromise = fetchPokemon();
        pokemonPromise
            .then(pokemon => {
                this.data.pokemon = pokemon;
            })
            .catch(error => {
                console.error('Error loading Pokemon data:', error);
            });

        // Fetch random 'meat' text
        const aboutMePromise = $.ajax({
            url: 'https://baconipsum.com/api/?type=all-meat&sentences=3&start-with-lorem=1',
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: (response) => {
                this.data.aboutMe = response[0];
            },
            error: (error) => {
                console.error('Error loading "about me" data:', error);
            }
        });

        await Promise.all([userPromise, quotePromise, pokemonPromise, aboutMePromise]);
    }
}
