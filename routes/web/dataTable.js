const router = require("express").Router();
const  dataTable  = require("../../controllers/dataTable.controller");


// User.find()
//  .then(users => {
//     router.get("/", (req, res) => {
//     res.render("dataTable", { users });
//   });
//   })
//  .catch(err => {
//     console.log(err);
//   });

// router.get("/", (req, res) => {
//     res.render("dataTable");
//   });
    router.get("/", (req, res) => {
    res.render("dataTable", dataTable);
  });

module.exports = router;