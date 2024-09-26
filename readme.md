GitHub & BitBucket Mockup Preview
---------------------------------

Many GitHub repositories don't use GitHub Pages to host their HTML files. **GitHub & BitBucket Mockup Preview** allows you to render those files without cloning or downloading whole repositories. It is a client-side solution using multiple CORS proxies to fetch assets.

If you try to open the raw version of any HTML, CSS or JS file in a web browser directly from GitHub, all you will see is the source code. GitHub forces them to use the "text/plain" content-type, so they cannot be interpreted. This tool overrides it by using CORS proxies.

## Usage

To use it, simply enter the URL of an HTML file from GitHub or BitBucket on our website: **[https://www.tanghoong.com/mockup/](https://www.tanghoong.com/mockup/)** 

Alternatively, you can prepend this fragment to the URL of any HTML file: **[https://www.tanghoong.com/mockup/?](https://www.tanghoong.com/mockup/?)** 

For example:
 - https://www.tanghoong.com/mockup/?https://raw.githubusercontent.com/tanghoong/mockup/refs/heads/master/sample/bootstrap-5-album.html
 - https://www.tanghoong.com/mockup/?https://raw.githubusercontent.com/tanghoong/mockup/refs/heads/master/sample/bulma-landing-page.html
 - https://www.tanghoong.com/mockup/?https://raw.githubusercontent.com/tanghoong/mockup/refs/heads/master/sample/tailwind-dashboard.html
 - https://www.tanghoong.com/mockup/?https://raw.githubusercontent.com/tanghoong/mockup/refs/heads/master/sample/foundation-blog-template.html
 - https://www.tanghoong.com/mockup/?https://raw.githubusercontent.com/tanghoong/mockup/refs/heads/master/sample/vue-calendar-app.html

What it does: The tool loads HTML using CORS proxies, then processes all links, frames, scripts and styles, loading each of them using CORS proxies so they can be evaluated by the browser.

**GitHub & BitBucket Mockup Preview** has been tested with the latest versions of Google Chrome, Mozilla Firefox, and other modern browsers.

## Features

- Renders HTML files from GitHub and BitBucket repositories
- Uses multiple CORS proxies for improved reliability
- Supports rendering of CSS, JavaScript, and other linked assets
- Provides a user-friendly interface for entering URLs
- Offers sample links to demonstrate functionality
- Responsive design with a modern, Google-inspired look
- Loading indicator for better user experience
- Clear button to easily reset the input field
- Sample links section with descriptions for quick testing

## Sample Links

The tool now includes a "Sample Links" section with the following examples:

1. Photo Gallery: Responsive layout with Bootstrap 5
2. Calendar App: Simple Vue.js calendar
3. Landing Page: Responsive design with Bulma
4. Blog Template: Clean layout with Foundation
5. Dashboard: Responsive design with Tailwind

These sample links provide users with quick access to various HTML templates and designs for testing and inspiration.

## How to Use

1. Visit the Mockup Preview website.
2. Enter the URL of an HTML file from GitHub or BitBucket in the input field.
3. Click the "Preview" button (eye icon) or press Enter to render the file.
4. Alternatively, click on one of the sample links to preview pre-selected templates.

## License

&copy; 2023 Jerzy Głowacki under Apache License 2.0. Illustrated by tanghoong.
