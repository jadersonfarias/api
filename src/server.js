require("express-async-errors");
require("dotenv/config");

const migrationsRun = require("./database/sqlite/migrations");
const uploadConfig = require("./configs/upload")
const cors = require("cors")

const appError = require("./utils/appError")
const express = require("express");

const routes = require("./routes")


migrationsRun();

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))


app.use(( error, request, response, next) => {
    if(error instanceof appError){     //lado do cliente
        return response.status(error.statuscode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        status: "error",
        message: "internal serve error",
    });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`let,s go: ${PORT}`))



/*node --watch*/