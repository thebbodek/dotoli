const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TARGET_DIRS = ['packages', 'apps'];
const IGNORE_DIRS = ['rollup-config', 'typescript-config', 'storybook'];
const COMMIT_HASH_DELIMITER = '__';
const MAIN_BRANCH = 'origin/main';

// 직전의 커밋과 비교하여 변경된 파일 경로 반환
function getChangedFiles({ targetBranch, commitHash }) {
  try {
    const diff = execSync(
      `git diff --name-only ${targetBranch} ${commitHash}`,
      { encoding: 'utf8' },
    ).trim();

    return diff.split('\n').filter(Boolean);
  } catch (e) {
    throw e;
  }
}

// 변경 패키지 이름 배열 반환
function getChangedPackageNames({ targetBranch, commitHash }) {
  const files = getChangedFiles({ targetBranch, commitHash });
  const changedPackages = new Set();

  files.forEach((file) => {
    const [root, name] = file.split(path.sep);
    const isIgnoreDir = IGNORE_DIRS.includes(name);
    const isTargetDir = TARGET_DIRS.includes(root);

    if (!name || isIgnoreDir || !isTargetDir) return;

    changedPackages.add(`${root}/${name}`);
  });

  return Array.from(changedPackages).map((path) =>
    findPackageName({ dirPath: path }),
  );
}

// 변경 패키지 이름 매칭
function findPackageName({ dirPath }) {
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

// main 브랜치와 비교하여 변경된 커밋 메시지, 커밋해시 배열 반환
function getChangedCommits() {
  const commitMessages = execSync(
    `git log origin/main..HEAD --reverse --pretty=format:"%s${COMMIT_HASH_DELIMITER}%h"`,
    { encoding: 'utf8' },
  ).trim();
  const commits = commitMessages.split('\n').filter(Boolean);

  return commits.map((commit) => {
    const [commitMessage, commitHash] = commit.split(COMMIT_HASH_DELIMITER);

    return { commitMessage, commitHash };
  });
}

// changeset .md 내용 생성
function getChangesetContent({ packageNames, commitMessage }) {
  const lines = [
    '---',
    ...packageNames.map((name) => `'${name}': patch`),
    '---',
    '',
    commitMessage,
    '',
  ];

  return lines.join('\n');
}

// changeset .md 파일 생성
function createChangeset({ content }) {
  try {
    const changesetPath = path.join(process.cwd(), '.changeset');
    const uniqueFileName = Math.random().toString(36).substring(2, 10);
    const file = path.join(changesetPath, `${uniqueFileName}.md`);

    fs.writeFileSync(file, content);

    return `.changeset/${uniqueFileName}.md`;
  } catch (e) {
    console.error('changeset 파일 생성 실패:', e);
    return '';
  }
}

// 전체 changeset.md 파일 삭제
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

function main() {
  cleanChangeset();

  const commits = getChangedCommits();
  let changedPackageNames = [];
  let createdFilePaths = [];

  commits.forEach(({ commitMessage, commitHash }, index) => {
    const isFirstCommit = index === 0;
    const targetBranch = isFirstCommit
      ? MAIN_BRANCH
      : commits[index - 1].commitHash;
    const packageNames = getChangedPackageNames({ targetBranch, commitHash });

    if (packageNames.length === 0) return;

    const filteredPackageNames = packageNames.filter(
      (name) => !changedPackageNames.includes(name),
    );

    changedPackageNames = [...changedPackageNames, ...filteredPackageNames];

    const content = getChangesetContent({ packageNames, commitMessage });
    const createdFilePath = createChangeset({ content });

    if (createdFilePath) {
      createdFilePaths.push(createdFilePath);
    }
  });

  console.log('\n📦 변경된 패키지:');
  if (changedPackageNames.length !== 0) {
    changedPackageNames.forEach((packageName) => {
      console.log(`   ✔︎ ${packageName}`);
    });
  } else {
    console.log('   ✔︎ 없음');
  }

  if (createdFilePaths.length !== 0) {
    console.log('\n✨ 생성 완료:');
    createdFilePaths.forEach((filePath) => {
      console.log(`   ✔︎ ${filePath}`);
    });
  }
  console.log('\n');
}

main();
