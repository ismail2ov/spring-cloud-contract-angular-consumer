const { spawn, spawnSync } = require('child_process');

const STUB_IMAGE = 'ismail2ov/ecommerce-catalog-stubs:latest';
const DOCKER_COMMAND = 'docker';
const STUB_SERVER_NAME = 'ecommerce-catalog-stub-server';

try {
  spawnSync(DOCKER_COMMAND, ['rm', '-f', STUB_SERVER_NAME], { stdio: 'inherit', shell: true });
} catch (e) {
  console.log('No running Stub Server found.');
}

runIntegrationTests(DOCKER_COMMAND, ['run', '--rm', '--name', STUB_SERVER_NAME, '-p', '8080:8080', STUB_IMAGE], () => {
  console.log("The integration tests have finished.");
});

function runIntegrationTests(command, args, callback) {
  console.log("Start running integration tests!");
  const child = spawn(command, args);

  let testsDone = false;

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (data) => {
    data = data.toString();
    if (data.includes('Started StubRunnerApplication')) {
      try {
        const jestSpawn = spawnSync('npx', ['jest', '--config', 'jest.integration.config.js'], { stdio: 'pipe', shell: true });
        console.log(jestSpawn.stdout.toString());
        testsDone = true;
        if (jestSpawn.stderr && jestSpawn.stderr.toString() !== '') {
          console.log(Error(jestSpawn.stderr));
          process.exit(1);
        }
      } finally {
        spawnSync(DOCKER_COMMAND, ['rm', '-f', STUB_SERVER_NAME], { stdio: 'inherit', shell: true });
        callback();
      }
    }
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (data) => {
    console.log('stderr: ' + data);
    data = data.toString();
    console.log(Error(data));
    process.exitCode = 1;
  });
}
