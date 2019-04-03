function showHideLink() {
    hideAllLinkss();
    if (sessionStorage.getItem("authToken")) {
        $('#allCars-link').show();
        $('#myCars-link').show();
        $('#createCars-link').show();
        $('#profile').show();
        $('#welcome-container h2').hide();
    } else {
        $('#welcome-container h2').show();
        $('#loginCars-link').show();
        $('#registerCars-link').show();
    }
}

function hideAllLinkss() {
    $('#allCars-link').hide();
    $('#myCars-link').hide();
    $('#createCars-link').hide();
    $('#profile').hide();
    $('#loginCars-link').hide();
    $('#registerCars-link').hide();
}

function hideAllView(){
    $('#main').hide();
    $('#login').hide();
    $('#register').hide();
    $('#car-listings').hide();
    $('#create-listing').hide();
    $('#edit-listing').hide();
    $('.my-listings').hide();
    $('.listing-details').hide();

}

async function showHomeViews(){
    $('#profile a:first-child').text("Welcome, " + sessionStorage.getItem("username") + "!");
    hideAllView();
    if (sessionStorage.getItem("username")) {
       let cars = await kinveyRequests.getAllCars();
        $("#car-listings").show();
        removeAddClass($('#homeCar-link'));
        renderAllCars(cars);

    } else {
        $('#main').show();


    }

}

function removeAddClass(link) {
    $('#container a').removeClass('active');
    $(link).addClass('active');
}


function attachLinksEvents(){


    $('#homeCar-link').on('click', function () {
        hideAllView();
        $('#main').show();
        removeAddClass(this)
    });
    $('#allCars-link').on('click', function () {
        hideAllView();
        $('#car-listings').show();
        removeAddClass(this)
    });
    $('#myCars-link').on('click', async function () {
        hideAllView();
        removeAddClass(this);
        let cars = await kinveyRequests.getMyCars();
        $('.my-listings').show();
        renderMyCars(cars);
    });
    $('#createCars-link').on('click', function () {
        hideAllView();
        $('#create-listing').show();
        removeAddClass(this)
    });
    $('#logoutCars-link').on('click', function () {
        hideAllView();
        $('#main').show();
    });
    $('#loginCars-link').on('click', function () {
        hideAllView();
        $('#login').show();
    });
    $('#registerCars-link').on('click', function () {
        hideAllView();
        $('#register').show();
    });
    $('#signupCars-link').on('click', function () {
        hideAllView();
        $('#register').show();
    });
    $('#signinCars-link').on('click', function () {
        hideAllView();
        $('#login').show();
    });
}