import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import ora from "ora";

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
    }),
    terser(), // 可选：用于压缩输出代码
    copy({
      targets: [
        { src: "templates/**/*", dest: "lib/templates" }, // 复制文件
      ],
      filter: (src) => !src.includes("node_modules"),
    }),
    {
      name: "ora-loader",
      buildStart() {
        this.spinner = ora("Building...").start();
      },
      async generateBundle() {
        // 在所有文件生成后调用
        this.spinner.succeed("Build completed!");
      },
      buildError(error) {
        this.spinner.fail("Build failed!");
        console.error(error);
      },
    },
  ],
};
