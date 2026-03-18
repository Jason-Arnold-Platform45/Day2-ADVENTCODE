import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').trim();

let total = 0n;

for (const range of input.split(',')) {
  const [lo, hi] = range.trim().split('-').map(BigInt);

  for (let n = 1n; n <= 15n; n++) {
    const factor = 10n ** n + 1n;
    const minX = n === 1n ? 1n : 10n ** (n - 1n);
    const maxX = 10n ** n - 1n;

    const a = (lo + factor - 1n) / factor < minX ? minX : (lo + factor - 1n) / factor;
    const b = hi / factor > maxX ? maxX : hi / factor;

    if (a > b) continue;

    total += factor * ((b - a + 1n) * (a + b) / 2n);
  }
}

console.log('Answer:', total.toString());
