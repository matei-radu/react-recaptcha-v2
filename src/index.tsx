/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import React, { Component } from "react";

interface ReCaptchaProps {
  siteKey: string;
}

class ReCaptcha extends Component<ReCaptchaProps, undefined> {
  private scriptSrc = "https://www.google.com/recaptcha/api.js";
  private observer = new MutationObserver(this.mutationCallbackGenerator());
  private hiddenDiv = document.createElement("div"); // Just a placeholder.

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

    // Remove additional hidden div added by the script.
    this.removeChild(this.hiddenDiv);

    // Remove additional scripts added by the original one.
    const allScripts = Array.from(document.scripts);
    const reCaptchaSrcPattern = /https:\/\/www.gstatic.com\/recaptcha\/api2\/.*.js$/;
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
      div.style.visibility === "hidden" &&
      div.style.zIndex === "2000000000" &&
      div.style.position === "absolute"
    );
  }

  render() {
    return <div>ReCaptcha</div>;
  }
}

export default ReCaptcha;
