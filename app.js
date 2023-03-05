const express = require("express");
const { STATUS_CODES, request } = require("http");
const app = express();
const https = require("https");



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/"))





app.get('/', function(req,res) {
    res.sendFile(__dirname + "/login.html")
})



app.post('/', function(req,res) {
    const fName = req.body.first_name;
    const lName = req.body.second_name;
    const Email = req.body.Email;




    const data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName,
                }
            }
        ]
    }

    
    const jsonData = JSON.stringify(data);
   
    const url = "https://us21.api.mailchimp.com/3.0/lists/1b0f757cd6";
    const option = {
        method: "POST",
        auth: "House:a5e46a72317b71fee52ea476362f76c02-us21",
    }

    
    const request = https.request(url,option, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/fail.html")
        }


        response.on("data" , function(data) {
            console.log(JSON.parse(data));
        });

    })


request.write(jsonData);
request.end();

    })


app.post('/fail', function(req,res) {
    res.redirect("/")
})


app.listen(process.env.PORT || 5000, () => {
    console.log("This port is running on port 5000");
})






//5e46a72317b71fee52ea476362f76c02-us21