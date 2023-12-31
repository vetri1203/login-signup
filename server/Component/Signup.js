import { UserDetails } from "../Schema/UserDetails.js";
import bcrypt from "bcrypt";
import jsonToken from "jsonwebtoken";

export const Signup = async (req, res) => {
  try {
    const { eMail, phoneNumber, password, firstName, lastName } = req.body;

    if (!eMail || !phoneNumber || !password || !firstName || !lastName) {
      return res.status(202).json({ message: "All feilds are required" });
    } else {
          // Check if the user exists in the database
      const user = await UserDetails.findOne({ eMail: eMail });

      if (user) {
            // User with the given email is already exists 
        return res.status(409).json({ message: "User already exists" });
      } else {
        //encrypting the user password
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password, salt);
        //creating user user account 
        const newuser = await new UserDetails({
          eMail: eMail,
          password: hashpassword,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
        });
        try {
          await newuser.save();
          if (newuser) {
            //stored user details in DB
            return res.status(201).json({ message: "signup successful." });
          } else {
            return res.status(402).json({ message: "unable to signup" });
          }
        } catch (error) {
          //DB error
          console.log(error);
          return res.status(500).json({ message: "Internal server error" });
        }
      }
    }
  } catch (error) {
    //validation or other errors
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
 