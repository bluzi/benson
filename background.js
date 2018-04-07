const tabs = {
    search: term =>
        new Promise((resolve) => {
            chrome.tabs.getAllInWindow(null, tabs => {
                const result =
                    tabs.filter(tab => tab.title.toLowerCase().includes(term.toLowerCase()))
                        .map(tab => ({
                            type: 'tab',
                            description: tab.title,
                            url: tab.url,
                        }));

                resolve(result);
            });
        }),

    select: selection =>
        new Promise((resolve) => {
            chrome.tabs.getAllInWindow(null, tabs => {
                const selectedTab = tabs.find(tab => tab.url === selection.url);

                if (selectedTab) {
                    chrome.tabs.update(selectedTab.id, { selected: true });
                } else {
                    chrome.tabs.create({ url: selection.url });
                }
            });
        }),
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    (async () => {
        if (request.method === 'search') {
            const term = request.term;
            const results = [];
            results.push(...(await tabs.search(term)));

            sendResponse(results.slice(0, 5));
        }

        if (request.method === 'selection') {
            const selection = request.selection;
            await tabs.select(selection);

            sendResponse(results.slice(0, 5));
        }
    })();

    return true;
});