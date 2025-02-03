import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.supplierplastik.app",
  appName: "MKS App",
  webDir: "out",
  server: {
    url: "https://b689qkm0-3333.asse.devtunnels.ms", // Replace with your live domain
    cleartext: false, // Enforce HTTPS in production
  },
};

export default config;
