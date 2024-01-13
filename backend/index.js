const express = require("express");
const multer = require('multer');
const csvParser = require('csv-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const txn_data = require('./models/CardTransection');
const authRoutes = require("./routes/auth");
const studMenu = require("./routes/menuRoute");
const txn = require("./routes/txn");
const userRouter = require("./routes/userRouter");
const fs = require('fs');
const exceljs = require('exceljs');
const moment = require('moment');



// Connect to MongoDB Atlas
mongoose
  .connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));

const app = express();
app.use(cors({
  origin: [`http://${process.env.SERVER_NAME}`, 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  exposedHeaders: ["Set-Cookie"],
  }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});



  app.use(
    session({
      secret: '987654321',
      resave: true,
      saveUninitialized: false,
      cookie: {
        domain: 'localhost',
        path: '/',
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
        httpOnly: true,
        secure: false
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_CONNECTION_STRING,
        collection: 'sessions',
        touchAfter: 24 * 60 * 60, // 24 hours in seconds
        autoRemove: 'native',
      })
    })
  );
  
  // console.log(mongoose.);
// const userinfo = new userInfo(
//   {
//   id : "12241180",
//   name :"Nishant",
//   email : "nishant@gmail.com",
//   mess : "Galav",
//   remaining_amount : 10000,
//   total_amout : 20000
// },
//  {
//    id : "12241190",
//    name :"Nishchay",
//    email : "nishchay@gmail.com",
//    mess : "Shree sai",
//    remaining_amount : 1000,
//    total_amout : 2000
//  }

// );

// userinfo.save()
// .then(()=>{
//   console.log("success");
// })
// const userinfoSchema = new mongoose.Schema({
//   id : { type: String, unique :true, default : "12241180"},
//   name : { type : String, required : true ,default : "Nishant"},
//   email : {type : String, required : true , default : "nishant@gmail.com"},
//   mess : {type : String, default :"Galav"},
//   remaining_amount :{type : Number, default : 1000},
//   total_amout : {type : Number , default : 20000}
// });
// userinfoSchema.save()
//   .then(()=> {
//       console.log("save");
//   })
// mongoose.model("userinfo", userinfoSchema);
// mongoose.save();

// const menuData = new galavMenu({

  
//   name: 'Sunday',
//   meals: [
//     {
//       type: 'Breakfast',
//       items: [
//         { name: 'Pancakes', price: 6.99, type: 'Veg', category: 'AddOn' },
//         { name: 'Sausage Links', price: 5.99, type: 'NonVeg', category: 'AddOn' },
//         { name: 'Fruit Salad', price: 4.99, type: 'Veg', category: 'Basic' },
//       ],
//     },
//     {
//       type: 'Lunch',
//       items: [
//         { name: 'Beef Stew', price: 12.99, type: 'NonVeg', category: 'Basic' },
//         { name: 'Vegetable Soup', price: 10.99, type: 'Veg', category: 'Basic' },
//         { name: 'Garlic Bread', price: 3.99, type: 'Veg', category: 'AddOn' },
//         { name: 'Iced Tea', price: 3.99, type: 'Veg', category: 'Basic' },
//       ],
//     },
//     {
//       type: 'Snacks',
//       items: [
//         { name: 'Nachos', price: 4.99, type: 'Veg', category: 'AddOn' },
//         { name: 'Chicken Wings', price: 8.99, type: 'NonVeg', category: 'Basic' },
//         { name: 'Cucumber Salad', price: 4.99, type: 'Veg', category: 'Basic' },
//       ],
//     },
//     {
//       type: 'Dinner',
//       items: [
//         { name: 'Grilled Salmon', price: 14.99, type: 'NonVeg', category: 'Basic' },
//         { name: 'Vegetable Stir-Fry', price: 11.99, type: 'Veg', category: 'Basic' },
//         { name: 'Mashed Potatoes', price: 4.99, type: 'Veg', category: 'AddOn' },
//         { name: 'Chocolate Cake', price: 6.99, type: 'Veg', category: 'AddOn' },
//       ],
//     }
//   ]

// });

// const menuData = new txn_data({
//   account_to: "12241170",
//   account_from: "IIT BHILAI",
//   amount: "25",
//   trns_type: "Card",
//   trns_date: "2023-09-11T12:01:00.000+00:00",
//   trns_mode: "online",
//   trns_reference: "IITBH06",
//   remark: ""
// })
// Save the data to the database
// menuData.save()
//   .then(() => {
//     console.log('Menu data saved successfully.');
//   })
//   .catch((err) => {
//     console.error('Error saving menu data:', err);
//   })

// Use API routes

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  const csvData = [];

  if (req.file.mimetype === 'text/csv') {
    // Handle CSV file
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (row) => {
        // Parse date strings to Date objects using moment
        row.transaction_date = moment(row.transaction_date, 'DD-MM-YYYY HH:mm').toDate();
        row.record_date = moment(row.record_date, 'DD-MM-YYYY HH:mm').toDate();
        
        csvData.push(row);
      })
      .on('end', async () => {
        await processDataAndInsertIntoDB(csvData, res);
      });
  } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    // Handle Excel file
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(req.file.path);

    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow((row) => {
      const excelRow = {};
      row.eachCell((cell, colNumber) => {
        // Parse date strings to Date objects using moment
        excelRow[`column${colNumber}`] = colNumber <= 2 ? moment(cell.value, 'DD-MM-YYYY HH:mm').toDate() : cell.value;
      });
      csvData.push(excelRow);
    });

    await processDataAndInsertIntoDB(csvData, res);
  } else {
    return res.status(400).send('Unsupported file format');
  }
});

async function processDataAndInsertIntoDB(data, res) {
  // Insert data into MongoDB schema
  const YourModel = require('./models/Transaction'); // Adjust the path based on your file structure

  try {
    await YourModel.insertMany(data);
    return res.status(200).send('File uploaded and data inserted into MongoDB');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
}
app.use("/api/auth", authRoutes);
app.use((req, res, next) => {
  if (req.session.userId) {    
    next(); // Call the next middleware
  } else {
    console.log('session expired');
    return res.status(401).json("Session Expired! Login again!"); // Set status to 401 as Unauthorized and send an empty response
    // res.redirect('/login'); // Redirect to the login page
  }
});
app.use("/api/verify", userRouter);
app.use("/api/menu", studMenu);
app.use("/api/txn", txn);
app.use("/api/stud", studMenu);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
module.exports = mongoose;
