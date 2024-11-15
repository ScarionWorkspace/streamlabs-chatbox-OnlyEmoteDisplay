//Copy Paste this into Streamlabs
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
