# Nonograms

This is a game of endless, randomly generated but solvable, Nonogram puzzles.

## Development

- Install [Node.js v20+](https://nodejs.org/) and Yarn
- `yarn install`
- `npx playwright install`
- `npm test`
- `npm run start`

## Deployment

Run `npm run deploy` to [release on GitHub Pages](https://vitejs.dev/guide/static-deploy.html#github-pages) using [gh-pages](https://github.com/tschaub/gh-pages) package.

## Resources and Notes

If there is precisely one solution, the Nonogram is called uniquely solvable; Nonograms in puzzle collections are usually of this class.
* https://2ality.com/2018/12/creating-arrays.html#recommended-patterns
* https://github.com/mikix/nonogram-db/blob/master/FORMAT.md
* https://github.com/ThomasR/nonogram-solver (ascii draw method)
* https://fedimser.github.io/nonogram (using this solver for randomly generated puzzles)
* https://github.com/crispy1989/nonogrammer
* https://github.com/liouh/picross
* https://github.com/jokude/react-nonogram
* http://jsimlo.sk/griddlers/algorithm.php (terminology, algorithms)
