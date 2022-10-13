const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        position: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        haegin: {
          // 채용 보상금
          type: Sequelize.SMALLINT.UNSIGNED,
          allowNull: true,
          defaultValue: 0,
        },
        skill: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        moduleName: "Post",
        tableName: "posts",
        paranoid: true, // hard delete 동작허용
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.Company, {
      foreignKey: "recruiter",
      targetKey: "id",
    });
    db.Post.belongsToMany(db.User, {
      through: "Apply",
      OnDelete: "CASCADE",
    });
  }
};
