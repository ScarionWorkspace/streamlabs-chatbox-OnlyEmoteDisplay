```markdown
# Streamlabs Chat Box Emote-Only Display

This script customizes the Streamlabs Chat Box widget to only display emotes in messages. All text content is removed, so the chat box shows only the emotes that users send. 

## Features
- Displays only `span.emote` elements in the chat box, removing all text content.
- Supports all emotes without needing a predefined list.
- Rescales emotes for improved visibility by adjusting resolution.

## Setup Instructions

### Step 1: Open Streamlabs Dashboard
- Log in to [Streamlabs](https://streamlabs.com) and navigate to your dashboard.

### Step 2: Open Chat Box Widget Settings
- From your dashboard, go to **Widgets** > **Chat Box**.

### Step 3: Enable Custom HTML/JS
- Scroll down to find the **Enable Custom HTML/CSS** toggle and turn it on.
- This setting will allow you to add your own JavaScript to customize the Chat Box behavior.

### Step 4: Add the Script
- In the Chat Box settings, scroll to the **Custom JS** section and paste the following script:

```javascript
document.addEventListener('onLoad', function(obj) {
  console.log("Chat widget loaded");
});

document.addEventListener('onEventReceived', function(obj) {
  if (obj.detail.command !== "PRIVMSG") {
    console.log("Not a PRIVMSG");
    return;
  }

  const log = document.getElementById("log");

  // Function to filter message content and retain only `span.emote` elements
  function filterAndRetainEmotes(messageElement) {
    const emoteElements = Array.from(messageElement.querySelectorAll("span.emote"));
    const validEmotes = []; // Array to store valid emotes

    // Process each emote element in the message
    emoteElements.forEach(emote => {
      // Update emote image resolution and size to a higher resolution
      const emoteStyle = emote.style.backgroundImage;
      const higherResUrl = emoteStyle.replace("/1.0", "/4.0");
      emote.style.backgroundImage = higherResUrl;
      emote.style.width = "28px"; // Set emote width
      emote.style.height = "28px"; // Set emote height

      // Add emote to the validEmotes array
      validEmotes.push(emote);
    });

    // Remove all text nodes (plain text) within the message element
    const textNodes = Array.from(messageElement.childNodes).filter(node => node.nodeType === 3);
    textNodes.forEach(node => node.remove());

    // Clear out existing message content and append only the valid emotes
    messageElement.innerHTML = '';
    validEmotes.forEach(emote => messageElement.appendChild(emote));

    // Return true if any emotes were retained
    return validEmotes.length > 0;
  }

  // Identify the last message in the log
  const lastMessage = log.lastElementChild;

  if (lastMessage) {
    const messageContent = lastMessage.querySelector(".message");

    if (messageContent) {
      const hasEmotes = filterAndRetainEmotes(messageContent);

      if (!hasEmotes) {
        lastMessage.parentNode && lastMessage.parentNode.removeChild(lastMessage);
        console.log("Removed entire message: No emotes detected.");
      } else {
        console.log("Message retained: Contains emotes.");
      }
    } else {
      console.log("No message content found in the last message.");
    }
  } else {
    console.log("No last message found in the log.");
  }
});

### Step 5: Save and Start
- After pasting the code, save your settings.
- Test the widget by sending messages with emotes in your chat to confirm that only emotes appear in the widget.

## Notes
- This script applies to all `span.emote` elements, so any emote added to a message will be displayed.
- Text content in messages will not appear in the chat box widget, giving an emote-only display.

Happy streaming! 🎉
```
