import db from "../models/index";
import CRUDservice from "../services/CRUDservice";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
let getCRUB = async (req, res) => {
  try {
  } catch (error) {
    console.send(error);
  }
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  try {
    let message = await CRUDsevice.creatNewUser(req.body);
    console.log(req.body);
    console.log(message);
  } catch (error) {
    console.log(error);
  }
  return res.send("post crud");
};
let displayGetCRUD = async (req, res) => {
  let data = await CRUDsevice.getAllUser();
  return res.render("getCRUD.ejs", {
    dataTable: data,
  });
};
// let getAboutPage = (req, res) => {
//   return res.render("test/about.ejs");
// };
let updataCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let useData = await CRUDsevice.getUserInforId(userId);
    return res.render("updataCRUD.ejs", {
      id: userData,
    });
  } else {
    return res.send("id not default?");
  }
};
let pustCRUD = async (rep, res) => {
  let data = rep.body;
  let allUser = await CRUDservice.updateUderData(data);
  console.log("pust thanh cong");
};
let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDservice.deleteUderId(id);
    return res.send("delete success");
  } else {
    return res.send("user not found");
  }
};
module.exports = {
  getHomePage,
  // getAboutPage,
  getCRUB,
  postCRUD,
  displayGetCRUD,
  updataCRUD,
  pustCRUD,
  deleteCRUD,
};
