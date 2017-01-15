# How to contribute

If you want to change something in the library, make sure that:

1. **You changed `.pug` or `.scss` files.** Please don't change `.css` & `.html`. They are build automatically with Gulp, and your changes will be overwritten when somebody run it again.   

2. **You run linter and it checked your changes.** If it's not so—do it.

3. **Your changes didn't break current features.**

Usually for change something you should follow these steps:

1. [Fork & clone the repo](https://help.github.com/articles/fork-a-repo/).

2. Install the latest [node.js](https://nodejs.org/) if you don't have it.

3. Run `npm install` in directory with cloned repo.

4. Run `npm run dev`. It will start server on `http://localhost:3000`, where you can see your changes if demo site uses them. Also all your changes will be linted. Read the logs!

   You can run `npm run build` if you don't need the dev-server. It will be build your changes and update CSS / HTML.

5. If you add new feature it would be great to add a demo to the site. Feel free to do it.

6. Commit & push your changes to your fork and create the PR! Don't forget to describe in PR what do you change.

**Thank you for your contribution!**
