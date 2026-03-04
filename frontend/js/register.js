const API_BASE_URL="http://127.0.0.1:5000"

async function register(){

const email=document.getElementById("email").value
const username=document.getElementById("username").value
const password=document.getElementById("password").value

const response=await fetch(API_BASE_URL+"/api/register",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,username,password})
})

const data=await response.json()

if(data.status==="otp_sent"){
alert("OTP sent to email")
document.getElementById("otp-section").style.display="block"
}

}

async function verifyOTP(){

const email=document.getElementById("email").value
const otp=document.getElementById("otp").value

const response=await fetch(API_BASE_URL+"/api/verify-otp",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,otp})
})

const data=await response.json()

if(data.status==="verified"){
alert("Account verified")
window.location.href="login.html"
}else{
alert("Invalid OTP")
}

}