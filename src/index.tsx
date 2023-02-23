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

/**
 * Returns the existing main reCAPTCHA `script` element if it exists.
 */
const getMainScriptElement = (): HTMLScriptElement | undefined => {
  if (document.getElementById(MAIN_SCRIPT_ID) !== null) {
    return document.getElementById(MAIN_SCRIPT_ID) as HTMLScriptElement;
  }

  // Maybe the script was added but not from this component.
  const availableScripts = Array.from(document.scripts);
  return availableScripts.find((script) => script.src === MAIN_SCRIPT_SRC);
};

/**
 * Creates a main reCAPTCHA `script` element.
 */
const createMainScriptElement = (): HTMLScriptElement => {
  const scriptElement = document.createElement("script");
  scriptElement.id = MAIN_SCRIPT_ID;
  scriptElement.src = MAIN_SCRIPT_SRC;
  scriptElement.async = true;
  scriptElement.defer = true;

  return scriptElement;
};

/**
 * Removes the given `element` from its parent.
 */
const removeChildElement = (element: HTMLElement): void => {
  const parentNode = element.parentNode;
  if (parentNode !== null) {
    parentNode.removeChild(element);
  }
};

/**
 * Checks if a node is a reCAPTCHA hidden `div`.
 *
 * reCAPTCHA adds a hidden `div` to the document to function correctly.
 * However, this `div` does not have an ID or classes assigned, so this
 * function will check for some known style properties.
 *
 * Note that these known properties might change over time, so they might
 * need to be revised from time to time.
 */
const isNodeRecaptchaHiddenDiv = (node: Node): boolean => {
  const div = node as HTMLDivElement;
  return (
    div.style &&
    div.style.visibility === "hidden" &&
    div.style.top === "-10000px" &&
    div.style.position === "absolute"
  );
};

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
    if (!getMainScriptElement()) {
      const reCaptchaScript = createMainScriptElement();
      document.body.appendChild(reCaptchaScript);
    }
  }

  /**
   * Removes the reCAPTCHA script if it's available in the document and
   * any other elements automatically added by the script.
   */
  private cleanup() {
    // Remove the original script.
    const script = getMainScriptElement();
    if (script) {
      removeChildElement(script);
    }

    // Remove callback functions from window.
    delete (window as any)[this.successCallbackId];
    delete (window as any)[this.expiredCallbackId];
    delete (window as any)[this.errorCallbackId];

    // Remove additional hidden div added by the script.
    removeChildElement(this.hiddenDiv);

    // Remove additional scripts added by the original one.
    const allScripts = Array.from(document.scripts);
    const additionalScripts = allScripts.filter((script) =>
      IMPLICIT_SCRIPT_SRC_PATTERN.test(script.src)
    );
    additionalScripts.map(removeChildElement);
  }

  mutationCallbackGenerator() {
    return (mutations: MutationRecord[]) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "childList" &&
          mutation.target === document.body &&
          mutation.addedNodes.length === 1 &&
          isNodeRecaptchaHiddenDiv(mutation.addedNodes[0])
        ) {
          this.hiddenDiv = mutation.addedNodes[0] as HTMLDivElement;
          this.observer.disconnect();
        }
      });
    };
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
