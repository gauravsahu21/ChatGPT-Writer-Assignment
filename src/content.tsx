import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useState } from "react"

import { CountButton } from "~features/CountButton"
import PromptModal from "~features/PromptModal"

import Icon from "../assets/message_icon.png"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [modalVisible, setModalVisible] = useState(false) // State for text modal visibility

  //need to combine these two together
  const handleCloseModal = () => {
    setModalVisible(false)
  }
  const handleIconClick = () => {
    setModalVisible(true)
  }
  //

  // Function to display the AI icon within the message text area
  function displayAiIcon() {
    var img = document.createElement("img") // Create an img element
    img.addEventListener("click", handleIconClick) // Add click event listener to the image
    img.src = Icon 

    // Set styles for the image
    img.style.width = "30px"
    img.style.cursor = "pointer"
    img.className = "AI-Icon bg-white p-8 rounded-lg shadow-2xl "
    img.style.position = "absolute"
    img.style.bottom = "0"
    img.style.right = "50px"

    var messageTextArea = document.querySelector(".msg-form__contenteditable")

    if (messageTextArea) {
      messageTextArea.appendChild(img)
    }
  }
   // Event listener for focusin event to display AI icon
  document.addEventListener("focusin", function (event) {
    var focusedElement = event.target as Element
    if (focusedElement.matches(".msg-form__contenteditable")) {
      displayAiIcon()
    }
  })

   // Function to remove the AI icon from the message text area
  function removeImageFromMessageTextArea() {
    var img = document.querySelector(".AI-Icon")
    if (img) {
      img.remove()
    }
  }

  // Event listener for focusout event to remove AI icon
  document.addEventListener("focusout", function (event) {
    var focusedElement = event.relatedTarget as Element
    if (!focusedElement || !focusedElement.matches(".AI-Icon")) {
      removeImageFromMessageTextArea()
    }
  })

  return (
    <>
      <PromptModal
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        setModalVisible={setModalVisible}
      />
    </>
  )
}

export default PlasmoOverlay
