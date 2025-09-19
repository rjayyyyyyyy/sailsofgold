import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from "vite-plugin-static-copy";
import replace from "@rollup/plugin-replace";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(({ mode }) => {
  const game = process.env.VITE_GAME || 'bookofdead'; // default game
  const gameType = process.env.VITE_GAME_TYPE || 'slotgame'; // default game type/folder
  const gameRoot = resolve(__dirname, `src/games/${gameType}/${game}`);
  // POSIX path for globs (vite-static-copy prefers '/')
  const gameRootPosix = gameRoot.replace(/\\/g, '/');

    const isDebug = process.env.DEBUG === "true" ? true : false;
    const queryParams = isDebug ? "?pid=100301&gid=bookofdead&lang=en_GB&currency=CNY&practice=0&user=1513-984I62U184G763O&channel=mobile&brand=carnival&ctx=ipcelectron&embedmode=iframe&origin=https%3A%2F%2Flauncher.lydrst.com&debug=1" : "";
  
  return {
    base: `./`,
    publicDir: false,
    resolve: {
      alias: {
        '@gl': resolve(__dirname, './src/framework'),
        '@shared': resolve(__dirname, './src/shared'),
        '@games': resolve(__dirname, './src/games'),
      }
    },
    plugins: [
      replace({
      preventAssignment: true,
      values: {
        CANVAS_RENDERER: JSON.stringify(true),
        WEBGL_RENDERER: JSON.stringify(true)
      }
    }),
    viteStaticCopy({
      targets: [
        {
          src: `./assets/**/*`,
          dest: `assets`
        }
      ]
    })
  ],
    server: {
      port: 8080,
      open: `/${queryParams}`, // will open the chosen game's index.html
      allowedHosts: ['bod.n0mad3n.xyz', 'bodtest.lydrst.com'],
    },

    build: {
      outDir: `dist/${game}`,
      rollupOptions: {
        // input: resolve(__dirname, `/src/games/slotgame/${game}/index.html`)
        input: resolve(__dirname, `index.html`)
      }
    },
  };
});