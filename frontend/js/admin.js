const API_BASE_URL="http://127.0.0.1:5000"

const userId=localStorage.getItem("user_id")
const role=localStorage.getItem("role")

if(role!=="admin"){
window.location.href="login.html"
}

async function loadUsers(){

const response=await fetch(API_BASE_URL+"/api/admin/users",{
headers:{"User-ID":userId}
})

const data=await response.json()

let html=""

data.forEach(user=>{
html+=`
<div>
${user.username} (${user.role})
<button onclick="deleteUser(${user.id})">Delete</button>
</div>
`
})

document.getElementById("users").innerHTML=html

}

async function deleteUser(id){

await fetch(API_BASE_URL+"/api/admin/delete_user",{
method:"POST",
headers:{
"Content-Type":"application/json",
"User-ID":userId
},
body:JSON.stringify({user_id:id})
})

loadUsers()

}