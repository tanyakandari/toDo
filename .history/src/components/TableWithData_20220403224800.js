import React from "react";
import { map, sumBy, filter, get } from 'lodash';
export default class TableWithData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{
                "id":39,
                "job":"Developer",
                "name":"Mary",
                "target": 16
                }],
        }
        this.getHeader = this.getHeader.bind(this);
    }

    uniqueNames = () => [...new Set(map(this.state.data, obj => get(obj, 'name') ? get(obj, 'name', '').toUpperCase() : ''))]
    uniqueJobs = () => [...new Set(map(this.state.data, obj => get(obj, 'job') ? get(obj, 'job').toUpperCase() : ''))]

    getHeader = () => map(['Job/Name', ...this.uniqueNames()], name => <th key={name}>{name}</th>)

    getRowsData = () => {
        return map(this.uniqueJobs(), job => {
            return (
                <tr>
                    <td key={job}>{job}</td>
                    {map(this.uniqueNames(), name => <td key={name + job}>{this.getCellData(name, job)}</td>)}
                </tr >)
        })
    }

    getCellData = (name, job) => sumBy(filter(this.state.data, obj => get(obj, 'name', '').toUpperCase() === name && get(obj, 'job', '').toUpperCase() === job), 'target')

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>{this.getHeader()}</tr>
                    </thead>
                    <tbody>
                        {this.getRowsData()}
                    </tbody>
                </table>
            </div>

        );
    }
}
