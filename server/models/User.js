const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://sahilkhan86025:QxGXAOs1ywPsJLPt@cluster0.glzm26i.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const userSchema = new mongoose.Schema({
  name: {
   
      type: String,
      required: true,
      trim: true,
   
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },

 password: {
  type: String,
  required: true,
  minlength: 6,
 },

  phone: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Others'],
  },
  enquiry: {
    type: String,
    enum: ['Linkedin', 'Friends', 'Job Portal', 'Others'],
  },
  city: {
    type: String,
    enum: ['Mumbai', 'Pune', 'Ahmedabad'],
  },
  state: {
    type: String,
    enum: ['Gujrat', 'Maharashtra', 'Karnataka'],
  },

},
{
  timestamps: true, 
});

const User = mongoose.model("User", userSchema);

module.exports = User;
