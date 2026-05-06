"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config/config");
const mongoose_1 = require("./database/mongoose");
const startServer = async () => {
    await (0, mongoose_1.connectDatabase)();
    app_1.app.listen(config_1.config.app.port, () => {
        // eslint-disable-next-line no-console
        console.log(`Server listening on port ${config_1.config.app.port}`);
    });
};
startServer().catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', error);
    process.exit(1);
});
