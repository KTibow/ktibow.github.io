import { env } from "cloudflare:workers";

const DISCORD_USER_ID = "794377681331945524";

interface Status {
  content: string;
  timestamp: string;
}

export default {
  async scheduled(event) {
    // Get current Discord status from Lanyard (inlined)
    const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
    const data: { data: { activities: { type: number; state: string }[] }; success: boolean } =
      await response.json();
    if (!data.success) return;

    // Get custom status (type 4 activity)
    const customStatus = data.data.activities?.find((activity: any) => activity.type == 4);
    const currentStatus = customStatus?.state;
    if (!currentStatus) return;

    // Get existing statuses from GitHub
    const statuses = await getExistingStatuses();

    // Skip if status hasn't changed
    if (statuses.length > 0 && statuses[0].content == currentStatus) return;

    // Add new status at the beginning
    const newStatus: Status = {
      content: currentStatus,
      timestamp: new Date().toISOString(),
    };
    statuses.unshift(newStatus);

    // Update GitHub file
    await updateStatusFile(statuses);

    console.log(`Status updated: ${currentStatus}`);
  },
} satisfies ExportedHandler<Env>;

async function getExistingStatuses(): Promise<Status[]> {
  const response = await fetch(
    "https://api.github.com/repos/KTibow/ktibow.github.io/contents/src/pages/nanoblog/statuses.json",
    {
      headers: {
        Authorization: `token ${env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "nanoblog",
      },
    },
  );

  if (response.status == 404) {
    return [];
  }

  if (!response.ok) {
    console.log(await response.text());
    throw new Error(`GitHub is ${response.status}ing`);
  }

  const file = (await response.json()) as any;
  const content = atob(file.content.replace(/\s/g, ""));
  return JSON.parse(content);
}

async function updateStatusFile(statuses: Status[]): Promise<void> {
  const getResponse = await fetch(
    "https://api.github.com/repos/KTibow/ktibow.github.io/contents/src/pages/nanoblog/statuses.json",
    {
      headers: {
        Authorization: `token ${env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "nanoblog",
      },
    },
  );

  let sha: string | undefined;
  if (getResponse.ok) {
    const file: { sha: string } = await getResponse.json();
    sha = file.sha;
  }

  // Update file with new statuses
  const content = btoa(JSON.stringify(statuses, null, 2) + "\n");

  const updateResponse = await fetch(
    "https://api.github.com/repos/KTibow/ktibow.github.io/contents/src/pages/nanoblog/statuses.json",
    {
      method: "PUT",
      headers: {
        Authorization: `token ${env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "ktibow-discord-status-bot",
      },
      body: JSON.stringify({
        message: `Update Discord status`,
        content,
        sha,
      }),
    },
  );

  if (!updateResponse.ok) {
    throw new Error(`GitHub is ${updateResponse.status}ing`);
  }
}
