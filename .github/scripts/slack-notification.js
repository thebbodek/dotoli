const {
  PUBLISH_INITIAL_RESULT,
  PUBLISH_RESULT_KEYS,
  PUBLISH_RESULT_TYPES,
  SLACK_MESSAGE_TEMPLATES,
} = require('./constants');
const {
  generateLogButtonBlock,
  generatePackagesBlock,
} = require('./utils/block');

const LOG = process.env.LOG;
const WORKFLOW_URL = process.env.WORKFLOW_URL;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

function cleanStr({ str }) {
  return str
    .replace(/\u001b\[.*?m/g, '') // ANSI color
    .replace(/\u00A0/g, ' ') // NBSP to normal space
    .replace(/\t/g, ' ') // tabs → space
    .trim();
}

function parseLog({ log }) {
  console.log('\n🔄 Parsing log...\n');
  const lines = log.split('\n').filter(Boolean);
  const result = PUBLISH_INITIAL_RESULT;

  lines.forEach((raw) => {
    const line = cleanStr({ str: raw });
    console.log('line: ', line);

    Object.values(PUBLISH_RESULT_KEYS).forEach((key) => {
      const { label, reg } = PUBLISH_RESULT_TYPES[key];

      if (line.includes(label)) {
        const match = line.match(reg);

        if (match) {
          const packageName = match[1];

          console.log(`  ✔ MATCH [${key}] → ${packageName}`);
          result[key] = [...result[key], packageName];
        } else {
          console.log(`  ✖ NO MATCH for [${key}] on line → ${line}`);
        }
      }
    });
  });

  return result;
}

// PREVIEW: https://s.bbodek.kr/8oXkKuyVsBJ
function generateSlackMessage({ result }) {
  console.log('\n📤 Generating slack message...');

  const resultBlocks = Object.values(PUBLISH_RESULT_KEYS).map((key) => {
    const { title, icon } = PUBLISH_RESULT_TYPES[key];

    return generatePackagesBlock({ title, icon, packages: result[key] });
  });

  return {
    blocks: [
      SLACK_MESSAGE_TEMPLATES.HEADER,
      SLACK_MESSAGE_TEMPLATES.DESCRIPTION,
      ...resultBlocks.filter(Boolean),
      generateLogButtonBlock({ url: WORKFLOW_URL }),
    ],
  };
}

async function main({ log }) {
  try {
    const result = parseLog({ log });
    const message = generateSlackMessage({ result });

    console.log('\nPosting to slack...');

    const res = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    if (!res.ok) {
      throw new Error(res);
    }

    console.log('💌 Slack notification sent successfully.');
  } catch (e) {
    console.error('💔 Slack notification failed:', e);
  }
}

main({ log: LOG });
