import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { formatToJSON, generateAccessToken } from "../utils/commonMethods.js";
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

const getAllUsers = asyncHandler(async (req, res) => {
  let allUsers = formatToJSON(await User.findAll({
    where: {
      id: {
        [Op.ne]: req.user?.id
      }
    },
    attributes: [
      'id',
      'fullname',
      'email'
    ]
  }));

  if(!allUsers)
    throw new Error("Couldn't fetch the user list. Some error occured!");

  return res.status(200)?.json({
    success: true,
    users: allUsers,
    msg: "All users have been fetched successfully."
  });
});

const createNewUser = asyncHandler(async (req, res) => {
  let { 
    firstname,
    lastname,
    email,
    password
  } = req.body;

  let newUserObj = {
    firstname,
    lastname,
    fullname: `${firstname} ${lastname}`,
    email,
    password
  };

  let newUser = formatToJSON(await User.create(newUserObj));

  if(!newUser) {
    throw new Error("Unable to create new user. Some error occured!");
  }

  let { accessToken } = generateAccessToken({id: newUser?.id, fullname: newUser?.fullname, email: newUser?.email});

  let cookieOptions = {
    httpOnly: true,
    secure: true
  };

  let user = formatToJSON(await User.findOne({
    where: {
      email: email,
    }, 
    attributes: [
      'id',
      'fullname',
      'email',
      'isAdmin'
    ]
  }))

  return res.status(201)?.cookie("accessToken", accessToken, cookieOptions).json({
    success: true,
    user,
    accessToken,
    msg: "A new user has been created successfully."
  })
});

const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  let user =  formatToJSON(await User.findOne({
    where: {
      id: userId
    },
    attributes: [
      'id',
      'firstname',
      'lastname',
      'email'
    ]
  }));

  if(!user)
    throw new Error("Unable to fetch user. Some error occured!");

  return res.status(201)?.json({
    success: true,
    user,
    msg: "User has been fetched successfully."
  });
});

const updateUserById = asyncHandler(async (req, res) => {

  const { firstname, lastname, email, id: userId } = req.body;

  let isUpdated = await User.update({
    firstname,
    lastname,
    fullname: `${firstname} ${lastname}`,
    email
  }, {
    where: {
      id: userId
    }
  });

  console.log("is updated:::", isUpdated);

  if(isUpdated?.[0] === 0) {
    throw new Error("Unable to update user. Some error occured!");
  } 

  return res.status(201)?.json({
    success: true,
    msg: "User has been updated successfully."
  });
});

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  let user = formatToJSON(await User.findOne({
    where: {
      email
    },
  }));

  if(!user)
    throw new Error("Couldn't login. Invalid email or password!");

  let isValidPassword = await bcrypt.compare(password, user?.password);

  if(!isValidPassword)
    throw new Error("Couldn't login. Invalid email or password!");

  let { accessToken } = generateAccessToken({ id: user?.id, email: user?.email, fullname: user?.fullname });
  let cookieOptions = {
    httpOnly: true,
    secure: true
  }

  user = formatToJSON(await User.findOne({
    where: {
      email
    },
    attributes: [
      'id',
      'fullname',
      'email',
      'isAdmin'
    ]
  }))

  return res.status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    ?.json({
      success: true,
      user,
      accessToken,
      msg: "User logged in successfully."
    });
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json({
      success: true,
      msg: "User logged out successfully."
    });

});

export {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUserById,
  loginUser,
  logoutUser
}