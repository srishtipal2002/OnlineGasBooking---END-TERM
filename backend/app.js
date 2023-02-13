const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// require database connection
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const Booking = require("./db/Booking");
const Connections = require("./db/Connection");
const Transfers = require("./db/Transfer");
const auth = require("./auth");

// execute database connection
dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword,
        address: request.body.address,
        connection:request.body.connection,
        employee:request.body.employee,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

app.post("/book", (request, response) => {
  // hash the password
      // create a new user instance and collect the data
      const booking = new Booking({
        name: request.body.name,
        email: request.body.email,
        address: request.body.address,
        payment: request.body.payment
      });

      // save the new user
      booking
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "Booking Created Successfully",
            result,
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating Booking",
            error,
          });
        });
});

app.post("/applyconnect", (request, response) => {
  // hash the password
      // create a new user instance and collect the data
      const connection = new Connections({
        name: request.body.name,
        email: request.body.email,
        address: request.body.address,
      });

      // save the new user
      connection
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "Connection Applied Successfully",
            result,
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error Applying Connection",
            error,
          });
        });
});

app.post("/applytransfer", (request, response) => {
  // hash the password
      // create a new user instance and collect the data
      const Transfer = new Transfers({
        email: request.body.email,
        address: request.body.address,
        naddress: request.body.naddress,
      });

      // save the new user
      Transfer
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "Transfer Request Applied Successfully",
            result,
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error Applying Transfer Request",
            error,
          });
        });
});

app.post("/connect",(request,response)=>{
  User.updateOne(
    {email:request.body.email},{
      $set:{connection:1}
    }
  )
  .then((user)=>{
    response.status(200).send({
      message: "Connection Applied",

    });
  })
  .catch((e)=>{
      response.status(404).send({
        message: "Email not found",
        e,
      });
  })
});
app.post("/transfer",(request,response)=>{
  User.updateOne(
    {email:request.body.email},{
      $set:{address:request.body.naddress}
    }
  )
  .then((user)=>{
    response.status(200).send({
      message: "Connection Applied",
    });
    
  })
  .catch((e)=>{
      response.status(404).send({
        message: "Email not found",
        e,
      });
  })
});

app.post("/deleteconnect",(request,response)=>{
  Connections.remove(
    {email:request.body.email}
  )
  .then((user)=>{
    response.status(200).send({
      message: "Transfer Deleted",
    });
    
  })
  .catch((e)=>{
      response.status(404).send({
        message: "Email not found",
        e,
      });
  })
});
app.post("/deletetransfer",(request,response)=>{
  Transfers.remove(
    {email:request.body.email}
  )
  .then((user)=>{
    response.status(200).send({
      message: "Transfer Deleted",
    });
    
  })
  .catch((e)=>{
      response.status(404).send({
        message: "Email not found",
        e,
      });
  })
});
app.post("/deletebooking",(request,response)=>{
  Booking.remove(
    {email:request.body.email}
  )
  .then((user)=>{
    response.status(200).send({
      message: "Transfer Deleted",
    });
    
  })
  .catch((e)=>{
      response.status(404).send({
        message: "Email not found",
        e,
      });
  })
});



// login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          if(user.employee==1){
          response.status(200).send({
            message: "Admin Login Successful",
            name: user.name,
              email: user.email,
              address: user.address,
              connection: user.connection,
              employee: user.employee,
            token,
          });
         }
          else{
            response.status(200).send({
              message: "User Login Successful",
              name: user.name,
              email: user.email,
              address: user.address,
              connection: user.connection,
              employee: user.employee,
              token,
            });
          }
        })
        // catch error if password do not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});



// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});

app.post("/display",(request,response)=>{
  User.find()
   .then((user)=>{
    response.status(200).send({
      message: "data displayed",
      result:user,
    });
   })
   .catch((e)=>{
    response.status(404).send({
      message: "something went wrong",
      e,
    });
   })
})
app.post("/displaybooking",(request,response)=>{
  Booking.find()
   .then((user)=>{
    response.status(200).send({
      message: "data displayed",
      result:user,
    });
   })
   .catch((e)=>{
    response.status(404).send({
      message: "something went wrong",
      e,
    });
   })
})
app.post("/displaytransfer",(request,response)=>{
  Transfers.find()
   .then((user)=>{
    response.status(200).send({
      message: "data displayed",
      result:user,
    });
   })
   .catch((e)=>{
    response.status(404).send({
      message: "something went wrong",
      e,
    });
   })
})
app.post("/displayconnections",(request,response)=>{
  Connections.find()
   .then((user)=>{
    response.status(200).send({
      message: "data displayed",
      result:user,
    });
   })
   .catch((e)=>{
    response.status(404).send({
      message: "something went wrong",
      e,
    });
   })
})


















module.exports = app;
