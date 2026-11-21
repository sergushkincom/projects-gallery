// Topic groups and sentences follow the "By topic" sections of
// https://github.com/sergushkincom/sergushkincom/blob/main/README.md
// A project is listed only when its live URL returns 200.

export const topics = [
  { id: "agentic", label: "Agentic UI & AI agents" },
  { id: "spatial", label: "3D & spatial" },
  { id: "erp", label: "ERP & B2B tools" },
  { id: "tools", label: "Small tools & experiments" },
] as const;

export type TopicId = (typeof topics)[number]["id"];

export type Project = {
  slug: string;
  name: string;
  description: string;
  topics: readonly TopicId[];
  liveUrl: string;
  repoUrl: string;
  image: string;
  imageAlt: string;
};

const topicIds = new Set<string>(topics.map((topic) => topic.id));

export function isTopicId(value: string): value is TopicId {
  return topicIds.has(value);
}

export function parseTopics(values: readonly string[]): TopicId[] {
  const wanted = new Set(values.filter(isTopicId));
  return topics.map((topic) => topic.id).filter((id) => wanted.has(id));
}

export function filterProjects(
  list: readonly Project[],
  selected: readonly TopicId[],
): Project[] {
  if (selected.length === 0) return [...list];
  const wanted = new Set(selected);
  return list.filter((project) =>
    project.topics.some((topic) => wanted.has(topic)),
  );
}

export function topicCount(id: TopicId): number {
  return projects.filter((project) => project.topics.includes(id)).length;
}

export function topicLabel(id: TopicId): string {
  return topics.find((topic) => topic.id === id)?.label ?? id;
}

