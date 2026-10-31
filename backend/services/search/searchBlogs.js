import { cleanMarkdown } from "./cleaner.js";
import { tokenize } from "./tokenizer.js";
import { removeStopWords } from "./stopWords.js";

const post = `
# bob dylan and his journey

If you’ve spent any time digging through the history of folk, rock, or just really good poetry set to music, you’ve hit a Bob Dylan wall. And by wall, I mean a massive, towering monument of songwriting that hasn't stopped growing since the early 60s. Dylan isn’t just a guy with a guitar; he’s a shapeshifter who basically reinvented what it means to be an American artist. Let’s take a stroll through his long, winding road.

## from minnesota to the village
Before he was *Bob Dylan*, he was Robert Zimmerman, a kid from Hibbing, Minnesota, obsessed with Woody Guthrie. He hopped a train (well, a bus/car situation) to Greenwich Village, NYC, in the early 60s. The folk scene there was tight-knit, political, and acoustic. Dylan didn’t just join it; he blew it wide open with songs like "Blowin' in the Wind." He was the "voice of a generation" before he was even old enough to buy a drink in most states.

## the electric betrayal
By 1965, Dylan was bored with the "protest singer" label. During the Newport Folk Festival, he strapped on a Fender Stratocaster and plugged into an amp, effectively committing what many purists called "treason." He traded the harmonica rack for a wall of organ and electric guitar feedback. It was messy, it was loud, and it changed rock music forever. If you want to visualize his transition from acoustic purity to rock-and-roll chaos, think of it like refactoring legacy code:

\`\`\`javascript
const dylanEvolution = {
  era: '1962',
  style: 'acoustic_folk',
  protestSongs: true,
  isPluggedIn: false
};

const electricDylan = {
  ...dylanEvolution,
  style: 'electric_rock',
  protestSongs: false,
  isPluggedIn: true,
  attitude: 'legendary'
};
\`\`\`

## the never-ending tour
If you’ve heard of the "Never Ending Tour," you know it’s not an exaggeration. Since 1988, Dylan has been on the road almost constantly.

## the nobel prize and the legacy
Just when you think you’ve got him pegged, he goes and wins the Nobel Prize in Literature.

## conclusion
Bob Dylan’s journey isn’t a straight line. Stay weird, keep writing, and never stop moving.
`;

const cleaned = cleanMarkdown(post);
const tokens = tokenize(cleaned);
const finalTokens = removeStopWords(tokens);

// console.log("Cleaned:");
// console.log(cleaned);

// console.log("\nTokens:");
// console.log(tokens);

// console.log("\nFinal Tokens:");
// console.log(finalTokens);
