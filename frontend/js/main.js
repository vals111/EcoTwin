const API_BASE_URL="http://127.0.0.1:5000"
const userId=localStorage.getItem("user_id")

if(!userId){
window.location.href="login.html"
}

async function fetchTwin(){

const response=await fetch(API_BASE_URL+"/api/twin",{
headers:{"User-ID":userId}
})

const data=await response.json()

document.getElementById("energy-data").innerText=
"Usage: "+data.energy_system.current_usage_kwh+" kWh"

document.getElementById("water-data").innerText=
"Usage: "+data.water_system.current_usage_liters+" Liters"

document.getElementById("traffic-data").innerText=
"Vehicles: "+data.traffic_system.avg_vehicle_count

}

async function updateEnergy(){

const value=document.getElementById("energy-input").value

await fetch(API_BASE_URL+"/api/update/energy",{
method:"POST",
headers:{
"Content-Type":"application/json",
"User-ID":userId
},
body:JSON.stringify({value})
})

fetchTwin()

}

async function updateWater(){

const value=document.getElementById("water-input").value

await fetch(API_BASE_URL+"/api/update/water",{
method:"POST",
headers:{
"Content-Type":"application/json",
"User-ID":userId
},
body:JSON.stringify({value})
})

fetchTwin()

}

async function updateTraffic(){

const value=document.getElementById("traffic-input").value

await fetch(API_BASE_URL+"/api/update/traffic",{
method:"POST",
headers:{
"Content-Type":"application/json",
"User-ID":userId
},
body:JSON.stringify({value})
})

fetchTwin()

}

window.onload=fetchTwin