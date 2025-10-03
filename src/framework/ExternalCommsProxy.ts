import { ExternalComms } from "@gl/ExternalComms";

class ExternalCommsProxy {
  static addEventListener(event: string, callback: (...args: any[]) => void) {
    ExternalComms.getInstance().addEventListener(event, callback);
  }

  static addCallback(name: string, callback: (...args: any[]) => void) {
    ExternalComms.getInstance().addCallback(name, callback);
  }

  static gameCalls() {
    return ExternalComms.getInstance().getCallbacks();
  }

  static availableEvents() {
    return ExternalComms.getInstance().getAvailableEvents();
  }

}
declare global {
  interface Window {
    extcom: ExternalCommsProxy;
  }
}

if (!window.extcom) {
  window.extcom = ExternalCommsProxy;
}
