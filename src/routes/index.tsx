import { createFileRoute } from "@tanstack/react-router";
import { MeSkinApp } from "@/components/meskin/MeSkinApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MeSkin — Skincare that fits your skin and your budget" },
      {
        name: "description",
        content:
          "Answer six quick questions and MeSkin builds the lowest-cost skincare basket that matches your skin type, concerns and budget.",
      },
      { property: "og:title", content: "MeSkin — Skincare that fits your skin and your budget" },
      {
        property: "og:description",
        content:
          "A budget-first skincare routine builder: six questions, an optional photo, and the cheapest basket that still matches your skin.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <MeSkinApp />;
}
