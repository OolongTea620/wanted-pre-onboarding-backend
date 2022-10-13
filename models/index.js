const { connectDB } = require("./connectDB");

const User = require("./user");
const Company = require("./company");
const Post = require("./post");
module.exports = {
  connectDB,
  User,
  Company,
  Post,
};
