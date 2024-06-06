import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import "dotenv/config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	preview: {
		host: true,
		port: 3000
	}
});
