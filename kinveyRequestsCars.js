const kinveyRequests = (function () {
    const BASE_URL = 'https://baas.kinvey.com/';
    const APP_KEY = 'kid_HJVJX2TBm';
    const APP_SECRET = 'aa6600a1af914fb492fc41726c133f2f';
    const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)};

    function registerUser(username, password) {
        $.ajax({
            method: "POST",
            url: BASE_URL + 'user/' + APP_KEY + '/',
            headers: AUTH_HEADERS,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'User registration successful.');
            $('#register').trigger('reset');
        }).catch(handleError)
    }

    function logoutUser() {
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'user/' + APP_KEY + '/_logout',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
        }).catch(function (err) {
            console.log(err)
        });

        sessionStorage.clear();
        showInfo("Logout successful.");
        showHomeViews();
        showHideLink();
    }

    function loginUser(username, password) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'user/' + APP_KEY + '/login',
            headers: AUTH_HEADERS,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'Login successful.');
            $('#login').trigger('reset');
        }).catch(handleError)
    }

    function signInUser(res, message) {
        saveUserSession(res);
        showInfo(message);
        showHomeViews();
        showHideLink();
    }

    function saveUserSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('username', userInfo.username);
        sessionStorage.setItem('userId', userInfo._id);
    }

    async function getAllCars() {
        return await $.ajax({
            method: 'GET',
            url: BASE_URL + 'appdata/' + APP_KEY + '/cars?query={}&sort={"_kmd.ect": -1}',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            return res
        }).catch(handleError)
    }

    async function getMyCars() {
        return await $.ajax({
            method: 'GET',
            url: BASE_URL + 'appdata/' + APP_KEY + `/cars?query={"seller":"${sessionStorage.getItem('username')}"}&sort={"_kmd.ect": -1}`,
            // '/cars?query={"seller":"doncho"}&sort={"_kmd.ect": -1}',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
        }).then(function (res) {
            return res
        }).catch(handleError)
    }// 'https://baas.kinvey.com/appdata/kid_HJVJX2TBm/cars?query={"seller":"kunio"}&sort={"_kmd.ect": -1}'

    function removeCar(id) {
        $.ajax({
            method: 'DELETE',
            url: BASE_URL + 'appdata/' + APP_KEY + '/cars/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function () {
            showInfo("Listing deleted.");
            showHomeViews();
        }).catch(handleError)
    }
    function createCar(brand, description, fuel, imageUrl, model, price, seller, title, year) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'appdata/' + APP_KEY + '/cars',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {brand, description, fuel, imageUrl, model, price, seller, title, year}
        }).then(function () {
            showHomeViews();
            showInfo("Listing created.");
            $('#create-listing form').trigger("reset")
        }).catch(handleError)
    }
    function editCarInfo(id, brand, description, fuel, imageUrl, model, price, seller, title, year) {
        $.ajax({
            method: 'PUT',
            url: BASE_URL + 'appdata/' + APP_KEY + '/cars/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {brand, description, fuel, imageUrl, model, price, seller, title, year}
        }).then(function () {
            showInfo(`Listing ${title} updated`);
            showHomeViews();
        }).catch(handleError)
    }
    function handleError(err) {
        showError(err.responseJSON.description)
    }
    return {registerUser, logoutUser, loginUser, getAllCars, getMyCars, removeCar, createCar, editCarInfo}
}());