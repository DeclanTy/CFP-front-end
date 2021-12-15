axios.get('http://localhost:8080/getAll')
.then(res=>{
    console.log(res)
    


})
.catch (err =>{
    console.log("error",err)
})