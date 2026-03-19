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

console.log('Part 1:', total.toString());

function mobius(n: bigint): bigint {
  if (n === 1n) return 1n;
  let count = 0;
  let temp = n;
  for (let p = 2n; p * p <= temp; p++) {
    if (temp % p === 0n) {
      count++;
      temp /= p;
      if (temp % p === 0n) return 0n;
    }
  }
  if (temp > 1n) count++;
  return BigInt(count % 2 === 0 ? 1 : -1);
}

let total2 = 0n;

for (const range of input.split(',')) {
  const [lo, hi] = range.trim().split('-').map(BigInt);

  for (let L = 2; L <= 15; L++) {
    for (let d = 1; d < L; d++) {
      if (L % d !== 0) continue;
      const mu = mobius(BigInt(L / d));
      if (mu === 0n) continue;

      const pow10L = 10n ** BigInt(L);
      const pow10d = 10n ** BigInt(d);
      const factor = (pow10L - 1n) / (pow10d - 1n);

      const minX = d === 1 ? 1n : 10n ** BigInt(d - 1)
      const maxX = pow10d - 1n;

      const _xa = (lo + factor - 1n) / factor;
      const _xb = hi / factor;
      const xa = _xa < minX ? minX : _xa;
      const xb = _xb > maxX ? maxX : _xb;

      if (xa > xb) continue;

      const F = factor * ((xb - xa + 1n) * (xa + xb) / 2n);
      total2 += -mu * F;
    }
  }
}

console.log('Part 2:', total2.toString());
