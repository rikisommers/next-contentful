"use client"

import React from "react"
import Button from "./button"
import ButtonWipe from "./button-wipe"
import ButtonMonks from "./button-monks"
import ButtonSwap from "./button-swap"
import { ButtonType, ButtonSound } from "./button.util";

// Sample button data for previews
const sampleButton = {
  label: "Click me now",
  type: ButtonType.DEFAULT,
  sound: ButtonSound.CLICK,
}

/**
 * Creates the button components object with sample data
 * @returns {Object} - The button components object
 */
export const createButtonComponents = () => {
  return {
    basic: {
      label: "Click me now",
      type: ButtonType.DEFAULT,
      sound: ButtonSound.CLICK,
      component: <Button label={sampleButton.label} type={sampleButton.type} sound={sampleButton.sound} />,
      code: `<Button 
  label="Click me now"
  type={ButtonType.DEFAULT}
  sound={ButtonSound.CLICK}
/>`
    },
    wipe: {
      label: "Wipe Effect",
      type: ButtonType.DEFAULT,
      sound: ButtonSound.CLICK,
      component: <ButtonWipe label="Wipe Button" type={ButtonType.DEFAULT} sound={ButtonSound.CLICK} />,
      code: `<ButtonWipe 
  label="Wipe Button"
  type={ButtonType.DEFAULT}
  sound={ButtonSound.CLICK}
/>`
    },
    monks: {
      label: "Monks Style",
      type: ButtonType.DEFAULT,
      sound: ButtonSound.CLICK,
      component: <ButtonMonks label="Monks Button" type={ButtonType.DEFAULT} sound={ButtonSound.CLICK} />,
      code: `<ButtonMonks 
  label="Monks Button"
  type={ButtonType.DEFAULT}
  sound={ButtonSound.CLICK}
/>`
    },
    swap: {
      label: "Swap Animation",
      type: ButtonType.DEFAULT,
      sound: ButtonSound.CLICK,
      component: <ButtonSwap label="Swap Button" type={ButtonType.DEFAULT} sound={ButtonSound.CLICK} />,
      code: `<ButtonSwap 
  label="Swap Button"
  type={ButtonType.DEFAULT}
  sound={ButtonSound.CLICK}
/>`
    }
  }
}