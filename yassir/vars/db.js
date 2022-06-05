const mongojs = require("mongojs");
const dbClient = mongojs("mongodb+srv://yassir:<12345678000>@yassircluster.or5te.mongodb.net/?retryWrites=true&w=majority+re")


  module.exports = dbClient;