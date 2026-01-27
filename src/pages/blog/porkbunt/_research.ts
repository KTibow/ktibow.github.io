// Function to generate permutations of the original domain
function generatePermutations(domain: string) {
  const permutations = [];

  // Original domain
  permutations.push(domain);

  // Common typos
  permutations.push(domain.replace("k", "l")); // porldun
  permutations.push(domain.replace("b", "n")); // porknun
  permutations.push(domain.replace("p", "b")); // borkbun

  // Character swaps
  for (let i = 0; i < domain.length - 1; i++) {
    const swapped = domain.split("");
    [swapped[i], swapped[i + 1]] = [swapped[i + 1], swapped[i]];
    permutations.push(swapped.join(""));
  }

  // Letter duplication
  for (let i = 0; i < domain.length; i++) {
    const duplicated = domain.split("");
    duplicated.splice(i, 0, domain[i]);
    permutations.push(duplicated.join(""));
  }

  // Letter omission
  for (let i = 0; i < domain.length; i++) {
    const omitted = domain.split("");
    omitted.splice(i, 1);
    permutations.push(omitted.join(""));
  }

  // Letter addition
  for (const letter of "abcdefghijklmnopqrstuvwxyz") {
    permutations.push(domain + letter);
  }

  // Add common TLDs
  const uniquePermutations = [...new Set(permutations)];
  const fullDomains = [];

  for (const perm of uniquePermutations) {
    fullDomains.push(`${perm}.com`);
    fullDomains.push(`${perm}.net`);
    fullDomains.push(`${perm}.org`);
  }

  return fullDomains.filter((d) => d != "porkbunt.com");
}

// Function to check for redirects
async function checkRedirects(domains: string[], phishingSite: string) {
  const results = [];

  for (const domain of domains) {
    const check = async () => {
      const response = await fetch(`https://${domain}`, {
        method: "HEAD",
        redirect: "manual",
        mode: "no-cors",
      });

      // Check if this domain redirects to the phishing site
      return response.url.includes(phishingSite) || response.status == 405;
    };
    try {
      const isPhishing = await Promise.race([
        check(),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000)),
      ]);
      if (isPhishing) {
        console.log("we got em", domain);
        results.push({ domain, redirectsToPhishing: true });
      } else {
        results.push({ domain, redirectsToPhishing: false });
      }
    } catch {}
  }

  return results;
}

const originalDomain = "porkbun";
const phishingSite = "porkbunt.com";

const permutations = generatePermutations(originalDomain);
console.log(`Generated ${permutations.length} permutations to check`);

const results = await checkRedirects(permutations, phishingSite);

// Display results
console.log("=== RESULTS ===");
const phishingDomains = results.filter((r) => r.redirectsToPhishing);

if (phishingDomains.length > 0) {
  console.log(`Found ${phishingDomains.length} domains that redirect to ${phishingSite}:`);
  phishingDomains.forEach((d) => console.log(`- ${d.domain}`));
} else {
  console.log(`No domains found that redirect to ${phishingSite}`);
}
