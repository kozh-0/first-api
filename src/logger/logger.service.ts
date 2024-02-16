// @ts-ignore
import { Logger, ILogObj } from "tslog";

export interface ILoggerService {
  logger: unknown;
  log: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
}

// LoggerService это абстракиця над TSLOG, для сокрытия настроек извне с помощью private
// Имплементация интерфейса - это создание контракта, что этот сервис всегда будет реализовывать данный интерфейс
// Таким образом мы всегда будем знать чего ожидать от сервиса, даже при замене библиотеки логирования или другой
export default class LoggerService implements ILoggerService {
  public logger: Logger<ILogObj>;

  constructor() {
    // Можно внутрь передать настройки https://tslog.js.org/#/?id=settings
    this.logger = new Logger({
      prettyLogTemplate: "{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}} {{logLevelName}}    ",
    });
  }

  // Вообще ко всем методам можно приписать static, импортировать в любой файл и вызывать методы без создания инстанса класса
  // Но так нельзя было бы тестировать приложение, поэтому надо делать Dependency Injection = прокидывать пропсы как в реакте
  log(...args: unknown[]) {
    this.logger.info(...args);
  }
  error(...args: unknown[]) {
    this.logger.error(...args);
  }
  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}
