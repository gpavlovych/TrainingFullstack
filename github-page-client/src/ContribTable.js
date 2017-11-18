import React, {Component} from 'react';
import './ContribTable.css';

class ContribTable extends Component {
    render() {
        let dayNames = [" ", "M", " ", "W", " ", "F", " "];
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let rows = [];
        let cellSize = 13;
        let weeksInMonth = 4;
        let monthsRow = [<th className="App-contributions-table-head" key="m_d">&nbsp;</th>];
        let monthsInYear = monthNames.length;
        let date = new Date();
        let currentMonth = date.getMonth();
        let currentDay = date.getDay();
        for (let monthInYear = 0; monthInYear < monthsInYear; monthInYear++) {
            monthsRow.push(<th className="App-contributions-table-head" key={`m_${monthInYear}`}
                               colSpan={weeksInMonth}>{monthNames[(currentMonth + monthInYear) % monthsInYear]}</th>)
        }
        function ContribCell(color, dayInWeek, weekInYear) {
            return <td className="App-contributions-table-cell" key={`${dayInWeek}_${weekInYear}`}
                       style={{backgroundColor: color, width: `${cellSize}px`, height: `${cellSize}px`}}>&nbsp;</td>
        }
        let weeksInYear = monthsInYear * weeksInMonth;
        let daysInWeek = dayNames.length;
        let noColor = "#00000000";
        let colors = ["#EEEEEE", "#D6E685", "#87C35D", "#46A442", "#226B27"];
        for (let dayInWeek = 0; dayInWeek < daysInWeek; dayInWeek++) {
            let columns = [<td className="App-contributions-table-cell" key={`${dayInWeek}_day`}>{dayNames[dayInWeek]}</td>];
            let contribValue = Math.floor(Math.random() * colors.length);
            let rgb = colors[contribValue];
            columns.push(ContribCell(dayInWeek < currentDay ? noColor : rgb, dayInWeek, 0));
            for (let weekInYear = 0; weekInYear < weeksInYear - 1; weekInYear++) {
                contribValue = Math.floor(Math.random() * colors.length);
                rgb = colors[contribValue];
                columns.push(ContribCell(rgb, dayInWeek, weekInYear+1));
            }
            contribValue = Math.floor(Math.random() * colors.length);
            rgb = colors[contribValue];
            columns.push(ContribCell(dayInWeek >= currentDay ? noColor : rgb, dayInWeek,weeksInYear));
            rows.push(<tr className="App-contributions-table-row" key={`${dayInWeek}_row`}>{columns}</tr>);
        }
        let legendItems = [];
        for (let colorIndex = 0; colorIndex < colors.length; colorIndex++){
            let rgb = colors[colorIndex];
            legendItems.push(ContribCell(rgb, colorIndex, 0));
        }
        rows.push(<tr key="legend_row"><td className="App-contributions-table-cell" colSpan={weeksInYear}>
            <div className="App-contributions-table-cell-explanation">Summary of Pull Requests, issues opened, and commits. <a href="http://www.google.com">Learn
                more.</a></div>
            <div className="App-contributions-table-cell-legend"><table><tbody><tr><td>Less</td>{legendItems}<td>More</td></tr></tbody></table></div>
        </td></tr>);
        return <table className="App-contributions-table" style={{width:`${(cellSize+3)*(weeksInYear+3)}px`}}>
            <thead><tr>{monthsRow}</tr></thead>
           <tbody>{rows}</tbody>
        </table>;
    }
}

export default ContribTable;