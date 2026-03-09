export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"});
}

const {name,email,phone,service,message} = req.body;

const BREVO_API_KEY = process.env.BREVO_KEY;

const response = await fetch("https://api.brevo.com/v3/smtp/email",{

method:"POST",

headers:{
"Content-Type":"application/json",
"api-key": BREVO_API_KEY
},

body: JSON.stringify({

sender:{
name:"Website Form",
email:"yourverifiedemail@gmail.com"
},

to:[
{ email:"yourgmail@gmail.com"}
],

subject:"New Pest Control Lead",

htmlContent:`
<h2>New Customer Request</h2>
<p><b>Name:</b> ${name}</p>
<p><b>Email:</b> ${email}</p>
<p><b>Phone:</b> ${phone}</p>
<p><b>Service:</b> ${service}</p>
<p><b>Message:</b> ${message}</p>
`

})

});

if(response.ok){

return res.json({success:true});

}else{

return res.json({success:false});

}

}