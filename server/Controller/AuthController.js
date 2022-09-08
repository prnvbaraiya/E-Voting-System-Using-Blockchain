import User from "../Models/User.js";
import Election from "../Models/Election.js";
import Candidate from "../Models/Candidate.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";

// http://localhost:5000/api/auth/register
//
// {
//     "username":"prnv",
//     "email":"abc@gmail.com",
//     "mobile":"1111111111",
//     "location":"120",
//     "password":"123"
//     }

//User
export const register = {
  validator: async (req, res, next) => {
    next();
  },
  controller: async (req, res) => {
    try {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        location: req.body.location,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
      });

      const mailContent = "Thank You For Joining the Voting System";

      const mailSubject = "Welcome Mail";

      const findUser = await User.findOne({ email: req.body.email });
      //Try to use newUser

      if (sendMail(mailContent, mailSubject, findUser)) {
        return res.status(201).send("Email Sent");
      } else {
        return res.status(301).send("Email Sending Failed");
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send("Registeration Failed");
    }
  },
};

export const login = {
  validator: async (req, res, next) => {
    next();
  },
  controller: async (req, res) => {
    try {
      const findUser = await User.findOne({
        username: req.body.username,
      });

      if (!findUser) {
        return res.status(401).send("Invalid Username");
      }

      if (findUser.password !== req.body.password) {
        return res.status(401).send("Invalid Password");
      }

      const accessToken = JWT.sign(
        {
          id: findUser._id,
        },
        process.env.JWT_SEC_KEY,
        { expiresIn: "3d" }
      );

      res.cookie("votingsystem", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      const { password, ...others } = findUser._doc;

      return res.status(201).json({
        success: true,
        ...others,
        accessToken,
      });
    } catch (e) {
      return res.status(500).send("Server Error");
    }
  },
};

export const users = {
  controller: async (req, res) => {
    try {
      const tmp = await User.find();
      return res.status(201).send(tmp);
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
};

export const userDelete = {
  controller: async (req, res) => {
    try {
      const tmp = await User.findByIdAndDelete(req.params.userid);
      return res.status(200).send("User Deleted Successfully");
    } catch (e) {
      console.log(e);
      return res.status(500).send("error");
    }
  },
};

export const getUser = {
  controller: async (req, res) => {
    try {
      const tmp = await User.findById(req.params.id);
      return res.status(200).send(tmp);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Error!");
    }
  },
};

export const userAction = {
  delete: async (req, res) => {
    try {
      const tmp = await User.findByIdAndDelete(req.params.id);
      return res.status(200).send(tmp);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Error!");
    }
  },

  edit: async (req, res) => {
    try {
      const user = {
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        fname: req.body.fname,
        lname: req.body.lname,
      };
      const tmp = await User.findByIdAndUpdate(req.params.id, user);
      return res.status(200).send("User Updated Successfully");
    } catch (e) {
      console.log(e);
      return res.status(500).send("error");
    }
  },
};

//Candidate
export const candidateRegister = {
  validator: async (req, res, next) => {
    next();
  },
  controller: async (req, res) => {
    const candidate = await Candidate.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      qualification: req.body.qualification,
      join: req.body.join,
      location: req.body.location,
      description: req.body.description,
    });
    return res.status(201).send("Candidate Added");
  },
};

export const candidates = {
  controller: async (req, res) => {
    const data = await Candidate.find();
    return res.status(201).send(data);
  },
};

export const getCandidate = {
  validator: async (req, res, next) => {
    next();
  },
  controller: async (req, res) => {
    const data = await Candidate.findOne({ username: req.params.username });
    if (data == null) {
      return res.status(500).send("Candidate Not Found");
    }
    return res.status(201).send(data);
  },
};

export const phase = {
  controller: async (req, res) => {
    const data = await Election.findByIdAndUpdate(req.params.id, {
      currentPhase: req.body.currentPhase,
    });
    console.log(data);
    return res.status(200).send(data);
  },
  getPhase: async (req, res) => {
    const data = await Election.findById(req.params.id);
    return res.status(200).send(data);
  },
};

//Election

export const electionRegister = {
  validator: async (req, res, next) => {
    next();
  },
  controller: async (req, res) => {
    try {
      const newElection = await Election.create({
        name: req.body.name,
        candidates: req.body.candidates,
      });
      return res.status(201).send("Election Successfully Added");
    } catch (e) {
      return res.status(500).send("Internal Error" + e);
    }
  },
};

export const elections = {
  controller: async (req, res) => {
    try {
      const tmp = await Election.find();
      return res.status(201).send(tmp);
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
};

const sendMail = async (mailContent, mailSubject, user) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: mailSubject,
    text: mailContent,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return false;
    } else {
      return true;
    }
  });
};
