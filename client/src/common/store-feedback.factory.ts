import { StoreFeedback as IStoreFeedback, StoreFeedbackSeverity } from './models';

class StoreFeedbackFactory implements IStoreFeedback {
  message: string;
  severity: StoreFeedbackSeverity;

  constructor(message: string, severity: StoreFeedbackSeverity) {
    this.message = message;
    this.severity = severity;
  }

  static info(message: string) {
    return new StoreFeedbackFactory(message, 'info');
  }

  static warning(message: string) {
    return new StoreFeedbackFactory(message, 'warning');
  }

  static error(message: string) {
    return new StoreFeedbackFactory(message, 'error');
  }

  static success(message: string) {
    return new StoreFeedbackFactory(message, 'success');
  }
}

export default StoreFeedbackFactory;
