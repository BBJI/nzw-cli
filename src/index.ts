#!/usr/bin/env node
import path from "path";
import fs from "fs";
import inquirer from "inquirer";
import { Command } from "commander";
import * as memFs from "mem-fs";
import * as editor from "mem-fs-editor";
import { fileURLToPath } from "url";
import logger from "./utils/logger";

// 定义 __filename 和 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const store = memFs.create();
const _fs = editor.create(store);
const program = new Command();

program.version("1.0.0").description("nzw脚手架");

// 提示填写信息
const questions: any[] = [
  {
    type: "input",
    name: "projectName",
    message: "请输入项目名称",
    validate(val) {
      if (val) {
        return true;
      } else {
        return "项目名称不能为空，请重新输入";
      }
    },
  },
  {
    type: "list",
    name: "templateName",
    message: "请选择模板",
    choices: ["react-tpl", "vue-tpl"],
    default: "react-tpl", // 可选：设置默认选项
  },
];
// 创建项目
const createProject = async () => {
  const { projectName, templateName } = await inquirer.prompt(questions);
  // 创建应用路径
  const projectPath = path.resolve(process.cwd(), projectName);
  // 模板目录
  const templatePath = path.resolve(__dirname, "templates", templateName);
  // 已存在项目名
  if (fs.existsSync(projectPath)) {
    logger.error(`当前目录存在项目 ${projectName}`);
    return;
  }
  // 创建项目文件
  fs.mkdirSync(projectPath);
  _fs.copyTpl(templatePath, projectPath, { projectName });
  _fs.commit((stream: any) => {
    logger.success(`项目 ${projectName} 创建成功`);
    return stream;
  });
};

program
  .command("create")
  .description("创建一个新项目")
  .action(() => {
    createProject();
  });

program.parse(process.argv);
