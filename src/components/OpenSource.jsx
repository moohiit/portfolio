import GitHubActivity from "./GitHubActivity.jsx";
import FeaturedRepos from "./FeaturedRepos.jsx";
import CodingProfiles from "./CodingProfiles.jsx";
import { Reveal, SectionHeader } from "./ui.jsx";

// GitHub stats + contribution heatmap, top repositories and coding profiles,
// merged into one section. All data is fetched live; each part has its own fallback.
export default function OpenSource() {
  return (
    <section id="open-source" className="section">
      <div className="container">
        <SectionHeader
          index="06"
          eyebrow="Open source"
          title="Building in public"
          lead="Live from the GitHub API: a year of contributions and my most-starred repositories."
        />
        <Reveal id="github-activity">
          <GitHubActivity />
        </Reveal>
        <Reveal delay={0.05}>
          <FeaturedRepos />
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="subhead">Find me elsewhere</h3>
          <CodingProfiles />
        </Reveal>
      </div>
    </section>
  );
}
