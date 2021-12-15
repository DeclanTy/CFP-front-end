"use strict"

const getOutput = document.querySelector("#getOutput");



document.querySelector("#createProperty").addEventListener("submit", function (event) {
    event.preventDefault();



    const data = {
        address: this.address.value,
        gps_location: this.gps_location.value,
        location: this.location.value,
        price: this.price.value,
        bedrooms: this.bedrooms.value
    };

    axios
        .post("http://localhost:8080/create", data)
        .then(res => {
            getProperties();
            form.reset();
            form.address.focus();
            console.log(res);
        })
        .catch(err => console.error(err));
});

document.querySelector("#deleteForm").addEventListener("submit", function(event){
event.preventDefault():=
});

const getProperties = () => {
    axios.get('http://localhost:8080/getAll')
        .then(res => {
            console.log(res)
            const properties = res.data;
            getOutput.innerHTML = "";

            for (let property of properties) {
                const propertyContainer = document.createElement("div");

                const address = document.createElement("p");
                address.innerText = `address: ${property.address}`;
                propertyContainer.appendChild(address);

                const location = document.createElement("p");
                location.innerText = `${property.location}`;
                propertyContainer.appendChild(location);


                const price = document.createElement("p");
                price.innerText = `£${property.price}`;
                propertyContainer.appendChild(price);

                const bedrooms = document.createElement("p");
                bedrooms.innerText = `${property.bedrooms} bedrooms`;
                propertyContainer.appendChild(bedrooms);

                const gpsLocation = `${property.gps_location}`;
                const id = `${property.id}`;
                let gpsValues = new Array();
                gpsValues = gpsLocation.split(",");


                getOutput.appendChild(propertyContainer);

            }
        })
        .catch(err => console.log("error", err));
}
getProperties();


