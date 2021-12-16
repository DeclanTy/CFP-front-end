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

                const propertyCard = document.createElement("div");
                propertyCard.classList.add("card");
                

                const propertyBody = document.createElement("div");
                propertyBody.classList.add("card-body");



                const propertyContainer = document.createElement("div");
                //propertyBody.classList.add("card-body");

                const address = document.createElement("h4");
                address.innerText = `${property.address}`;
                propertyBody.appendChild(address);

                const location = document.createElement("h4");
                location.innerText = `${property.location}`;
                propertyBody.appendChild(location);


                const price = document.createElement("p");
                price.innerText = `£${property.price}`;
                propertyBody.appendChild(price);

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
                propertyBody.appendChild(bedrooms);

                

                // const gpsLocation = `${property.gps_location}`;
                // const id = `${property.id}`;
                // let gpsValues = new Array();
                // gpsValues = gpsLocation.split(",");
                // propertyCard.appendChild(gpsLocation);

                const propertyDelete= document.createElement("button");
                propertyDelete.innerText ="Remove";
                
                propertyDelete.addEventListener("click",function(){
                    axios.delete(`http://localhost:8080/remove/${property.id}`)
                    .then(res => {
                        console.log(res);

                        getProperties();
                    })
                    .catch(err => console.error(err));
                })
                propertyBody.appendChild(propertyDelete);
                propertyCard.appendChild(propertyBody);
                
            


                
                getOutput.appendChild(propertyCard);
                getOutput.appendChild(propertyContainer);
                /*insert google map here */


            }
        })
        .catch(err => console.log("error", err));
    }

document.querySelector("#updateProperty").addEventListener("submit", function (event) {
    event.preventDefault();

    const data = {
        id: this.id.value,
        address: this.address.value,
        gps_location: this.gps_location.value,
        location: this.location.value,
        price: this.price.value,
        bedrooms: this.bedrooms.value
    };

    axios
        .put(`http://localhost:8080/replace/${data.id}`, data)
        .then(res => {
           
            this.reset();
            this.id.focus();
            console.log(res);
            getProperties();
        })
        .catch(err => console.error(err));
});
getProperties();