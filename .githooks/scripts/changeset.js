const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TARGET_DIRS = ['packages', 'apps'];
const IGNORE_DIRS = ['rollup-config', 'typescript-config', 'storybook'];

function getChangedFiles() {
  try {
    const diff = execSync('git diff --name-only origin/dev', {
      encoding: 'utf8',
    }).trim();

    return diff.split('\n').filter(Boolean);
  } catch (e) {
    throw e;
  }
}

// 변경 패키지 경로
function getChangedPackagePaths() {
  const files = getChangedFiles();
  const changedPackages = new Set();

  files.forEach((file) => {
    const [root, name] = file.split(path.sep);
    const isIgnoreDir = IGNORE_DIRS.includes(name);
    const isTargetDir = TARGET_DIRS.includes(root);

    if (!name || isIgnoreDir || !isTargetDir) return;

    changedPackages.add(`${root}/${name}`);
  });

  return Array.from(changedPackages);
}

// 변경 패키지 이름 매칭
function findPackageName(dirPath) {
  try {
    const packageJsonPath = path.join(process.cwd(), dirPath, 'package.json');

    if (!fs.existsSync(packageJsonPath)) throw new Error();

    const packageRaw = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageRaw);

    return packageJson.name;
  } catch (e) {
    console.error(`${dirPath}/package.json 읽기/파싱 실패:`, e);
    return `${dirPath}: 확인 필요`;
  }
}

// changeset .md 내용 생성
function getChangesetContent(packageNames, summary) {
  const lines = [
    '---',
    ...packageNames.map((name) => `'${name}': patch`),
    '---',
    '',
    summary,
    '',
  ];

  return lines.join('\n');
}

// changeset .md 파일 생성
function createChangeset(content) {
  try {
    const changesetPath = path.join(process.cwd(), '.changeset');
    const changesetId = Math.random().toString(36).substring(2, 10);
    const file = path.join(changesetPath, `${changesetId}.md`);

    fs.writeFileSync(file, content);
    console.log(`✨ 생성 완료: .changeset/${changesetId}.md\n`);
  } catch (e) {
    console.error('changeset 파일 생성 실패:', e);
    return;
  }
}

// changeset.md 파일 모두 제거
function cleanChangeset() {
  const changesetPath = path.join(process.cwd(), '.changeset');
  const hasChangesetDir = fs.existsSync(changesetPath);

  if (!hasChangesetDir) {
    fs.mkdirSync(changesetPath, { recursive: true });
  }

  fs.readdirSync(changesetPath)
    .filter((file) => file.endsWith('.md'))
    .forEach((file) => {
      fs.unlinkSync(path.join(changesetPath, file));
    });
}

function main(commitMessage) {
  cleanChangeset();

  console.log('\n📦 변경된 패키지:');
  const changedPackagePaths = getChangedPackagePaths();

  if (changedPackagePaths.length === 0) {
    console.log('   ✔︎ 없음');
    return;
  }

  const changedPackagesNames = changedPackagePaths.map((path) => {
    console.log(`   ✔︎ ${path}`);
    return findPackageName(path);
  });
  const content = getChangesetContent(changedPackagesNames, commitMessage);

  createChangeset(content);
}

main(process.argv[2]);
