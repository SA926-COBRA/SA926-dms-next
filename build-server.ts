import * as esbuild from 'esbuild';

(async () => {
  await esbuild.build({
    entryPoints: ['server.js'],
    bundle: true,
    platform: 'node',
    target: ['node18.0'],
    // outfile: 'dist/server/server.js',
    outdir: 'build/dist',
    plugins: [],
  });
})();
