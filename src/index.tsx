/*
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import React, { Component } from "react";
// It is safe to use the non-secure version because the ids are not used
// for anything concerning security.
import { nanoid } from "nanoid/non-secure";

/** ID assigned to the main reCAPTCHA script. */
const MAIN_SCRIPT_ID = "recaptcha";

/** Source of the main reCAPTCHA script. */
const MAIN_SCRIPT_SRC = "https://www.google.com/recaptcha/api.js";

/**
 * Pattern of the second, implicit reCAPTCHA script.
 *
 * Because this second script is versioned it is not possible to have a
 * simple, fixed string.
 */
const IMPLICIT_SCRIPT_SRC_PATTERN =
  /https:\/\/www.gstatic.com\/recaptcha\/releases\/.*.js$/;

/**
 * Test key for frontend applications.
 *
 * This key is the same for everyone, so it is safe to have here.
 */
const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

interface ReCaptchaProps {
  siteKey: string;
  theme?: "light" | "dark";
  size?: "normal" | "compact";
  onSuccess?: (result: string) => any;
  onExpire?: () => any;
  onError?: () => any;
}

class ReCaptcha extends Component<ReCaptchaProps, {}> {
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
    if (document.getElementById(MAIN_SCRIPT_ID) !== null) {
      return document.getElementById(MAIN_SCRIPT_ID) as HTMLScriptElement;
    }

    // Maybe the script was added but not from this component.
    const availableScripts = Array.from(document.scripts);
    return availableScripts.find((script) => script.src === MAIN_SCRIPT_SRC);
  }

  createScriptElement(): HTMLScriptElement {
    const reCaptchaScript = document.createElement("script");
    reCaptchaScript.id = MAIN_SCRIPT_ID;
    reCaptchaScript.src = MAIN_SCRIPT_SRC;
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
    const additionalScripts = allScripts.filter((script) =>
      IMPLICIT_SCRIPT_SRC_PATTERN.test(script.src)
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
      mutations.forEach((mutation) => {
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
        data-sitekey={siteKey === "test" ? TEST_SITE_KEY : siteKey}
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
