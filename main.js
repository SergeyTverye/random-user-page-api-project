$(document).ready(() => {
    const apiManager = new APIManager();
    const renderer = new Renderer();

    Handlebars.registerHelper('properCase', function(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    });

    // Load saved users list and the last displayed user on page load
    let savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || {};
    updateSavedUsersList(savedUsers);

    const lastUser = localStorage?.getItem('lastDisplayedUser');
    console.dir(lastUser);
    if (lastUser) {
        const lastUserData = JSON.parse(lastUser);
        console.log('Last displayed user found, loading user:', lastUserData);
        renderer.render(lastUserData);
    } else {
        console.log('No last displayed user found, loading a new user.');
        displayUser();
    }


    $('#display-btn').on('click', displayUser);
    $('#save-btn').on('click', saveUser);
    $('#load-btn').on('click', loadUser);

    function displayUser() {
        apiManager.loadData().then(() => {
            let data = apiManager.data
            renderer.render(data);
            saveCurrentUser(data);
        }).catch(error => {
            console.error('Error loading data:', error);
        });
    }

    function saveUser() {
        const savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || {};


        const userCounter = Object.keys(savedUsers).length ? Object.keys(savedUsers).length + 1 : 0;
        console.log('apiManager.data: ', apiManager.data);
        const userName = `${apiManager.data.user.name.first} ${apiManager.data.user.name.last} (${userCounter})`;
        savedUsers[apiManager.data.user.id.value] = apiManager.data;
        localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
//        saveCurrentUser(apiManager.data);
        updateSavedUsersList(savedUsers);
    }

    function loadUser() {
        const savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || {};
        const selectedUserId = $('#saved-users').val();
        const savedData = savedUsers[selectedUserId];

        if (savedData) {
            renderer.render(savedData);
            saveCurrentUser(savedData);
        } else {
            alert('No saved user page found.');
        }
    }

    function saveCurrentUser(userData) {
        console.dir(userData);
        localStorage.setItem('lastDisplayedUser', JSON.stringify(userData));
    }

    function updateSavedUsersList(savedUsers) {
        const $select = $('#saved-users');
        $select.empty();

        for (let userId in savedUsers) {
            const userName = `${savedUsers[userId].user.name.first} ${savedUsers[userId].user.name.last}`;
            $select.append(`<option value="${userId}">${userName}</option>`);
        }
    }

    $('#clear-storage-btn').on('click', () => {
        localStorage.clear();
        updateSavedUsersList({});
    });
});
