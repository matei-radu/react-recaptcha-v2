/*
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import React, { Component } from "react";
import nanoid from "nanoid";

interface ReCaptchaProps {
  siteKey: string;
  theme?: "light" | "dark";
  size?: "normal" | "compact";
  onSuccess?: (result: string) => any;
  onExpire?: () => any;
  onError?: () => any;
}

class ReCaptcha extends Component<ReCaptchaProps> {
  private scriptSrc = "https://www.google.com/recaptcha/api.js";
  private testSiteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  private observer = new MutationObserver(this.mutationCallbackGenerator());
  private hiddenDiv = document.createElement("div"); // Just a placeholder.
  private id = nanoid();
  private successCallbackId = nanoid();
  private expiredCallbackId = nanoid();
  private errorCallbackId = nanoid();

  componentDidMount() {
    this.observer.observe(document.body, { childList: true });
    this.appendScript();

    // Feels hacky but it's shorter than extending the Window interface.
    (window as any)[this.successCallbackId] = this.props.onSuccess;
    (window as any)[this.expiredCallbackId] = this.props.onExpire;
    (window as any)[this.errorCallbackId] = this.props.onError;
  }

  componentWillUnmount() {
    this.cleanup();
  }

  /**
   * Appends the reCAPTCHA script to the document body if necessary.
   */
  appendScript() {
    if (!this.getScriptIfAvailable()) {
      const reCaptchaScript = this.createScriptElement();
      document.body.appendChild(reCaptchaScript);
    }
  }

  getScriptIfAvailable(): HTMLScriptElement | undefined {
    if (document.getElementById("recaptcha") !== null) {
      return document.getElementById("recaptcha") as HTMLScriptElement;
    }

    // Maybe the script was added but not from this component.
    const availableScripts = Array.from(document.scripts);
    return availableScripts.find(script => script.src === this.scriptSrc);
  }

  createScriptElement(): HTMLScriptElement {
    const reCaptchaScript = document.createElement("script");
    reCaptchaScript.id = "recaptcha";
    reCaptchaScript.src = this.scriptSrc;
    reCaptchaScript.async = true;
    reCaptchaScript.defer = true;

    return reCaptchaScript;
  }

  /**
   * Removes the reCAPTCHA script if it's available in the document and
   * any other elements automatically added by the script.
   */
  private cleanup() {
    // Remove the original script.
    const script = this.getScriptIfAvailable();
    if (script) {
      this.removeChild(script);
    }

    // Remove callback functions from window.
    delete (window as any)[this.successCallbackId];
    delete (window as any)[this.expiredCallbackId];
    delete (window as any)[this.errorCallbackId];

    // Remove additional hidden div added by the script.
    this.removeChild(this.hiddenDiv);

    // Remove additional scripts added by the original one.
    const allScripts = Array.from(document.scripts);
    const reCaptchaSrcPattern = /https:\/\/www.gstatic.com\/recaptcha\/releases\/.*.js$/;
    const additionalScripts = allScripts.filter(script =>
      reCaptchaSrcPattern.test(script.src)
    );
    additionalScripts.map(this.removeChild);
  }

  removeChild(element: HTMLElement) {
    const parentNode = element.parentNode;
    if (parentNode !== null) {
      parentNode.removeChild(element);
    }
  }

  mutationCallbackGenerator() {
    return (mutations: MutationRecord[]) => {
      mutations.forEach(mutation => {
        if (
          mutation.type === "childList" &&
          mutation.target === document.body &&
          mutation.addedNodes.length === 1 &&
          this.isNodeReCaptchaHiddenDiv(mutation.addedNodes[0])
        ) {
          this.hiddenDiv = mutation.addedNodes[0] as HTMLDivElement;
          this.observer.disconnect();
        }
      });
    };
  }

  /**
   * Checks if a node is a reCAPTCHA hidden div
   * (reCAPTCHA adds one to the document).
   */
  isNodeReCaptchaHiddenDiv(node: Node) {
    const div = node as HTMLDivElement;
    return (
      div.style &&
      div.style.visibility === "hidden" &&
      div.style.top === "-10000px" &&
      div.style.position === "absolute"
    );
  }

  render() {
    const { siteKey, theme, size } = this.props;
    return (
      <div
        id={this.id}
        className="g-recaptcha"
        data-sitekey={siteKey === "test" ? this.testSiteKey : siteKey}
        data-theme={theme}
        data-size={size}
        data-callback={this.successCallbackId}
        data-expired-callback={this.expiredCallbackId}
        data-error-callback={this.errorCallbackId}
      />
    );
  }
}

export default ReCaptcha;
