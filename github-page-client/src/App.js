import React, { Component } from 'react';
import SummaryItem from './SummaryItem';
import ContribTable from './ContribTable';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Public contributions</h1>
                </header>
                    <ContribTable/>
                <footer className="App-footer">
                    <table className="App-footer-summary">
                        <tbody>
                            <tr>
                                <td>
                                    <SummaryItem title="Year of contributions" value="6,280 total" startDate="Sep 25, 2013"
                                                 endDate="Sep 25, 2014"/>
                                </td>
                                <td>
                                    <SummaryItem title="Longest streak" value="341 days" startDate="October 20"
                                                 endDate="September 25"/>
                                </td>
                                <td>
                                    <SummaryItem title="Current streak" value="341 days" startDate="October 20"
                                                 endDate="September 25"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </footer>
            </div>
        );
    }
}

export default App;
