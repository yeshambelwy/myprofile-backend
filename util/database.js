const Sequelize = require('sequelize'); // declare a constructor function which is                                           

//Passing parameters 
const sequelize = new Sequelize(
                          "node_complete", //online database name 
                          "root", // root name in other words username 
                          "jica2017", //password for the online database
                          {
                            dialect: "mysql", 
                            host: "localhost" //paste the server name here instead of localhost
                           });
// check the databse connection
sequelize
  .authenticate() //.authenticate() function to test if the connection is OK:
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

//export database for use in other files.
module.exports = sequelize;
