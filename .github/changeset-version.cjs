const { execSync } = require('node:child_process');
const fs = require('fs');

// update package.json version & pnpm-lock.yaml
execSync('pnpm changeset version');
execSync('pnpm install --lockfile-only');

// update Cargo.toml version
const packageJson = require('./package.json');
const cargoToml = fs.readFileSync('Cargo.toml', 'utf8');

const newCargoToml = cargoToml.replace(
  /version = "[^"]*"/,
  `version = "${packageJson.version}"`
);

fs.writeFileSync('Cargo.toml', newCargoToml);

// update Cargo.lock
execSync('cargo generate-lockfile');
