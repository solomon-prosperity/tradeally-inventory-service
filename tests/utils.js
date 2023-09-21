/* eslint-disable import/prefer-default-export */
import config from "config";

export const server = `localhost:${config.get("app.httpPort")}`;
