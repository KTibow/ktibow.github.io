const selector = document.querySelector('input[type="file"]');
selector.addEventListener("change", () => {
  const file = selector.files[0];
  document.querySelector("#result").innerHTML = "Checking file...";
  const reader = new FileReader();
  reader.onload = async (e) => {
    const data = e.target.result;
    let zip;
    try {
      zip = await new JSZip().loadAsync(data);
    } catch (e) {
      document.querySelector("#result").innerHTML =
        "Something went wrong. It might not be a valid jar.";
      console.error(e);
    }
    const topics = {
      obfuscation: {
        name: "Obfuscation",
        desc: "Does this mod attempt to hide what it's doing?",
        matches: [],
      },
      uploading: {
        name: "Uploading",
        desc: "Does this mod connect to remote servers to upload data?",
        matches: [],
      },
      collection: {
        name: "Collection",
        desc: "Does this mod collect data like hardware info, passwords, or your session id?",
        matches: [],
      },
      signatures: {
        name: "Signatures",
        desc: "Does this mod include a known string used by rat makers?",
        matches: [],
      },
    };
    const urls = [];
    await Promise.all(
      Object.keys(zip.files).map(async (fileName) => {
        const file = zip.files[fileName];
        if (file.dir) return;
        /** @type {string} */
        const content = await file.async("text");
        if (content.includes("HWID")) {
          topics.collection.matches.push({
            location: fileName,
            match: "HWID",
            desc: "This mod probably tries to get your hardware ID.",
          });
        }
        if (content.includes('"APPDATA"')) {
          topics.collection.matches.push({
            location: fileName,
            match: '"APPDATA"',
            desc: "This mod might try to get data that apps store.",
          });
        }
        if (content.includes("createScreenCapture")) {
          topics.collection.matches.push({
            location: fileName,
            match: "createScreenCapture",
            desc: "This mod tries to take a screenshot of your screen.",
          });
        }
        if (content.includes(" ey") && content.includes("blackboard")) {
          topics.collection.matches.push({
            location: fileName,
            match: '" ey", and "blackboard"',
            desc: "This mod *might* try to read your session id from the data Minecraft gets when launched.",
          });
        }
        if (content.includes("func_148254_d")) {
          topics.collection.matches.push({
            location: fileName,
            match: "func_148254_d",
            desc: "This mod tries to get your session id.",
          });
        }
        if (content.includes("func_111286_b")) {
          topics.collection.matches.push({
            location: fileName,
            match: "func_111286_b",
            desc: "This mod tries to get your session id.",
          });
        }
        if (content.match(/https:\/\/discordapp\.com\/api\/v\d\/users\/@me/i)) {
          topics.collection.matches.push({
            location: fileName,
            match: "https://discordapp.com/api/vd/users/@me",
            desc: "This mod tries to read data about your Discord account.",
          });
        }
        if (content.match(/session[-_ ]id/i)) {
          topics.collection.matches.push({
            location: fileName,
            match: "session id",
            desc: "This mod mentions the words session id. This could be positive or dangerous.",
          });
        }
        if (content.includes("\\Google\\Chrome\\User Data\\Default")) {
          topics.collection.matches.push({
            location: fileName,
            match: "\\Google\\Chrome\\User Data\\Default",
            desc: "This mod tries to read data from browsers, including passwords.",
          });
        }
        if (content.match(/https?:\/\/checkip\.amazonaws\.com/i)) {
          topics.collection.matches.push({
            location: fileName,
            match: "https?://checkip.amazonaws.com",
            desc: "This mod tries to find your IP address.",
          });
        }
        if (content.includes("SmolPeePeeEnergy")) {
          topics.signatures.matches.push({
            location: fileName,
            match: "SmolPeePeeEnergy",
            desc: "Signature from Breadcat, a rat maker.",
          });
        }
        if (content.includes("BreadOS/69.420")) {
          topics.signatures.matches.push({
            location: fileName,
            match: "BreadOS/69.420",
            desc: "Signature from Breadcat, a rat maker.",
          });
        }
        if (content.includes("Forge Mod Handler")) {
          topics.signatures.matches.push({
            location: fileName,
            match: "Forge Mod Handler",
            desc: "Signature from Breadcat, a rat maker.",
          });
        }
        if (content.includes("SKID DOWN")) {
          topics.signatures.matches.push({
            location: fileName,
            match: "SKID DOWN",
            desc: "Signature from Custom Payload, a rat maker.",
          });
        }
        if (content.includes("Branchlock")) {
          topics.obfuscation.matches.push({
            location: fileName,
            match: "Branchlock",
            desc: "Uses the obfuscator Branchlock.",
          });
        }
        if (content.match(/[lI]{8,}/)) {
          topics.obfuscation.matches.push({
            location: fileName,
            match: "[lI]{8,}",
            desc: "Has random lIIlI-type nonsense, probably obfuscation.",
          });
        }
        if (
          content.includes(
            "qolskyblockmod.pizzaclient.features.misc.SessionProtection"
          )
        ) {
          topics.obfuscation.matches.push({
            location: fileName,
            match: "qolskyblockmod.pizzaclient.features.misc.SessionProtection",
            desc: "Tries to block a mod from protecting your session id.",
          });
        }
        if (
          content.match(
            /https?:\/\/(?:ptb\.|canary\.)?discord(?:app)?\.com\/api(?:\/)?(v\d{1,2})?\/webhooks\/\d{17,21}\/[\w\-]{68}/i
          )
        ) {
          topics.uploading.matches.push({
            location: fileName,
            match:
              "https?://discordapp.com/api/v\\d/webhooks/\\d{17,21}/[\\w\\-]{68}",
            desc: "This mod tries to upload data to a Discord webhook.",
          });
        }
        if (
          content.includes("Java-DiscordWebhook-BY-Gelox_") ||
          (content.match(/[Aa]vatarUrl/) && content.match(/[Ee]mbed/))
        ) {
          topics.uploading.matches.push({
            location: fileName,
            match:
              '"Java-DiscordWebhook-BY-Gelox_" OR things related to webhooks, eg avatarUrl, embeds',
            desc: "This mod has a module for Discord webhooks.",
          });
        }
        if (content.includes("http://api.breadcat.cc:80")) {
          topics.uploading.matches.push({
            location: fileName,
            match: "http://api.breadcat.cc:80",
            desc: "This mod tries to upload data to Breadcat's (a rat maker) web server.",
          });
        }
        if (content.includes("https://api.anonfiles.com/upload")) {
          topics.uploading.matches.push({
            location: fileName,
            match: "https://api.anonfiles.com/upload",
            desc: "This mod tries to upload data to Anonfiles, a file hosting site.",
          });
        }
        if (content.includes("media.guilded.gg")) {
          topics.uploading.matches.push({
            location: fileName,
            match: "media.guilded.gg",
            desc: "This mod might try to upload data to a Guilded webhook.",
          });
        }
        if (content.includes("herokuapp.com")) {
          topics.uploading.matches.push({
            location: fileName,
            match: "herokuapp.com",
            desc: "This mod might try to upload data to a private Heroku server.",
          });
        }
        if (content.includes("pastebin.com/raw/")) {
          topics.uploading.matches.push({
            location: fileName,
            match: "pastebin.com/raw/",
            desc: "This mod might try to find data on Pastebin, like a way to upload data.",
          });
        }
        const urlsInFile =
          content.match(
            /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/gi
          ) || [];
        urls.push(...urlsInFile);
      })
    );
    const outputArea = document.querySelector("#result");
    outputArea.innerHTML = "";
    for (const type in topics) {
      const topic = topics[type];
      const topicTag = document.createElement("details");
      if (type != "obfuscation") topicTag.setAttribute("open", "open");
      const heading = document.createElement("summary");
      heading.innerHTML = `${topic.name} (${topic.desc})`;
      heading.className = "font-bold text-xl my-2 cursor-pointer";
      topicTag.appendChild(heading);
      const list = document.createElement("ul");
      for (const match of topic.matches) {
        const listItem = document.createElement("li");
        listItem.className = "list-disc list-outside";
        listItem.innerHTML =
          `<strong class="font-bold">${match.match}</strong> in ` +
          `<span class="text-blue-500 cursor-pointer">${match.location}</span><br>` +
          match.desc;
        listItem.querySelector("span").addEventListener("click", async () => {
          const file = match.location;
          const fileContent = await zip.files[file].async("string");

          const dialog = document.querySelector("dialog");
          dialog.innerHTML = "";
          const header = document.createElement("h2");
          header.innerText = `${file}`;
          header.className = "text-2xl font-bold";
          const code = document.createElement("pre");
          code.append(document.createTextNode(fileContent));
          code.className = "text-sm whitespace-pre-wrap";
          const dismiss = document.createElement("button");
          dismiss.innerText = "Dismiss";
          dismiss.className =
            "bg-gradient-to-b from-blue-800 to-blue-500 bg-[length:100%_200%] hover:bg-[0_100%] transition-all duration-1000 font-bold py-2 px-4 rounded";
          dismiss.addEventListener("click", () => dialog.close());
          dialog.append(header, code, dismiss);
          dialog.showModal();
        });
        list.append(listItem);
      }
      topicTag.appendChild(list);
      outputArea.appendChild(topicTag);
    }
    const urlsTag = document.createElement("details");
    const urlsHeading = document.createElement("summary");
    urlsHeading.innerHTML = `URLs found (${urls.length})`;
    urlsHeading.className = "font-bold text-xl my-2 cursor-pointer";
    urlsTag.appendChild(urlsHeading);
    const urlsList = document.createElement("ul");
    urlsList.className = "list-disc list-outside";
    for (const url of urls) {
      const listItem = document.createElement("li");
      listItem.className = "list-disc list-outside";
      listItem.innerText = url;
      urlsList.append(listItem);
    }
    urlsTag.appendChild(urlsList);
    outputArea.appendChild(urlsTag);
  };
  reader.readAsArrayBuffer(file);
});
