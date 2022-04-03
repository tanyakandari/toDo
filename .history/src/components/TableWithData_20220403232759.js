import React from "react";
import { map, sumBy, filter, get } from 'lodash';
import { TextField } from "@material-ui/core";
import './table.css';
export default class TableWithData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data_error: ''
        }
        this.getHeader = this.getHeader.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleChange = event => {
        if (this.isValidJson(event.target.value))
            this.setState({ data: JSON.parse(event.target.value), data_error: '' })
        else
            this.setState({ data: event.target.value, data_error: 'JSON is not valid' })
    };

    isValidJson = str => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <div>
                <TextField
                    value={this.state.data_error ? this.state.data : JSON.stringify(this.state.data)}
                    variant="filled"
                    label="Enter JSON data"
                    onChange={this.handleChange}
                    helperText={this.state.data_error}
                />
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
