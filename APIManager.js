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
                        this.data.pokemon = {
                            name: response.name,
                            img: response.sprites.other.dream_world.front_default
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
}
