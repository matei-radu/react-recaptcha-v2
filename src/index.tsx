/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import React, { Component } from "react";

interface ReCaptchaProps {
  siteKey: string,
}

class ReCaptcha extends Component<ReCaptchaProps, undefined> {
  private scriptSrc = "https://www.google.com/recaptcha/api.js";

  /**
   * Appends the reCAPTCHA script to the document body if necessary.
   */
  appendScript() {
    if (!this.isScriptAvailable()) {
      const reCaptchaScript = this.createScriptElement();
      document.body.appendChild(reCaptchaScript)
    }
  }

  isScriptAvailable(): boolean {
    if (document.getElementById('recaptcha')) {
      return true;
    }

    // Maybe the script was added but not from this component.
    const availableScripts = Array.from(document.scripts);
    availableScripts.forEach(script => {
      if (script.src === this.scriptSrc) {
        return true;
      }
    });

    return false;
  }

  createScriptElement(): HTMLScriptElement {
    const reCaptchaScript = document.createElement("script");
    reCaptchaScript.id = "recaptcha";
    reCaptchaScript.src = this.scriptSrc;
    reCaptchaScript.async = true;
    reCaptchaScript.defer = true;

    return reCaptchaScript;
  }


  render() {
    return <div>ReCaptcha</div>
  }
}

export default ReCaptcha