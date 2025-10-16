import { defineConfig } from "vite";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";
import replace from "@rollup/plugin-replace";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(({ mode }) => {
  const game = process.env.VITE_GAME || "sailsofgold"; // default game
  const gameType = process.env.VITE_GAME_TYPE || "videoslot"; // default game type/folder
  const gameRoot = resolve(__dirname, `src/games/${gameType}/${game}`);
  // POSIX path for globs (vite-static-copy prefers '/')
  const gameRootPosix = gameRoot.replace(/\\/g, "/");

  const isDebug = process.env.DEBUG === "true" ? true : false;
  const queryParams = isDebug
    ? "?pid=8872&gameid=100310&lang=en_GB&practice=0&brand=&ctx=&jurisdiction=&platform=megaton&currency=EUR&country=&channel=mobile&debug=1"
    : "";

  return {
    base: `./`,
    publicDir: false,
    resolve: {
      alias: {
        "@gl": resolve(__dirname, "./src/framework"),
        "@shared": resolve(__dirname, "./src/shared"),
        "@games": resolve(__dirname, "./src/games"),
      },
    },
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          CANVAS_RENDERER: JSON.stringify(true),
          WEBGL_RENDERER: JSON.stringify(true),
        },
      }),
      viteStaticCopy({
        targets: [
          { src: "resources/common", dest: "../../resources" },
          { src: "resources/lang", dest: "../../resources" },
          {
            src: `resources/games/${gameType}/${game}`,
            dest: `../../resources/games/${gameType}`,
          },
          {
            src: `resources/gamelibs/${gameType}`,
            dest: `../../resources/gamelibs/${gameType}`,
          },
        ],

        // targets: [
        //   {
        //     src: `./assets/**/*`,
        //     dest: `assets`
        //   }
        // ]
      }),
    ],
    server: {
      port: 8080,
      open: `/${queryParams}`, // will open the chosen game's index.html
      allowedHosts: ["bod.n0mad3n.xyz", "bodtest.lydrst.com"],
    },

    build: {
      lib: {
        entry: resolve(gameRoot, "main.ts"),
        name: `${game}_entry`, // global var if needed
        formats: ["umd"], // IMPORTANT → ESM bundle
        fileName: () => `${game}.bundle.js`,
      },
      outDir: `dist/games/${game}`,
      rollupOptions: {
        input: resolve(gameRoot, "main.ts"),
        // input: resolve(__dirname, `index.html`),
        output: {
          entryFileNames: `${game}.bundle.js`,
          // manualChunks: {
          //   phaser: ['phaser']
          // }
        },
      },
    },
  };
});
