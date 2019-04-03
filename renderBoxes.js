function renderAllCars(cars) {
    $('#listings > div').hide();
    $('#listings .no-cars').hide();
    if (cars.length > 0) {
        for (const car of cars) {
            console.log(car);
            let mainDiv = $('<div class="listing">');
            mainDiv.append(`<p>${car.title}</p>`);
            mainDiv.append(`<img src="${car.imageUrl}">`);
            mainDiv.append(`<h2>${car.brand}</h2>`);

            let innerDiv = $(`<div class="info"><div id="data-info">
                      <h3>Seller: ${car.seller}</h3>
                      <h3>Fuel: ${car.fuel}</h3>
                      <h3>Year: ${car.year}</h3>
                      <h3>Price: ${car.price} $</h3>`);

            let buttonsDiv = $('<div id="data-buttons">');
            let ul = $('<ul>');


                let buttonDetails = $(` <li class="action"><a href="#" class="button-carDetails">Details</a>`).on('click', function () {
                    renderDetailView(car);
                });
            ul.append(buttonDetails);

            if (sessionStorage.getItem("userId") === car._acl.creator) {
                let buttonEdit = $(`<li class="action"><a href="#" class="button-carDetails">edit</a>`).on('click', function () {
                    renderEditView(car);
                });
                let buttonDelete = $(`<li class="action"><a href="#" class="button-carDetails">delete</a>`).on('click', function () {
                    kinveyRequests.removeCar(car._id);
                });
                ul.append(buttonEdit);
                ul.append(buttonDelete);
            }

            buttonsDiv.append(ul);
            innerDiv.append(buttonsDiv);
            mainDiv.append(innerDiv);

            $('#listings').append(mainDiv);

        }
    } else {
        $('#listings > p').show();

    }
}

    function renderMyCars(cars) {
        $('.car-listings > div').remove();
        $('.car-listings .no-cars').hide();
        if (cars.length > 0 ) {
            for (const car of cars) {
                console.log(car);
                let mainDiv = $('<div class="my-listing">');
                mainDiv.append(`<p id="listing-title">${car.title}</p>`);
                mainDiv.append(`<img src="${car.imageUrl}">`);

                let innerDiv = $(`<div class="listing-props">
                        <h2>Brand: ${car.brand}</h2>
                        <h3>Model: ${car.model}</h3>
                        <h3>Year: ${car.year}</h3>
                        <h3>Price: ${car.price}$</h3>`);
                mainDiv.append(innerDiv);
                let buttonsDiv = $('<div class="my-listing-buttons">');
                let buttonDetails = $(`<a href="#" class="my-button-list">Details</a>`).on('click', function () {
                    renderDetailView(car);
                });
                let buttonEdit = $(`<a href="#" class="my-button-list">Edit</a>`).on('click', function () {
                    renderEditView(car);
                });
                let buttonDelete= $(`<a href="#" class="my-button-list">Delete</a>`).on('click', function () {
                    kinveyRequests.removeCar(car._id);
                });

                buttonsDiv.append(buttonDetails);
                buttonsDiv.append(buttonEdit);
                buttonsDiv.append(buttonDelete);
                mainDiv.append(buttonsDiv);

                $('.car-listings').append(mainDiv);
            }
        } else {

            $('.my-listings > h1').hide();
            $('.car-listings .no-cars').show();
        }
    }

function renderDetailView(car) {
    hideAllView();
    $('.listing-details').empty();
    $('.listing-details').show();
    let mainDiv = $('<div class="my-listing-details">');
    mainDiv.append(`<p id="auto-title">${car.title}</p>`);
    mainDiv.append(`<img src="${car.imageUrl}">`);
    let innerDiv = $(`<div class="listing-props">
                        <h2>Brand: ${car.brand}</h2>
                        <h3>Model: ${car.model}</h3>
                        <h3>Year: ${car.year}</h3>
                        <h3>Fuel: ${car.fuel}</h3>
                        <h3>Price: ${car.price}$</h3>`);
    mainDiv.append(innerDiv);

    if (sessionStorage.getItem("userId") === car._acl.creator) {
        let buttonsDiv = $('<div class="listings-buttons">');
        let buttonEdit = $(`<a href="#" class="button-list">Edit</a>`).on('click', function () {
            renderEditView(car);
        });
        let buttonDelete = $(`<a href="#" class="button-list">Delete</a>`).on('click', function () {
            kinveyRequests.removeCar(car._id);
        });
        buttonsDiv.append(buttonEdit);
        buttonsDiv.append(buttonDelete);
        mainDiv.append(buttonsDiv);
    }

    mainDiv.append('<p id="description-title">Description:</p>');
    mainDiv.append(` <p id="description-para">${car.description}</p>`);
    $('.listing-details').append(mainDiv);

}

function renderEditView(car) {
    hideAllView();
    $('#edit-listing').show();
    $("#edit-listing input[name=carId]").val(car._id);
    $("#edit-listing input[name=brand]").val(car.brand);
    $("#edit-listing input[name=description]").val(car.description);
    $("#edit-listing input[name=fuelType]").val(car.fuel);
    $("#edit-listing input[name=imageUrl]").val(car.imageUrl);
    $("#edit-listing input[name=model]").val(car.model);
    $("#edit-listing input[name=price]").val(+car.price);
    $("#edit-listing input[name=title]").val(car.title);
    $("#edit-listing input[name=year]").val(+car.year);
}
