const config = {
    name: "BorderGuruSolution",
    host: "",
    port: process.env.PORT || 8080,
    version: "1.0.0",
    database: {
        mongo: {
            url: "mongodb://localhost/",
            db: "border_guru_database"
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