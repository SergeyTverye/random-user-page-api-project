class Renderer {
    renderUser(user) {
        console.log('user in render =', user);
        let source = $('#user-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template(user);
        $('.user-container').empty().append(newHTML);
    }

    renderFriends(friends) {
        let source = $('#friends-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({friends});
        $('.friends-container').empty().append(newHTML);
    }

    renderQuote(quote) {
        console.log('quote in render =', quote)
        let source = $('#quote-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({quote});
        $('.quote-container').empty().append(newHTML);
    }

    renderPokemon(pokemon) {
        console.log('pokemon in render =', pokemon)
        let source = $('#pokemon-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template(pokemon);
        $('.pokemon-container').empty().append(newHTML);
    }

    renderMeat(meat) {
        let source = $('#meat-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({meat});
        $('.meat-container').empty().append(newHTML);
    }

    render(data) {
        console.log("render called");
        this.renderUser(data.user);
        this.renderFriends(data.friends);
        this.renderQuote(data.quote);
        this.renderPokemon(data.pokemon);
        this.renderMeat(data.aboutMe);
    }
}