export const projects: readonly Project[] = [
  {
    slug: "agentic-ui",
    name: "agentic-ui",
    description:
      "What the agent is doing, how sure it is, and where a person can take the work back.",
    topics: ["agentic"],
    liveUrl: "https://agentic-ui-docs.vercel.app",
    repoUrl: "https://github.com/sergushkincom/agentic-ui",
    image: "/cards/card-agentic-ui.jpg",
    imageAlt:
      "Poster for agentic-ui: a confidence bar and a cost-centre field a person can take back.",
  },
  {
    slug: "battery-because",
    name: "Because",
    description: "A battery console where every number comes with the reason.",
    topics: ["agentic"],
    liveUrl: "https://battery-because.vercel.app",
    repoUrl: "https://github.com/sergushkincom/battery-because",
    image: "/cards/card-battery-because.jpg",
    imageAlt:
      "Poster for Because: a battery revenue chart with the sentences that use those figures.",
  },
  {
    slug: "workflow-canvas",
    name: "Workflow canvas",
    description: "A ticket flow that stops and asks when it is not sure.",
    topics: ["agentic"],
    liveUrl: "https://denys-workflow-canvas.vercel.app/experiments/workflow-canvas",
    repoUrl: "https://github.com/sergushkincom/workflow-canvas",
    image: "/cards/card-workflow-canvas.jpg",
    imageAlt:
      "Poster for Workflow canvas: a flow that stops on an unsure step and asks.",
  },
  {
    slug: "knowledge-atlas",
    name: "Knowledge Atlas",
    description:
      "Notes an AI grouped, with the low-confidence ones marked so you can overrule them.",
    topics: ["agentic"],
    liveUrl: "https://denys-knowledge-atlas.vercel.app",
    repoUrl: "https://github.com/sergushkincom/knowledge-atlas",
    image: "/cards/card-knowledge-atlas.jpg",
    imageAlt:
      "Poster for Knowledge Atlas: a graph of notes with the uncertain links marked.",
  },
  {
    slug: "permission-rings",
    name: "Permission rings",
    description: "How far a scheduling agent may go with other people’s time.",
    topics: ["agentic"],
    liveUrl: "https://permission-rings.vercel.app",
    repoUrl: "https://github.com/sergushkincom/permission-rings",
    image: "/cards/card-permission-rings.jpg",
    imageAlt:
      "Poster for Permission rings: people arranged in rings around a scheduling agent.",
  },
  {
    slug: "agentic-ux-lab",
    name: "Agentic UX Lab",
    description: "Interaction experiments for AI software, built in code.",
    topics: ["agentic"],
    liveUrl: "https://agentic-ux-lab.vercel.app",
    repoUrl: "https://github.com/sergushkincom/agentic-ux-lab",
    image: "/cards/card-agentic-ux-lab.jpg",
    imageAlt:
      "Poster for Agentic UX Lab: a light settings panel beside a dark session view.",
  },
  {
    slug: "world-parts",
    name: "World Parts",
    description: "Find a spare part in a segmented 3D plant, room by room.",
    topics: ["spatial"],
    liveUrl: "https://world-parts.vercel.app",
    repoUrl: "https://github.com/sergushkincom/world-parts",
    image: "/cards/card-world-parts.jpg",
    imageAlt:
      "Poster for World Parts: a factory room with a pump marked and a parts list.",
  },
  {
    slug: "redline-supply",
    name: "Redline Supply",
    description:
      "Ask suppliers once, then approve every change with the old value, the new value, and the source.",
    topics: ["erp"],
    liveUrl: "https://redline-supply-seven.vercel.app",
    repoUrl: "https://github.com/sergushkincom/redline-supply",
    image: "/cards/card-redline-supply.jpg",
    imageAlt:
      "Poster for Redline Supply: a supplier answer beside the current value, with a source and a yes or no.",
  },
  {
    slug: "erp-navigation-concept",
    name: "ERP navigation",
    description:
      "Six navigation layers on one ERP screen, and one rule so they agree.",
    topics: ["erp"],
    liveUrl: "https://erp-navigation-concept.vercel.app",
    repoUrl: "https://github.com/sergushkincom/erp-navigation-concept",
    image: "/cards/card-erp-navigation-concept.jpg",
    imageAlt:
      "Poster for ERP navigation: one screen with six navigation layers sharing one rule.",
  },
  {
    slug: "funding-radar",
    name: "Funding radar",
    description:
      "Which Munich-area startups have fresh money, an open role, and a reason to talk now?",
    topics: ["erp"],
    liveUrl: "https://funding-radar-two.vercel.app",
    repoUrl: "https://github.com/sergushkincom/funding-radar",
    image: "/cards/card-funding-radar.jpg",
    imageAlt:
      "Poster for Funding radar: a scatter of Munich startups by raise and open roles.",
  },
  {
    slug: "impact-compare",
    name: "Relative",
    description:
      "Whether one product is actually lower-impact, and which stage of its life makes the gap.",
    topics: ["erp"],
    liveUrl: "https://impact-compare.vercel.app",
    repoUrl: "https://github.com/sergushkincom/impact-compare",
    image: "/cards/card-impact-compare.jpg",
    imageAlt:
      "Screenshot of Relative comparing Nordic C30/37 ready-mix concrete, with warming, energy, and water figures.",
  },
  {
    slug: "keyword-tracker",
    name: "Keyword Tracker",
    description: "What if the rank table is the chart?",
    topics: ["tools"],
    liveUrl: "https://keyword-tracker-nine.vercel.app",
    repoUrl: "https://github.com/sergushkincom/keyword-tracker",
    image: "/cards/card-keyword-tracker.jpg",
    imageAlt:
      "Screenshot of Keyword Tracker, a rank table drawn as colored bars across days.",
  },
  {
    slug: "grocery-first-order-prototype",
    name: "Grocery first order",
    description: "What if a new customer saw the deal before building the cart?",
    topics: ["tools"],
    liveUrl: "https://grocery-first-order-prototype.vercel.app",
    repoUrl: "https://github.com/sergushkincom/grocery-first-order-prototype",
    image: "/cards/card-grocery-first-order-prototype.jpg",
    imageAlt:
      "Screenshot of the grocery prototype with a first-order credit offer before the cart.",
  },
];
