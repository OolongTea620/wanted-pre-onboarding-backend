const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(),
          allowNull: false, // allowNull == NOT NULL
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        moduleName: "User",
        tableName: "users",
        paranoid: false, // hard delete 동작허용
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.belongsToMany(db.Post, {
      through: "Apply",
      onDelete: "CASCADE",
    });
  }
};
