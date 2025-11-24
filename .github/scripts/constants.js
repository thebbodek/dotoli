export const PUBLISH_RESULT_KEYS = {
  TARGETS: 'targets',
  SKIPPED: 'skipped',
  FAILED: 'failed',
  PUBLISHED: 'published',
};

export const PUBLISH_RESULT_TYPES = {
  [PUBLISH_RESULT_KEYS.TARGETS]: {
    title: '배포 대상',
    icon: '📦',
    label: 'info npm info',
    reg: /npm info\s+([@\w\/-]+)/,
  },
  [PUBLISH_RESULT_KEYS.SKIPPED]: {
    title: '배포 제외',
    icon: '⚠️',
    label: 'is not being published',
    reg: /warn\s+([@\w/-]+)/,
  },
  [PUBLISH_RESULT_KEYS.FAILED]: {
    title: '배포 실패',
    icon: '❌',
    label: 'error an error',
    reg: /publishing\s+([@\w\/-]+)/,
  },
  [PUBLISH_RESULT_KEYS.PUBLISHED]: {
    title: '배포 성공',
    icon: '🚀',
    label: 'New tag:',
    reg: /New tag:\s+([@\w/-]+)(?:@[0-9A-Za-z.-]+)/,
  },
};

export const PUBLISH_INITIAL_RESULT = {
  [PUBLISH_RESULT_KEYS.TARGETS]: [],
  [PUBLISH_RESULT_KEYS.SKIPPED]: [],
  [PUBLISH_RESULT_KEYS.PUBLISHED]: [],
  [PUBLISH_RESULT_KEYS.FAILED]: [],
};

export const SLACK_MESSAGE_TEMPLATES = {
  HEADER: {
    type: 'header',
    text: {
      type: 'plain_text',
      text: '🐿 도토리 배달 왔어요!',
      emoji: true,
    },
  },
  DESCRIPTION: {
    type: 'rich_text',
    elements: [
      {
        type: 'rich_text_section',
        elements: [
          {
            type: 'text',
            text: '도토리 패키지 배포 현황을 확인해 주세요.\n',
          },
        ],
      },
    ],
  },
};
