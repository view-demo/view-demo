(() => {
	const previewForm = document.getElementById('previewform');
	const loadingIndicator = document.getElementById('loading-indicator');

	// Get URL of the raw file
	const url = location.search.substring(1)
		.replace(/\/\/github\.com/, '//raw.githubusercontent.com')
		.replace(/\/blob\//, '/');

	const showLoading = () => {
		loadingIndicator.style.display = 'flex';
		document.body.style.overflow = 'hidden';
	};

	const hideLoading = () => {
		loadingIndicator.style.display = 'none';
		document.body.style.overflow = 'auto';
	};

	const replaceAssets = () => {
		// Frames
		const frames = [...document.getElementsByTagName('iframe')]
			.filter(frame => frame.src.includes('//raw.githubusercontent.com') || frame.src.includes('//bitbucket.org'))
			.map(frame => {
				const src = frame.src;
				frame.src = 'about:blank';
				return fetchProxy(src).then(data => frame.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(data));
			});

		// Links
		[...document.getElementsByTagName('a')]
			.filter(link => link.href.includes('//raw.githubusercontent.com') || link.href.includes('//bitbucket.org'))
			.forEach(link => link.href = '?' + link.href);

		// Stylesheets
		const links = [...document.querySelectorAll('link[rel=stylesheet]')]
			.filter(link => link.href.includes('//raw.githubusercontent.com') || link.href.includes('//bitbucket.org'))
			.map(link => fetchProxy(link.href).then(data => ({ data, href: link.href })));

		// Scripts
		const scripts = [...document.querySelectorAll('script[type="text/htmlpreview"]')]
			.map(script => {
				if (script.src.includes('//raw.githubusercontent.com') || script.src.includes('//bitbucket.org')) {
					return fetchProxy(script.src).then(data => ({ data, src: script.src }));
				} else {
					script.removeAttribute('type');
					return Promise.resolve({ data: script.innerHTML, src: null });
				}
			});

		// Preload and prefetch resources
		const preloadResources = [...links, ...scripts].map(resource => {
			if (resource instanceof Promise) {
				return resource.then(({ href, src }) => href || src);
			}
			return resource.href || resource.src;
		});

		Promise.all(preloadResources).then(resources => {
			resources.forEach(resource => {
				if (resource) {
					const link = document.createElement('link');
					link.rel = 'preload';
					link.as = resource.endsWith('.css') ? 'style' : 'script';
					link.href = resource;
					document.head.appendChild(link);

					const prefetch = document.createElement('link');
					prefetch.rel = 'prefetch';
					prefetch.href = resource;
					document.head.appendChild(prefetch);
				}
			});

			// Load stylesheets
			return Promise.all(links);
		}).then(styles => {
			styles.forEach(({ data, href }) => loadCSS(data, href));

			// Load scripts
			return Promise.all(scripts);
		}).then(scriptResults => {
			scriptResults.forEach(({ data, src }) => loadJS(data, src));
			document.dispatchEvent(new Event('DOMContentLoaded', {bubbles: true, cancelable: true}));
			hideLoading();
		});
	};

	const loadHTML = (data) => {
		if (data) {
			data = data.replace(/<head([^>]*)>/i, `<head$1><base href="${url}">`)
				.replace(/<script(\s*src=["'][^"']*["'])?(\s*type=["'](text|application)\/javascript["'])?/gi, '<script type="text/htmlpreview"$1');

			requestAnimationFrame(() => {
				document.open();
				document.write(data);
				document.close();
				replaceAssets();
			});
		}
	};

	const loadCSS = (data, href) => {
		if (data) {
			const style = document.createElement('style');
			style.textContent = data;
			if (href) {
				style.setAttribute('data-href', href);
			}
			document.head.appendChild(style);
		}
	};

	const loadJS = (data, src) => {
		if (data) {
			const script = document.createElement('script');
			script.textContent = data;
			if (src) {
				script.setAttribute('data-src', src);
			}
			// Use defer to ensure the script is executed after the DOM is fully loaded
			script.defer = true;
			document.body.appendChild(script);
		}
	};

	const fetchProxy = async (url, options = {}, proxyIndex = 0) => {
		const proxies = [
			'', // try without proxy first
			'https://api.codetabs.com/v1/proxy/?quest=',
			'https://cors-anywhere.herokuapp.com/'
		];

		try {
			const res = await fetch(proxies[proxyIndex] + url, options);
			if (!res.ok) throw new Error(`Cannot load ${url}: ${res.status} ${res.statusText}`);
			return res.text();
		} catch (error) {
			if (proxyIndex === proxies.length - 1) throw error;
			return fetchProxy(url, options, proxyIndex + 1);
		}
	};

	// Show loading indicator by default
	showLoading();

	if (url && !url.includes(location.hostname)) {
		fetchProxy(url)
			.then(loadHTML)
			.catch(error => {
				console.error(error);
				previewForm.style.display = 'block';
				previewForm.textContent = error;
				hideLoading();
			});
	} else {
		previewForm.style.display = 'block';
		hideLoading();
	}
})();
