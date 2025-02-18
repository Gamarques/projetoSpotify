import app from "./app.js";
import connect from "./src/configs/connect.js";
import server from "./src/configs/server.js";


connect();

app.listen(server.PORT, () => {
    console.log(`Server is running on port ${server.PORT} in ${server.env} mode`);
});
