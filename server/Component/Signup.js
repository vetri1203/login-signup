import { UserDetails } from "../Schema/UserDetails.js";
import bcrypt from "bcrypt";
import jsonToken from "jsonwebtoken";

export const Signup = async (req, res) => {
  try {
    const { eMail, phoneNumber, password, firstName, lastName } = req.body;

    if (!eMail || !phoneNumber || !password || !firstName || !lastName) {
      return res.status(202).json({ message: "All feilds are required" });
    } else {
      const user = await UserDetails.findOne({ eMail: eMail });

      if (user) {
        return res.status(409).json({ message: "User already exists" });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password, salt);

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
            return res.status(201).json({ message: "signup successful." });
          } else {
            return res.status(402).json({ message: "unable to signup" });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "Internal server error" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });

  }
};
 