let getNavPage = (rep, res) => {
  return res.render("navPage.ejs");
};

let getAbout = (req, res) => {
  return res.render("test/about.ejs");
};

module.exports = {
  getNavPage,
  getAbout,
};
