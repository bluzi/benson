import React from 'react';
import ListItem from './list-item';

class App extends React.Component {
    state = {
        results: [],
        selected: -1,
    }

    constructor() {
        super();
    }

    componentDidMount() {
        this.refs.searchBar.focus();
    }

    render() {
        return (
            <div id="benson">
                <div className="search-bar single-line" ref="searchBar" contentEditable="true" placeholder="What do you need, sir?" onKeyDown={this.onSearchKeyPress.bind(this)} onKeyUp={this.onSearch.bind(this)}></div>
                <ul id="results">
                    {
                        this.state.results.map((result, index) =>
                            <ListItem key={index} isSelected={this.state.selected === index} type={result.type} description={result.description} id={result.id} index={index} onMouseOver={() => this.mouseOveritem(result, index)} onClick={() => this.onItemSelection(result)} />
                        )
                    }
                </ul>
            </div>
        );
    }

    async onItemSelection(result) {
        await this.sendSelection(result);
    }

    mouseOveritem(result, index) {
        this.setState({
            selected: index,
        });
    }    

    onSearchKeyPress(event) {
        if (event.key === 'ArrowUp') {
            this.setState({
                selected: this.state.selected <= 0 ? this.state.results.length -1 : this.state.selected - 1,
            });
            event.preventDefault();
        } else if (event.key === 'ArrowDown') {
            this.setState({
                selected: this.state.selected === this.state.results.length - 1 ? 0 : this.state.selected + 1,
            });
            event.preventDefault();
        } else if (event.key === 'Enter') {
            debugger;
            const selected = this.state.selected;
            if (selected > -1 && this.state.results && selected < this.state.results.length) {
                const result = this.state.results[selected];
                this.sendSelection(result);
            }
            event.preventDefault();
        }
    }

    onSearch() {
        const term = this.refs.searchBar.innerText;
        if (term.length > 0) {
            this.search(term)
                .then(results =>
                    this.setState({ results })
                );
        }
        else {
            this.setState({
                results: [],
            });
        }
    }

    search(term) {
        return new Promise(resolve => chrome.runtime.sendMessage({ method: 'search', term, }, response => resolve(response)));
    }

    sendSelection(selection) {
        return new Promise(resolve => chrome.runtime.sendMessage({ method: 'selection', selection, }, response => resolve(response)));
    }
}

export default App;