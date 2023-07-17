$(document).ready(() => {
    const apiManager = new APIManager();
    const renderer = new Renderer();

    $('button:contains("Load User Data")').on('click', () => {
        apiManager.loadData();
    });

    $('button:contains("Display User")').on('click', () => {
        renderer.render(apiManager.data);
    });
});