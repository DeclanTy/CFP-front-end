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
            this.reset();
            this.address.focus();
            console.log(res);
        })
        .catch(err => console.error(err));
});

document.querySelector("#deleteForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const propertyId = this.propertyId.value;

    axios.delete(`http://localhost:8080/remove/${propertyId}`)
        .then(res => {
            console.log(res);
            this.reset();
            this.propertyId.focus();
            getProperties();
        })
        .catch(err => console.error(err));
})

const getProperties = () => {
    axios.get('http://localhost:8080/getAll')
        .then(res => {
            console.log(res)
            const properties = res.data;
            getOutput.innerHTML = "";

            for (let property of properties) {
                const propertyContainer = document.createElement("div");

                const address = document.createElement("p");
                address.innerText = `Address: ${property.address}`;
                propertyContainer.appendChild(address);

                const location = document.createElement("p");
                location.innerText = `${property.location}`;
                propertyContainer.appendChild(location);


                const price = document.createElement("p");
                price.innerText = `£${property.price}`;
                propertyContainer.appendChild(price);

                const bedrooms = document.createElement("p");
                if (`${property.bedrooms}`== 0) {
                    bedrooms.innerText = "Studio";
                }
                else if(`${property.bedrooms}`==1){
                    bedrooms.innerText="1 Bed";
                }
                else {
                    bedrooms.innerText = `${property.bedrooms} Bedrooms`;
                }
                propertyContainer.appendChild(bedrooms);

                const gpsLocation = `${property.gps_location}`;
                const id = `${property.id}`;
                let gpsValues = new Array();
                gpsValues = gpsLocation.split(",");

                const propertyDelete= document.createElement("button");
                propertyDelete.innerText ="Remove";
                propertyContainer.appendChild(propertyDelete);
                propertyDelete.addEventListener("click",function(){
                    axios.delete(`http://localhost:8080/remove/${property.id}`)
                    .then(res => {
                        console.log(res);

                        getProperties();
                    })
                    .catch(err => console.error(err));
                })


                getOutput.appendChild(propertyContainer);
                /*insert google map here */


            }
        })
        .catch(err => console.log("error", err));
}
getProperties();


