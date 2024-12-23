import User from "../models/User";  
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
