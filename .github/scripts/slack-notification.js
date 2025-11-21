import fetch from 'node-fetch';

const log = process.env.LOG || '';
const workflowUrl = process.env.WORKFLOW_URL;

function parseLog(log) {
  const lines = log.split('\n');
  const result = {
    success: !/exit code 1|error/i.test(log),
    targets: [],
    skipped: [],
    published: [],
    failed: [],
  };

  for (const line of lines) {
    let message;

    if ((message = line.match(/info ([@\w\/-]+) is being published/))) {
      result.targets.push(message[1]);
      continue;
    }

    if ((message = line.match(/warn ([@\w\/-]+) is not being published/))) {
      result.skipped.push(message[1]);
      continue;
    }

    if ((message = line.match(/^🦋\s+(@[\w\/-]+@\d+\.\d+\.\d+)/))) {
      result.published.push(message[1]);
      continue;
    }

    if (
      /failed to publish/i.test(line) &&
      (message = line.match(/^🦋\s+(@[\w\/-]+@\d+\.\d+\.\d+)/))
    ) {
      result.failed.push(message[1]);
    }
  }

  return result;
}

function asBlock(title, icon, list) {
  return list?.length
    ? {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_preformatted',
            border: 0,
            elements: [
              {
                type: 'text',
                text: `${icon} ${title}\n   - ${list.join('\n   - ')}`,
              },
            ],
          },
        ],
      }
    : null;
}

function buildSlackMessage(data) {
  return {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🐿 도토리 배달 왔어요!',
          emoji: true,
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: '도토리 패키지 배포 현황을 확인해 주세요.\n\n',
              },
            ],
          },
        ],
      },
      asBlock('배포 대상', '📦', data.targets),
      asBlock('배포 제외', '⚠️', data.skipped),
      asBlock('배포 성공', '🚀', data.published),
      asBlock('배포 실패', '❌', data.failed),
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '배포 상세 결과를 확인해 보세요 ✨',
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: '✔︎ 로그 확인하기',
            emoji: true,
          },
          value: 'click_log',
          url: workflowUrl,
          action_id: 'button-action',
        },
      },
    ].filter(Boolean),
  };
}

async function main() {
  const parsed = parseLog(log);
  const message = buildSlackMessage(parsed);

  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });

  console.log('Slack notification sent.');
}

main();
