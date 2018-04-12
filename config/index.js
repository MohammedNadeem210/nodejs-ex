var configValues=require('./config');

module.exports={
    getDbConnectionString:function() {
        return 'mongodb://' +configValues.userName +':'+configValues.password+'@ds139919.mlab.com:39919/nodetodo'; 

    }
}