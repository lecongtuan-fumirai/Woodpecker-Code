import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

test('App Integrity Test: Source files exist', () => {
  assert.ok(fs.existsSync('index.html'), 'index.html must exist');
  assert.ok(fs.existsSync('src/main.js'), 'src/main.js must exist');
  assert.ok(fs.existsSync('src/style.css'), 'src/style.css must exist');
});

test('App Configuration Test: Package definition valid', () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  assert.strictEqual(pkg.name, 'woodpecker-fe-demo');
  assert.ok(pkg.scripts.build, 'build script must be defined');
});
