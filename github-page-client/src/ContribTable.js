import React, {Component} from 'react';
import './ContribTable.css';
import server from './fakeBackend';
import helper from './helper';
import Async from 'react-promise';

class ContribTable extends Component {
    render() {
        return <Async promise={server.getContributions()} then={response => {
            function createContribTd(color, dayInWeek, weekInYear) {
                return <td className="App-contributions-table-cell" key={`${dayInWeek}_${weekInYear}`}
                           style={{
                               backgroundColor: color,
                               width: `${cellSize}px`,
                               height: `${cellSize}px`
                           }}>&nbsp;</td>
            }

            let statsByMonth = {};
            for (let responseIndex = 0; responseIndex < response.length; responseIndex++) {
                statsByMonth[response[responseIndex].date] = response[responseIndex].value;
            }

            function createMonthTh(head, mir, colspan) {
                if (typeof mir === 'undefined') {
                    mir = "d";
                }

                return <th className="App-contributions-table-head" key={`m_${mir}`}
                           colSpan={colspan || 1}>{head}</th>
            }

            function getContrib(d) {
                return statsByMonth[helper.toISODate(d)];
            }

            let dayNames = [" ", "M", " ", "W", " ", "F", " "];
            let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let rows = [];
            let cellSize = 13;
            let weeksInMonth = 4;
            let monthsRow = [createMonthTh()];
            let monthsInYear = monthNames.length;
            let date = new Date();
            let currentMonth = date.getMonth();
            let currentDay = date.getDay();
            for (let monthInYear = 0; monthInYear < monthsInYear; monthInYear++) {
                monthsRow.push(createMonthTh(monthNames[(currentMonth + monthInYear) % monthsInYear], monthInYear, weeksInMonth))
            }
            let weeksInYear = monthsInYear * weeksInMonth;
            let daysInWeek = dayNames.length;
            let noColor = "#00000000";
            let colors = ["#EEEEEE", "#D6E685", "#87C35D", "#46A442", "#226B27"];

            function getColor(value) {
                return colors[Math.floor(value * (colors.length - 1))] || noColor;
            }

            let monday = helper.getMonday(date);
            for (let dayInWeek = 0; dayInWeek < daysInWeek; dayInWeek++) {
                let columns = [<td className="App-contributions-table-cell"
                                   key={`${dayInWeek}_day`}>{dayNames[dayInWeek]}</td>];
                let contribValue = getContrib(helper.addDays(monday, dayInWeek));
                columns.push(createContribTd(dayInWeek < currentDay ? noColor : getColor(contribValue), dayInWeek, 0));
                for (let weekInYear = 0; weekInYear < weeksInYear - 1; weekInYear++) {

                    let contribValue = getContrib(helper.addDays(monday, (weekInYear + 1) * 7 + dayInWeek));
                    console.log(contribValue);
                    columns.push(createContribTd(getColor(contribValue), dayInWeek, weekInYear + 1));
                }
                contribValue = getContrib(helper.addDays(monday, weeksInYear * 7));
                console.log(contribValue);
                columns.push(createContribTd(dayInWeek >= currentDay ? noColor : getColor(contribValue), dayInWeek, weeksInYear));
                rows.push(<tr className="App-contributions-table-row" key={`${dayInWeek}_row`}>{columns}</tr>);
            }
            let legendItems = [];
            for (let colorIndex = 0; colorIndex < colors.length; colorIndex++) {
                legendItems.push(createContribTd(colors[colorIndex], colorIndex, 0));
            }
            rows.push(<tr key="legend_row">
                <td className="App-contributions-table-cell" colSpan={weeksInYear}>
                    <div className="App-contributions-table-cell-explanation">Summary of Pull Requests, issues
                        opened, and
                        commits. <a href="http://www.google.com">Learn
                            more.</a></div>
                    <div className="App-contributions-table-cell-legend">
                        <table>
                            <tbody>
                            <tr>
                                <td>Less</td>
                                {legendItems}
                                <td>More</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>);

            return (<table className="App-contributions-table"
                           style={{width: `${(cellSize + 3) * (weeksInYear + 3)}px`}}>
                <thead>
                <tr>{monthsRow}</tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>);
        }}/>;
    }
}

export default ContribTable;