module.exports = function(sequelize, DataTypes){
	var definition = sequelize.define('definition', {
		description: DataTypes.STRING,
		logType: DataTypes.STRING,
		owner: DataTypes.INTEGER
	});

	return definition;
}