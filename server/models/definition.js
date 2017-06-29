module.exports = function(seq, DataTypes){
	return seq.define('definition', {
		description: DataType.STRING,
		logType: DataType.STRING,
		owner: DataType.INTEGER
	})
};