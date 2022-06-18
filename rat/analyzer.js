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
    const urls = [];
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
    await Promise.all(
      Object.keys(zip.files).map(async (fileName) => {
        const file = zip.files[fileName];
        if (file.dir) return;
        /** @type {string} */
        const content = await file.async("text");
        const filters = [
          {
            match: content.includes("HWID"),
            name: "HWID",
            category: "collection",
            desc: "This mod probably tries to get your hardware ID.",
          },
          {
            match: content.includes('"APPDATA"'),
            name: '"APPDATA"',
            category: "collection",
            desc: "This mod might try to get data that apps store.",
          },
          {
            match: content.includes("createScreenCapture"),
            name: "createScreenCapture",
            category: "collection",
            desc: "This mod tries to take a screenshot of your screen.",
          },
          {
            match: content.includes(" ey") && content.includes("blackboard"),
            name: '" ey", and "blackboard"',
            category: "collection",
            desc: "This mod *might* try to read your session id from the data Minecraft gets when launched.",
          },
          {
            match: content.includes("func_148254_d"),
            name: "func_148254_d",
            category: "collection",
            desc: "This mod tries to get your session id.",
          },
          {
            match: content.includes("func_111286_b"),
            name: "func_111286_b",
            category: "collection",
            desc: "This mod tries to get your session id.",
          },
          {
            match: content.match(
              /https:\/\/discordapp\.com\/api\/v\d\/users\/@me/i
            ),
            name: "https://discordapp.com/api/vd/users/@me",
            category: "collection",
            desc: "This mod tries to read data about your Discord account.",
          },
          {
            match: content.match(/session[-_ ]id/i),
            name: "session id",
            category: "collection",
            desc: "This mod mentions the words session id. This could be positive or dangerous.",
          },
          {
            match: content.includes("\\Google\\Chrome\\User Data\\Default"),
            name: "\\Google\\Chrome\\User Data\\Default",
            category: "collection",
            desc: "This mod tries to read data from browsers, including passwords.",
          },
          {
            match: content.match(/https?:\/\/checkip\.amazonaws\.com/i),
            name: "https?://checkip.amazonaws.com",
            category: "collection",
            desc: "This mod tries to find your IP address.",
          },
          {
            match: content.includes("SmolPeePeeEnergy"),
            name: "SmolPeePeeEnergy",
            category: "signatures",
            desc: "Signature from Breadcat, a rat maker.",
          },
          {
            match: content.includes("BreadOS/69.420"),
            name: "BreadOS/69.420",
            category: "signatures",
            desc: "Signature from Breadcat, a rat maker.",
          },
          {
            match: content.includes("Forge Mod Handler"),
            name: "Forge Mod Handler",
            category: "signatures",
            desc: "Signature from Breadcat, a rat maker.",
          },
          {
            match: content.includes("SKID DOWN"),
            name: "SKID DOWN",
            category: "signatures",
            desc: "Signature from Custom Payload, a rat maker.",
          },
          {
            match: content.includes("Branchlock"),
            name: "Branchlock",
            category: "obfuscation",
            desc: "Uses the obfuscator Branchlock.",
          },
          {
            match: content.match(/[lI]{8,}/),
            name: "[lI]{8,}",
            category: "obfuscation",
            desc: "Has random lIIlI-type nonsense, probably obfuscation.",
          },
          {
            match: content.includes(
              "qolskyblockmod.pizzaclient.features.misc.SessionProtection"
            ),
            name: "qolskyblockmod.pizzaclient.features.misc.SessionProtection",
            category: "obfuscation",
            desc: "Tries to block a mod from protecting your session id.",
          },
          {
            match: content.match(
              /https?:\/\/(?:ptb\.|canary\.)?discord(?:app)?\.com\/api(?:\/)?(v\d{1,2})?\/webhooks\/\d{17,21}\/[\w\-]{68}/i
            ),
            name: "https?://discordapp.com/api/v\\d/webhooks/\\d{17,21}/[\\w\\-]{68}",
            category: "uploading",
            desc: "This mod tries to upload data to a Discord webhook.",
          },
          {
            match:
              content.includes("Java-DiscordWebhook-BY-Gelox_") ||
              (content.match(/[Aa]vatarUrl/) && content.match(/[Ee]mbed/)),
            name: '"Java-DiscordWebhook-BY-Gelox_" OR things related to webhooks, eg avatarUrl, embeds',
            category: "uploading",
            desc: "This mod has a module for Discord webhooks.",
          },
          {
            match: content.includes("http://api.breadcat.cc:80"),
            name: "http://api.breadcat.cc:80",
            category: "uploading",
            desc: "This mod tries to upload data to Breadcat's (a rat maker) web server.",
          },
          {
            match: content.includes("https://api.anonfiles.com/upload"),
            name: "https://api.anonfiles.com/upload",
            category: "uploading",
            desc: "This mod tries to upload data to Anonfiles, a file hosting site.",
          },
          {
            match: content.includes("media.guilded.gg"),
            name: "media.guilded.gg",
            category: "uploading",
            desc: "This mod might try to upload data to a Guilded webhook.",
          },
          {
            match: content.includes("herokuapp.com"),
            name: "herokuapp.com",
            category: "uploading",
            desc: "This mod might try to upload data to a private Heroku server.",
          },
          {
            match: content.includes("pastebin.com/raw/"),
            name: "pastebin.com/raw/",
            category: "uploading",
            desc: "This mod might try to find data on Pastebin, like a way to upload data.",
          },
        ];
        for (const match of filters.filter((f) => f.match)) {
          topics[match.category].matches.push({ location: fileName, ...match });
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
          `<strong class="font-bold">${match.name}</strong> in ` +
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
