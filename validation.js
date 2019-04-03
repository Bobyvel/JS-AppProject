function validateInput(brand, description, fuel, imageUrl, model, price, seller, title, year) {


    if (!(title && title.length <= 33)) {
        showError("Title is empty or more than 33 symbols!")
    }else if (!(description.length >= 30 && description.length <= 450)){
        showError("Description lenth must be between 30 and 450 symbols!")
    }else if (!(brand && brand.length <= 11)) {
        showError("Brand is empty or more than 11 symbols!")
    }else if (!(model.length >= 4 && model.length <= 11)) {
        showError("Model lenth must be between 4 amd 11 symbols!")
    }else if (!(year && year.length === 4)) {
        showError("Year must be 4 digits!")
    }else if (!imageUrl.startsWith("http")){
        showError("Image URL must start with \"http\" !")
    }else if (!(fuel && fuel.length <= 11)) {
        showError("Fuel Type is empty or more than 11 symbols!")
    }else if (!(price && price <= 1000000)) {
        showError("The maximum price can be 1000000$")
    }else{

        return true;
    }
}

function validateUser(username, password, checkPass) {
    let patternName = /[A-Za-z]{3,}/;
    let patternPass = /[A-Za-z0-9]{6,}/;
    if (!patternName.test(username)){
        showError("A username should be at least 3 characters long and should contain only english alphabet letters.")
    }else if (!patternPass.test(password)){
        showError("Should be at least 6 characters long and should contain only english alphabet letters and digits");
    }else if (password !== checkPass){
        showError("Both passwords must match!");
    }else {
        return true;
    }
}

function escapeHTML(description) {
           return description
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

}