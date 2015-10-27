var Sequelize = require('sequelize');
module.exports =  function () {	
	return {
		Sequelize  : Sequelize,
		oSequelize : new Sequelize('mysql://root:123@localhost/imp')
	};
}