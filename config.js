const config = {
    name: "CustomerSolution",
    host: "",
    port: process.env.PORT || 8080,
    version: "1.0.0",
    database: {
        mongo: {
            url: "mongodb://localhost/",
            db: "company_database"
        }
    },
    log: {
        level: {
            file: 'info',
            command: 'trace'
        }
    }
};
module.exports = config;
