import winston from "winston";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(label({ label: "deleivery-api" }), timestamp(), myFormat),
  transports: [
    //new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.log" }),
  ],
});

export default logger;
