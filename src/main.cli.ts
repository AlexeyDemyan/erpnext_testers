#!/usr/bin/env node
import {
  CLIApplication,
  HelpCommand,
  ImportCommand,
  GenerateCommand,
  TestMethodCommand,
  GenerateMarCommand,
} from "./cli/index.js";

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([new HelpCommand()]);
  cliApplication.registerCommands([new ImportCommand()]);
  cliApplication.registerCommands([new GenerateCommand()]);
  cliApplication.registerCommands([new TestMethodCommand()]);
  cliApplication.registerCommands([new GenerateMarCommand()]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
