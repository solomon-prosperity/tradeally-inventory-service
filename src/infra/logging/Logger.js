import logger from "pino";
import dayjs from "dayjs";

const Logger = logger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default Logger;
