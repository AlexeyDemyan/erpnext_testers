#!/usr/bin/env node
import { CLIApplication, HelpCommand, ImportCommand } from "./cli/index.js";

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([new HelpCommand()]);
  cliApplication.registerCommands([new ImportCommand()]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
