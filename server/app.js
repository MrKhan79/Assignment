const express = require("express");
// const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// app.use(express.static(path.join(__dirname, './build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './build/index.html'));
// });

const User = require("./models/User");



app.post("/signup", async (req, res) => {
  const { email, password, name, phone, gender, city, state, enquiry } = req.body;
  

  try {
    const user = new User({name, email, password, phone, gender, city, state, enquiry  });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});



app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      const token = jwt.sign({ email }, "your-secret-key", {
        expiresIn: "1h",
      });
      const name = user.name;

      res.json({ message: "Login successful", token, name  });
    } else {
      console.log("yaha hai");
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error during login" });
  }
});

app.get('/users', async (req, res) => {

 

  try {
    let sortOption;
    let filterOption = {};

    //To Check the sort query parameter
    const sortParam = req.query.sort;
    if (sortParam === 'az') {
      sortOption = { name: 1 }; // A-Z
    } else if (sortParam === 'za') {
      sortOption = { name: -1 }; // Z-A
    } else if (sortParam === 'created') {
      sortOption = { createdAt: 1 }; // Last Created
    } else if (sortParam === 'modified') {
      sortOption = { updatedAt: -1 }; // Last Modified
    }
    
     // To Check the search query parameter
     const searchParam = req.query.search;
     if (searchParam) {
       // Applied case-insensitive search to name, email, or phone
       filterOption = {
         $or: [
           { name: { $regex: new RegExp(searchParam, 'i') } },
           { email: { $regex: new RegExp(searchParam, 'i') } },
           { phone: { $regex: new RegExp(searchParam, 'i') } },
         ],
       };
     }
    // Find all users with specific fields
    const users = await User.find(filterOption, 'name email phone city state _id').sort(sortOption);
       
    // Send the data as a JSON response
    res.json(users);
  } catch (error) {
    console.error('Error retrieving data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // To Check if the user with the given ID exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Delete user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // To Check if the user with the given ID exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    //To Check if the user with the given ID exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    existingUser.name = req.body.name || existingUser.name;
    existingUser.email = req.body.email || existingUser.email;
    existingUser.phone = req.body.phone || existingUser.phone;
    existingUser.city = req.body.city || existingUser.city;
    existingUser.state = req.body.state || existingUser.state;
    existingUser.enquiry = req.body.enquiry || existingUser.enquiry;


    // Save the updated user
    await existingUser.save();

    res.json({ message: 'User updated successfully', user: existingUser });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
});

