"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_infor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor_infor.init(
    {
      doctorId: DataTypes.INTEGER,
      priceId: DataTypes.INTEGER,
      provinceId: DataTypes.INTEGER,
      paymentId: DataTypes.INTEGER,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.TEXT,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_infor",
    }
  );
  return Doctor_infor;
};
