// Copy for the Process + Stats band (Step 9).

export const processSteps = [
    {
      id: "discover",
      number: "01",
      title: "Discover",
      duration: "Week 1",
      description:
        "Workshops, stakeholder interviews and a technical audit. We map goals, users and constraints, then agree on scope, timeline and success metrics.",
    },
    {
      id: "design",
      number: "02",
      title: "Design",
      duration: "Weeks 2–3",
      description:
        "Flows, wireframes and a clickable prototype that grows into a design system. You review real screens early — no big-reveal moments.",
    },
    {
      id: "build",
      number: "03",
      title: "Build",
      duration: "Weeks 3–8",
      description:
        "Weekly releases on staging with preview links. Reviewed, tested, production-grade code from the first commit — no integration-phase surprises.",
    },
    {
      id: "ship",
      number: "04",
      title: "Ship",
      duration: "Ongoing",
      description:
        "Launch day is the starting line. We monitor real usage, measure against the metrics we set together, and iterate in small, safe increments.",
    },
  ];
  
  // decimals is optional (defaults to 0); suffix renders after the number, e.g. "+", "%", "/5".
  export const stats = [
    { id: "shipped", value: 48, suffix: "+", label: "Products shipped" },
    { id: "retention", value: 96, suffix: "%", label: "Client retention" },
    { id: "rating", value: 4.9, decimals: 1, suffix: "/5", label: "Average client rating" },
    { id: "countries", value: 12, suffix: "", label: "Countries served" },
  ];