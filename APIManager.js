class APIManager {
    constructor() {
        this.data = {}
    }

    loadData() {
        // Fetch random user data
        $.getJSON('https://randomuser.me/api/?results=7', response => {
            this.data.user = response.results[0]
            this.data.friends = response.results.slice(1)
        });

        // Fetch Kanye quote
        $.getJSON('https://api.kanye.rest/', response => {
            this.data.quote = response.quote
        });

        // Fetch random Pokemon
        let id = Math.floor(Math.random() * 949) + 1;
        $.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`, response => {
            this.data.pokemon = {
                name: response.name,
                img: response.sprites.other.dream_world.front_default
            }
        });

        // Fetch random 'meat' text
        $.getJSON('https://baconipsum.com/api/?type=all-meat&sentences=3&start-with-lorem=1', response => {
            this.data.aboutMe = response[0]
        });
    }
}
