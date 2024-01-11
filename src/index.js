require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const CronJobModel = require("./models/CronJob");
const RecoverPassModel = require("./models/RecoverPassword");
const routes = require("./routes");
const cron = require("node-cron");

const port = process.env.PORT || 3333;

const app = express();
app.use(express.static("public"));
const corsOptions = {
  exposedHeaders: "X-Total-Count"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);
app.use(errors());

app.use("/", (req, res) => {
  return res.status(200).json({
    notification: "Ok, server MonitoraApp is running!"
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

const cronJobs = async () => {
  const job = await CronJobModel.getAll();
  return job;
};

function stringToInteger(str) {
  return parseInt(str, 10);
}

cronJobs().then((resp) => {
  resp?.forEach((response) => {
    switch (response.type) {
      case "recoverPassword":
        cron.schedule(response.cronExpression, async () => {
          const usuario = stringToInteger(response.additionalData);
          await RecoverPassModel.deleteById(usuario);
          await CronJobModel.deleteById(response.id);
        });
        break;
      default:
        break;
    }
  });
});
