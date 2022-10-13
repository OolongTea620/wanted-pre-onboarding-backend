const Sequelize = require("sequelize");

const env = process.env.MODE_ENV || "development";

const config = require("../config/config")[env];
const db = {};

const User = require("../models/user");
const Company = require("../models/company");
const Post = require("../models/post");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.Company = Company;

User.init(sequelize);
Post.init(sequelize);
Company.init(sequelize);

User.associate(db);
Post.associate(db);
Company.associate(db);

module.exports = db;
