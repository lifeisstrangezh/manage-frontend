import { presetTypography, presetUno } from 'unocss';
import UnoCSS from 'unocss/vite';
import { type UserConfig } from 'vite';

const commonConfig: UserConfig = {
  server: {
    host: true,
  },
  esbuild: {
    // 配置加上之后开发环境不能调试了 所以先去掉
    // drop: ['console', 'debugger'],
  },
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      // TODO: Prevent memory overflow
      maxParallelFileOps: 3,
    },
  },
  plugins: [
    UnoCSS({
      presets: [presetUno(), presetTypography()],
    }),
  ],
};

export { commonConfig };
