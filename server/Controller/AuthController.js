import User from "../Models/User.js";
import Election from "../Models/Election.js";
import Candidate from "../Models/Candidate.js";
import nodemailer from "nodemailer";
import { PythonShell } from "python-shell";

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
        return res.status(202).send("Invalid Username");
      }

      if (findUser.password !== req.body.password) {
        return res.status(202).send("Invalid Password");
      }

      return res.status(201).send("Suucess");
    } catch (e) {
      return res.status(500).send("Server Error");
    }
  },
};

export const users = {
  getUsers: async (req, res) => {
    try {
      const tmp = await User.find();
      return res.status(201).send(tmp);
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
  getUser: async (req, res) => {
    try {
      const tmp = await User.findById(req.params.id);
      return res.status(201).send(tmp);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Error!");
    }
  },
  getUserByName: async (req, res) => {
    try {
      const tmp = await User.find({ username: req.params.id });
      return res.status(201).send(tmp);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Error!");
    }
  },
  delete: async (req, res) => {
    try {
      const tmp = await User.findByIdAndDelete(req.params.id);
      return res.status(201).send(tmp);
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
      return res.status(201).send("User Updated Successfully");
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
  getCandidates: async (req, res) => {
    const data = await Candidate.find();
    return res.status(201).send(data);
  },
  register: async (req, res) => {
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
  getCandidate: async (req, res) => {
    const data = await Candidate.findOne({ username: req.params.username });
    if (data == null) {
      return res.status(500).send("Candidate Not Found");
    }
    return res.status(201).send(data);
  },
  delete: async (req, res) => {
    try {
      const data = await Candidate.findByIdAndDelete(req.params.id);
      return res.status(201).send("Candidate Deleted Successfully");
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
};

export const phase = {
  controller: async (req, res) => {
    const data = await Election.findByIdAndUpdate(req.params.id, {
      currentPhase: req.body.currentPhase,
    });
    // console.log(data);
    return res.status(201).send(data);
  },
};

//Election

export const elections = {
  controller: async (req, res) => {
    try {
      const tmp = await Election.find();
      return res.status(201).send(tmp);
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
  register: async (req, res) => {
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
  getElection: async (req, res) => {
    try {
      const data = await Election.findById(req.params.id);
      return res.status(201).send(data);
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
  voting: async (req, res) => {
    try {
      const tmp = await Election.find({ currentPhase: "voting" });
      return res.status(201).send(tmp);
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
  result: async (req, res) => {
    try {
      const tmp = await Election.find({ currentPhase: "result" });
      return res.status(201).send(tmp);
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
  delete: async (req, res) => {
    try {
      const tmp = await Election.findByIdAndDelete(req.params.id);
      return res.status(201).send("Election Deleted Successfully");
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

export const a = {
  sc: async (req, res) => {
    // return res.status(201).send("YAY PRabac");

    PythonShell.run(
      "D:/study/sem-7/03) 4IT31/Lab/admin-project/server/Controller/fr.py",

      null,
      function (err, result) {
        // console.log(result);
        // console.log("Error : ");
        // console.log(err);
        // console.log("Python script finished");
        if (err) {
          return res.status(500).send("Error While Running Python");
        }

        if (result) {
          return res.status(201).send(result);
        } else {
          return res.status(500).send("No face Match Found");
        }
      }
    );
  },
};

//Voting Mail

export const votingMail = {
  send: async (req, res) => {
    const mailContent =
      "Thank You For The Voting but if it's not you contact admin@votingsystem.com";

    const mailSubject = "Voting Success";

    const findUser = await User.findOne({ _id: req.body.id });

    if (sendMail(mailContent, mailSubject, findUser)) {
      return res.status(201).send("Email Sent");
    } else {
      return res.status(301).send("Email Sending Failed");
    }
  },
};
