$(document).ready(() => {
    const apiManager = new APIManager();
    const renderer = new Renderer();

    $('button:contains("Display User")').on('click', async () => {
        try {
            await apiManager.loadData();
            renderer.render(apiManager.data);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    });

});