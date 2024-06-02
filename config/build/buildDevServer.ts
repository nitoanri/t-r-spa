import { BuildOptions } from "./types/config";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export function buildDevServer(opitons: BuildOptions): DevServerConfiguration {
  return {
    port: opitons.port,
    open: true,
    historyApiFallback: true,
  };
}
