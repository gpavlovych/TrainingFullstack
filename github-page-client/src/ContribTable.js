import React, {Component} from 'react';

class ContribTable extends Component {
    render() {
        let dayNames = [" ", "M", " ", "W", " ", "F", " "];
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let rows = [];
        let weeksInMonth = 4;
        let monthsRow = [<th className="App-contributions-table-head">&nbsp;</th>];
        let monthsInYear = monthNames.length;
        let date = new Date();
        let currentMonth = date.getMonth();
        let currentDay = date.getDay();
        for (let columnIndex = 0; columnIndex < monthsInYear; columnIndex++) {
            monthsRow.push(<th className="App-contributions-table-head"
                               colSpan={weeksInMonth}>{monthNames[(currentMonth + columnIndex) % monthsInYear]}</th>)
        }
        rows.push(monthsRow);
        let weeksInYear = monthsInYear * weeksInMonth;
        let daysInWeek = dayNames.length;
        let noColor = "#00000000";
        let colors = ["#EEEEEE", "#D6E685", "#87C35D", "#46A442", "#226B27"];
        for (let dayInWeek = 0; dayInWeek < daysInWeek; dayInWeek++) {
            let columns = [<td className="App-contributions-table-cell">{dayNames[dayInWeek]}</td>];
            let contribValue = Math.floor(Math.random() * colors.length);
            let rgb = colors[contribValue];
            columns.push(<td className="App-contributions-table-cell"
                             style={{backgroundColor: dayInWeek < currentDay ? noColor : rgb}}>&nbsp;</td>);
            for (let columnIndex = 0; columnIndex < weeksInYear - 1; columnIndex++) {
                contribValue = Math.floor(Math.random() * colors.length);
                rgb = colors[contribValue];
                columns.push(<td className="App-contributions-table-cell" style={{backgroundColor: rgb}}>&nbsp;</td>);
            }
            contribValue = Math.floor(Math.random() * colors.length);
            rgb = colors[contribValue];
            columns.push(<td className="App-contributions-table-cell"
                             style={{backgroundColor: dayInWeek >= currentDay ? noColor : rgb}}>&nbsp;</td>);
            rows.push(<tr className="App-contributions-table-row">{columns}</tr>);
        }
        return <table className="App-contributions-table">
            {rows}
        </table>;
    }
}

export default ContribTable;