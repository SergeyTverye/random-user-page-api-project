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
            success: (response) => {
                this.data.user = response.results[0];
                this.data.friends = response.results.slice(1);
            }
        });

        // Fetch Kanye quote
        const quotePromise = $.ajax({
            url: 'https://api.kanye.rest/',
            method: 'GET',
            dataType: 'json',
            success: (response) => {
                this.data.quote = response.quote;
            }
        });

        // Fetch random Pokemon
        let id = Math.floor(Math.random() * 949) + 1;
        const pokemonPromise = $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${id}`,
            method: 'GET',
            dataType: 'json',
            success: (response) => {
                this.data.pokemon = {
                    name: response.name,
                    img: response.sprites.other.dream_world.front_default
                };
            }
        });

        // Fetch random 'meat' text
        const aboutMePromise = $.ajax({
            url: 'https://baconipsum.com/api/?type=all-meat&sentences=3&start-with-lorem=1',
            method: 'GET',
            dataType: 'json',
            success: (response) => {
                this.data.aboutMe = response[0];
            }
        });

        await Promise.all([userPromise, quotePromise, pokemonPromise, aboutMePromise]);
    }
}
