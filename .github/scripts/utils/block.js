export function generateLogButtonBlock({ url }) {
  return {
    type: 'actions',
    elements: [
      {
        type: 'button',
        url,
        text: {
          type: 'plain_text',
          text: '✔︎ 로그 확인하러 가기',
          emoji: true,
        },
      },
    ],
  };
}

export function generatePackagesBlock({ title, icon, packages }) {
  const useBlock = packages && packages.length > 0;

  if (!useBlock) return null;

  const content = `${icon} ${title}\n   - ${packages.join('\n   - ')}`;
  console.log('\n', content);

  return {
    type: 'rich_text',
    elements: [
      {
        type: 'rich_text_preformatted',
        border: 0,
        elements: [
          {
            type: 'text',
            text: content,
          },
        ],
      },
    ],
  };
}
