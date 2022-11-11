import { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize } from "@capacitor/keyboard";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "coffee-styling",
  webDir: "build",
  bundledWebRuntime: false,
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Body,
      style: "dark",
      resizeOnFullScreen: true,
    },
  },
};

export default config;
