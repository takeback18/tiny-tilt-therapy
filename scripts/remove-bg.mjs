import sharp from 'sharp';

async function removeBackground(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Sample background color from near the top-left corner
  const bgIdx = (10 * width + 10) * channels;
  const bgR = data[bgIdx], bgG = data[bgIdx + 1], bgB = data[bgIdx + 2];
  console.log(`Detected background: rgb(${bgR}, ${bgG}, ${bgB})`);

  const threshold = 28;
  const transparent = new Uint8Array(width * height);
  const visited = new Uint8Array(width * height);

  function isBackground(pos) {
    const i = pos * channels;
    return Math.sqrt(
      (data[i] - bgR) ** 2 + (data[i + 1] - bgG) ** 2 + (data[i + 2] - bgB) ** 2
    ) < threshold;
  }

  // BFS flood fill from all four corners
  for (const seed of [0, width - 1, width * (height - 1), width * height - 1]) {
    if (visited[seed]) continue;
    const queue = [seed];
    let head = 0;
    while (head < queue.length) {
      const pos = queue[head++];
      if (visited[pos]) continue;
      visited[pos] = 1;
      if (isBackground(pos)) {
        transparent[pos] = 1;
        const x = pos % width, y = Math.floor(pos / width);
        if (x > 0)          queue.push(pos - 1);
        if (x < width - 1)  queue.push(pos + 1);
        if (y > 0)          queue.push(pos - width);
        if (y < height - 1) queue.push(pos + width);
      }
    }
  }

  // Build RGBA buffer
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const s = i * channels, d = i * 4;
    out[d] = data[s]; out[d + 1] = data[s + 1]; out[d + 2] = data[s + 2];
    out[d + 3] = transparent[i] ? 0 : 255;
  }

  await sharp(out, { raw: { width, height, channels: 4 } }).png().toFile(outputPath);
  console.log(`Saved → ${outputPath}`);
}

removeBackground('public/logo.jpg', 'public/logo.png').catch(console.error);
