#!/usr/bin/env node
import { CLIApplication, HelpCommand, ImportCommand, GenerateCommand, TestMethodCommand } from "./cli/index.js";

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([new HelpCommand()]);
  cliApplication.registerCommands([new ImportCommand()]);
  cliApplication.registerCommands([new GenerateCommand()]);
  cliApplication.registerCommands([new TestMethodCommand()]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
