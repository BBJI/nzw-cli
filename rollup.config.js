import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import del from "rollup-plugin-delete";
import ora from "ora";
import { visualizer } from "rollup-plugin-visualizer";
import cpy from "cpy";

const spinner = ora("Building...");

export default {
  input: "src/index.ts", // 入口文件
  output: [
    {
      file: "lib/index.js", // ES Module 格式输出
      format: "esm",
    },
  ],
  plugins: [
    del({ targets: "lib/*" }), // 确保在其他操作之前清理输出目录
    typescript({
      tsconfig: "./tsconfig.json", // 使用现有的 tsconfig.json
      useTsconfigDeclarationDir: true, // 使用 tsconfig.json 中的声明文件输出目录
      check: false, // 禁用类型检查
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: false, // 关闭 sourcemap 生成
        },
      },
    }),
    terser(), // 可选：用于压缩输出代码
    {
      name: "ora-loader",
      buildStart() {
        spinner.start();
      },
      async generateBundle() {
        // 在所有文件生成后调用
        spinner.succeed("Build completed!");
      },
      buildError(error) {
        spinner.fail(`Build failed: ${error}`);
      },
    },
    {
      name: "custom-copy",
      async buildEnd() {
        await cpy(["templates/**/*", "!**/node_modules/**"], "lib/templates", {
          parents: true,
          concurrency: 8,
          overwrite: false,
        });
      },
    },
    visualizer({
      filename: "packAnalysis.html", // 输出的文件名
      open: false, // 自动打开浏览器查看报告
    }),
  ],
};
