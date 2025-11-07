// client/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ⚠️ Vendos saktë emrin e repo-s si shfaqet në GitHub (me të njëjtat shkronja)
export default defineConfig({
  plugins: [react()],
  base: "/KarrieraAL/", // nqs repo-ja është KarrieraAL; ndryshe zëvendësoje
});
