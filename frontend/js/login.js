const API_BASE_URL="http://127.0.0.1:5000"

async function login(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

const response=await fetch(API_BASE_URL+"/api/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,password})
})

const data=await response.json()

if(data.status==="success"){

localStorage.setItem("user_id",data.user_id)
localStorage.setItem("role",data.role)

if(data.role==="admin"){
window.location.href="admin.html"
}
else{
window.location.href="dashboard.html"
}

}else{
alert("Invalid Login")
}

}