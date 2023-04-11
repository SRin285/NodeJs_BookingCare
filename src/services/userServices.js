import { hash } from "bcrypt";
import db from "../models/index";
import bcrypt from "bcryptjs";
let salt = bcrypt.genSaltSync(10);

let hashUserPassWord = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassWord = await bcrypt.hashSync(password, salt);
      resolve(hashPassWord);
    } catch (error) {
      reject(error);
    }
  });
};
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"],
          where: {
            email: email,
          },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "succes";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "worong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "user not found";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Your email ins't in your systeam.";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
// let compareUserPassword = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: {
            id: userId,
          },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "your email is already in used,plz another email!",
        });
      } else {
        let hashPassWordFromBcrypt = await hashUserPassWord(data.password);
        await db.User.create({
          email: data.email,
          password: hashPassWordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender === "1" ? true : false,
          roleId: data.roleId,
        });
        resolve({
          errCode: 0,
          errMessage: "oke create user",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "the user is not exist",
      });
    }
    await db.User.destroy({
      where: {
        id: userId,
      },
    });
    resolve({
      errCode: 0,
      message: "the user delete succed",
    });
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: " Missing requirred parameter",
        });
      }
      let user = await db.User.findOne({
        where: {
          id: data.id,
        },
        raw: false,
      });
      if (user) {
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.address = data.address);
        await user.save();
        // await db.User.save({
        //   firstName: data.firstName,
        //   lastName: data.lastName,
        //   address: data.address,
        // });
        resolve({
          errCode: 0,
          message: " update the user succed",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "user not found!",
        });
      }
      await db.User.update({});
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin,
  getAllUser,
  createNewUser,
  deleteUser,
  updateUserData,
};