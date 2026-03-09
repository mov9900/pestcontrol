export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ success:false });
}

try {

const { name,email,phone,service,message } = req.body;

const response = await fetch("https://api.brevo.com/v3/smtp/email", {

method:"POST",

headers:{
"Content-Type":"application/json",
"api-key": process.env.BREVO_KEY
},

body: JSON.stringify({

sender:{
name:"Website Lead",
email:"moviesworld1712@gmail.com"
},

to:[
{ email:"hitanshu0099@gmail.com" }
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

return res.status(200).json({success:true});

}

return res.status(500).json({success:false});

} catch(err){

return res.status(500).json({success:false});

}

}
