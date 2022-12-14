const mongoose = require("mongoose");

const DBConnect = async () => {
    try {
        console.log(process.cwd());
        mongoose.set('strictQuery', true)
        mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }, {server:{auto_reconnect:true}});
    } catch (err) {
        console.error(err);
    }
}; 
DBConnect();
module.exports = DBConnect;
