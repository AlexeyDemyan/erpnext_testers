#!/usr/bin/env node
import {
  CLIApplication,
  HelpCommand,
  ImportCommand,
  GenerateCommand,
  TestMethodCommand,
  GenerateMarCommand,
  GenerateChrisCommand
} from "./cli/index.js";

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([new HelpCommand()]);
  cliApplication.registerCommands([new ImportCommand()]);
  cliApplication.registerCommands([new GenerateCommand()]);
  cliApplication.registerCommands([new TestMethodCommand()]);
  cliApplication.registerCommands([new GenerateMarCommand()]);
  cliApplication.registerCommands([new GenerateChrisCommand()]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
