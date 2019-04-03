function attachButtonsEvents(){
//register
    $('#register .registerbtn').on('click', function (event) {
        event.preventDefault();
        let username = $("#register input[name=username]").val();
        let password = $("#register input[name=password]").val();
        let checkPass = $("#register input[name=repeatPass]").val();

        if (validateUser(username, password, checkPass)) {
            kinveyRequests.registerUser(username, password);
        }

    });
//logout
    $("#logoutCars-link").on('click', function () {
        kinveyRequests.logoutUser()
    });
//login
    $('#login .registerbtn').on('click', function (event) {
        event.preventDefault();
        let username = $("#login input[name=username]").val();
        let password = $("#login input[name=password]").val();
        kinveyRequests.loginUser(username, password)
    });
//createListing
    $('#create-listing').find($('.registerbtn')).on('click', function (event) {
        event.preventDefault();
        let brand = $("#create-listing input[name=brand]").val();
        let description = escapeHTML($("#create-listing input[name=description]").val());
        let fuel = $("#create-listing input[name=fuelType]").val();
        let imageUrl = $("#create-listing input[name=imageUrl]").val();
        let model = $("#create-listing input[name=model]").val();
        let price = $("#create-listing input[name=price]").val();
        let seller = sessionStorage.getItem('username');
        let title = $("#create-listing input[name=title]").val();
        let year = $("#create-listing input[name=year]").val();

        if (validateInput(brand, description, fuel, imageUrl, model, price, seller, title, year)) {
            kinveyRequests.createCar(brand, description, fuel, imageUrl, model, price, seller, title, year);
        }



    });
//editListing
    $('#edit-listing .registerbtn').on('click', function (event) {
        event.preventDefault();
        let id = $("#edit-listing input[name=carId]").val();
        let brand = $("#edit-listing input[name=brand]").val();
        let description = escapeHTML($("#edit-listing input[name=description]").val());
        let fuel = $("#edit-listing input[name=fuelType]").val();
        let imageUrl = $("#edit-listing input[name=imageUrl]").val();
        let model = $("#edit-listing input[name=model]").val();
        let price = $("#edit-listing input[name=price]").val();
        let seller = sessionStorage.getItem('username');
        let title = $("#edit-listing input[name=title]").val();
        let year = $("#edit-listing input[name=year]").val();
        if (validateInput(brand, description, fuel, imageUrl, model, price, seller, title, year)) {
        kinveyRequests.editCarInfo(id, brand, description, fuel, imageUrl, model, price, seller, title, year)
        }
    });
    

}


