const fs = require("fs");

const logFile = "./logs.txt";

function clearLogs() {
  fs.writeFileSync(logFile, `Starting at: ${new Date().toISOString()}`);
  console.log("Logs cleared");
}

function logger(...args) {
  let toWrite = "";
  if (process.env.TIMESTAMP) toWrite += `${new Date().toISOString()}: `;
  args.forEach((arg) => {
    if (typeof arg === "string" || typeof arg === "number") {
      toWrite += arg;
    } else {
      try {
        const stringified = JSON.stringify(arg);
        toWrite += stringified;
      } catch (e) {
        toWrite += arg;
      }
    }
    toWrite += " ";
  });
  console.log(toWrite);
  fs.appendFileSync(logFile, "\n" + toWrite);
}

module.exports = { clearLogs, logger };
