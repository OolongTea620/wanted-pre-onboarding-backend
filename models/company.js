const Sequelize = require("sequelize");

module.exports = class Company extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        phone: {
          type: Sequelize.STRING(20),
        },
        email: {
          type: Sequelize.STRING(50),
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        moduleName: "Company",
        tableName: "companies",
        paranoid: true, // hard delete 동작허용
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Company.hasMany(db.Post, {
      foreignKey: "recruiter",
      sourceKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
};
