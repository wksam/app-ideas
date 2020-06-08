
(function () {
    document.querySelector('form').addEventListener('submit', onSearch);

    function onSearch(e) {
        e.preventDefault();
        hideAlert();
    
        const formData = new FormData(e.target);
        search(formData.get('username'));
    }

    function search(username) {
        const url = 'https://api.github.com/users/' + username;
        fetch(url).then(response => {
            switch (response.status) {
                case 200:
                    return response.json();
                case 404:
                    throw 'Username not found.'
                default:
                    throw 'Something is wrong. Please try again later.'
            }
        }).then(data => {
            fillProfile(data);
            return fetch(data.repos_url + '?sort=updated');
        }).then(response => response.json())
        .then(data => fillRepositories(data))
        .catch(e => showAlert(e));
    }

    function fillProfile(profile) {
        const profileContainer = document.querySelector('.profile');
        profileContainer.textContent = '';

        profileContainer.append(createProfile(profile.avatar_url, profile.name, profile.followers, profile.public_repos));
    }

    function createProfile(imageUrl, username, followers, repositories) {
        const container = document.createElement('div');
        container.setAttribute('class', 'd-flex flex-column mr-sm-4');
        container.setAttribute('style', 'max-width: 320px');

        const image = document.createElement('img');
        image.setAttribute('src', imageUrl);
        image.setAttribute('alt', 'Profile Image');
        image.setAttribute('class', 'img-fluid rounded mb-3');
        container.append(image);

        const name = document.createElement('h5');
        name.textContent = username;
        container.append(name);

        const follower = document.createElement('p');
        follower.setAttribute('class', 'm-0');
        follower.textContent = followers > 1 ? followers + ' followers' : followers + ' follower';
        container.append(follower);

        const repository = document.createElement('p');
        repository.textContent = repositories > 1 ? repositories + ' repositories' : repositories + ' repository';
        container.append(repository);

        return container;
    }

    function fillRepositories(repositories) {
        const profileContainer = document.querySelector('.profile');
        profileContainer.append(createListRepositories(repositories));
    }

    function createListRepositories(repositories) {
        const container = document.createElement('div');
        container.setAttribute('class', 'd-flex flex-column flex-grow-1');

        const list = document.createElement('ul');
        list.setAttribute('class', 'list-group');

        let count = 0;
        for (const repository of repositories) {
            if(count > 3) break;
            count++;

            const item = document.createElement('li');
            item.setAttribute('class', 'list-group-item');
            item.textContent = repository.name;
            list.append(item);
        }
        container.append(list);

        return container;
    }

    function showAlert(text) {
        document.querySelector('.profile').textContent = '';
        const alert = document.querySelector('.alert');
        alert.hidden = false;
        alert.textContent = text;
    }

    function hideAlert() {
        document.querySelector('.alert').hidden = true;
    }
})();