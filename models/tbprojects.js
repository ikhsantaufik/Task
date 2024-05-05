'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbProjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbProjects.init({
    nameProjects: DataTypes.STRING,
    duration: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    description: DataTypes.STRING,
    techbox: DataTypes.STRING,
    file: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbProjects',
  });
  return tbProjects;
};