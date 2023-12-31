import { UserDetails } from "../Schema/UserDetails.js";
import dotenv from "dotenv";

import bcrypt from "bcrypt"; // to encrypt and decrypt the password.
import jsontoken from "jsonwebtoken"; //to protect the data while sending the data to front-end.
dotenv.config();

export const Login = async (req, res) => {
  try {
    const { eMail, password } = req.body;

    if (!eMail) {
      return res.status(202).json({ message: "every feild is required" });
    } else {
      if (!password) {
        return res.status(202).json({ message: "every feild is required" });
      } else {
        try {
          // Check if the user exists in the database
          const user = await UserDetails.findOne({ eMail: eMail });
          if (user) {
            // User with the given email exists 

            //decryt the password and compare it.
            const checkPassword = await bcrypt.compare(password, user.password);

            if (checkPassword) {
              //user with correct passwprd
              const token = jsontoken.sign(
                { userId: user._id, eMail: user.eMail },
                process.env.JSON_TOKEN
              );

              return res.status(200).json({ token });
            } else {
              // User with worng password
              return res.status(401).json({ message: "Incorrect password" });
            }
          } else {
            //no user in DB
            return res.status(404).json({ message: "No user found" });
          }
        } catch (error) {
          //DB error
          return res.status(500).send(error);
        }
      }
    }
  } catch (error) {
    //validation or other errors
    console.log(error);
    return res.status(500).json({ message: "Internal server error from 1st" });
  }
};
