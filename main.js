class StorageManager {
    saveToStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getFromStorage(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch(e) {
            console.error(`Error parsing ${key} data:`, e);
            return null;
        }
    }

    clearStorage() {
        localStorage.clear();
    }
}

$(document).ready(() => {
    const apiManager = new APIManager();
    const renderer = new Renderer();
    const storageManager = new StorageManager();

    Handlebars.registerHelper('properCase', function(text) {
        return text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : '';
    });

    const savedUsers = storageManager.getFromStorage('savedUsers');
    updateSavedUsersList(savedUsers);

    const lastUser = storageManager.getFromStorage('lastDisplayedUser');
    console.log('Loaded last user:', lastUser);
    if (lastUser) {
        console.log('Rendering last user...');
        renderer.render(lastUser);
        console.log('Rendering finished.');
    } else {
        console.log('Displaying new user...');
        displayUser();
        console.log('Finished displaying new user.');
    }

    $('#display-btn').on('click', displayUser);
    $('#save-btn').on('click', saveUser);
    $('#load-btn').on('click', loadUser);
    $('#clear-storage-btn').on('click', () => {
        storageManager.clearStorage();
        updateSavedUsersList({});
    });

    async function displayUser() {
        try {
            await apiManager.loadData();
            const data = apiManager.data;
            renderer.render(data);
            storageManager.saveToStorage('lastDisplayedUser', data);
        } catch(error) {
            console.error('Error loading data:', error);
        }
    }

    function saveUser() {
        const savedUsers = storageManager.getFromStorage('savedUsers') || {};
        const userCounter = Object.keys(savedUsers).length;
        const userName = `${apiManager.data.user.name.first} ${apiManager.data.user.name.last} (${userCounter})`;
        savedUsers[apiManager.data.user.id.value] = apiManager.data;
        storageManager.saveToStorage('savedUsers', savedUsers);
        updateSavedUsersList(savedUsers);
    }

    function loadUser() {
        const savedUsers = storageManager.getFromStorage('savedUsers');
        const selectedUserId = $('#saved-users').val();
        const savedData = savedUsers[selectedUserId];
        if (savedData) {
            renderer.render(savedData);
            storageManager.saveToStorage('lastDisplayedUser', savedData);
        } else {
            alert('No saved user page found.');
        }
    }

    function updateSavedUsersList(savedUsers) {
        const $select = $('#saved-users');
        $select.empty();
        for (let userId in savedUsers) {
            const userName = `${savedUsers[userId].user.name.first} ${savedUsers[userId].user.name.last}`;
            $select.append(`<option value="${userId}">${userName}</option>`);
        }
    }
});
