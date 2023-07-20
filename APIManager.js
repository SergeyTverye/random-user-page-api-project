class APIManager {
    constructor() {
        this.data = {}
    }
    async loadData() {
        const userPromise = this.fetchUserData();
        const quotePromise = this.fetchQuote();
        const pokemonPromise = this.fetchPokemon();
        const aboutMePromise = this.fetchMeat();
        await Promise.all([userPromise, quotePromise, pokemonPromise, aboutMePromise]);
        await this.fetchPokemonGif(this.data.pokemon.name);
    }
    fetchUserData() {
        return $.ajax({
            url: 'https://randomuser.me/api/?results=7',
            method: 'GET',
            dataType: 'json',
            cache: false,
        }).done(response => {
            this.data.user = response.results[0];
            this.data.friends = response.results.slice(1);
        }).fail(error => {
            console.error('Error loading user data:', error);
        });
    }
    fetchQuote() {
        return $.ajax({
            url: 'https://api.kanye.rest/',
            method: 'GET',
            dataType: 'json',
            cache: false,
        }).done(response => {
            this.data.quote = response.quote;
        }).fail(error => {
            console.error('Error loading Kanye quote:', error);
        });
    }

    getColorByType(type) {
        const colors = {
            'normal': { bg: '#A8A878', text: 'black' },
            'fire': { bg: '#F08030', text: 'white' },
            'water': { bg: '#6890F0', text: 'white' },
            'electric': { bg: '#F8D030', text: 'black' },
            'grass': { bg: '#78C850', text: 'white' },
            'ice': { bg: '#98D8D8', text: 'black' },
            'fighting': { bg: '#C03028', text: 'white' },
            'poison': { bg: '#A040A0', text: 'white' },
            'ground': { bg: '#E0C068', text: 'black' },
            'flying': { bg: '#A890F0', text: 'white' },
            'psychic': { bg: '#F85888', text: 'white' },
            'bug': { bg: '#A8B820', text: 'black' },
            'rock': { bg: '#B8A038', text: 'white' },
            'ghost': { bg: '#705898', text: 'white' },
            'dragon': { bg: '#7038F8', text: 'white' },
            'dark': { bg: '#705848', text: 'white' },
            'steel': { bg: '#B8B8D0', text: 'black' },
            'fairy': { bg: '#EE99AC', text: 'black' },
        };

        return colors[type] || { bg: '#ffffff', text: 'black' };
    }

    fetchPokemon() {
        return new Promise((resolve, reject) => {
            const fetchData = async () => {
                const id = Math.floor(Math.random() * 949) + 1;
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
                        console.log(response)
                        this.data.pokemon = {
                            name: response.name,
                            img: response.sprites.other.dream_world.front_default,
                            type: response.types[0].type.name,
                            color: this.getColorByType(response.types[0].type.name),
                        };
                        resolve();
                    }
                } catch (error) {
                    console.error('Error loading Pokemon data:', error);
                    reject(error);
                }
            };
            fetchData();
        });
    }
    fetchMeat() {
        return $.ajax({
            url: 'https://baconipsum.com/api/?type=all-meat&sentences=3&start-with-lorem=1',
            method: 'GET',
            dataType: 'json',
            cache: false,
        }).done(response => {
            this.data.aboutMe = response[0];
        }).fail(error => {
            console.error('Error loading "about me" data:', error);
        });
    }
    fetchPokemonGif(pokemonName) {
        return $.ajax({
            url: `http://api.giphy.com/v1/gifs/search?q=${pokemonName}&api_key=5y5ZDCfxHxS2YLGHYUJaWjEPucTDmkcK&limit=5`,
            method: 'GET',
            dataType: 'json',
            cache: false,
        }).done(response => {
            this.data.pokemonGif = response.data[0].embed_url;
        }).fail(error => {
            console.error('Error loading Pokemon GIF:', error);
        });
    }
}
