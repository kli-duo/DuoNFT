/**
 * Our own implementation of the `check-dependencies` npm package, which is buggy
 * in its inability to detect version mismatches of in-house packages like web-ui
 */

const fs = require("fs");

const main = () => {
  const f = fs.readFileSync("package.json");
  const packageJson = JSON.parse(f);

  // Loop through dependencies
  let success = true;
  for (const [dependency, expectedVersion] of Object.entries({
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  })) {
    // # Check whether dependency is installed
    const path = `node_modules/${dependency}/package.json`;
    if (!fs.existsSync(path)) {
      console.log(`Package '${dependency}' is not installed.`);
      success = false;
      continue;
    }

    // Read dependency's package.json
    const f = fs.readFileSync(path);
    const packageJson = JSON.parse(f);

    // Check whether dependency is at expected version
    const [actualVersion] = (packageJson._from || "").split("@").slice(-1);
    if (actualVersion !== expectedVersion) {
      console.log(
        `Package '${dependency}' is at ${actualVersion} but expected ${expectedVersion}`
      );
      success = false;
    }
  }

  if (!success) {
    process.exit(1);
  }
};

main();
