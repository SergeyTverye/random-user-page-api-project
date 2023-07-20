class Renderer {
    renderUser(user) {
        this.renderTemplate('#user-template', '.user-container', user);
    }
    renderFriends(friends) {
        this.renderTemplate('#friends-template', '.friends-container', {friends});
    }
    renderQuote(quote) {
        this.renderTemplate('#quote-template', '.quote-container', {quote});
    }
    renderPokemon(pokemon) {
        this.renderTemplate('#pokemon-template', '.pokemon-container', pokemon);
    }
    renderMeat(meat) {
        this.renderTemplate('#meat-template', '.meat-container', {meat});
    }
    renderPokemonGif(pokemonGif) {
        this.renderTemplate('#pokemon-gif-template', '.pokemon-gif-container', {pokemonGif});
    }

    renderTemplate(templateID, containerClass, data) {
        const source = $(templateID).html();
        const template = Handlebars.compile(source);
        const newHTML = template(data);
        $(containerClass).empty().append(newHTML);
    }

    render(data) {
        this.renderUser(data.user);
        this.renderFriends(data.friends);
        this.renderQuote(data.quote);
        this.renderPokemon(data.pokemon);
        this.renderMeat(data.aboutMe);
        this.renderPokemonGif(data.pokemonGif);

    }
}
