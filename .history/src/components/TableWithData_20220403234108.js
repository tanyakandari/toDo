import React from "react";
import { map, sumBy, filter, get } from 'lodash';
import { TextField } from "@material-ui/core";
import './table.css';
export default class TableWithData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data_error: '',
            example_json: [
                {
                    "id": 1,
                    "job": "Developer",
                    "name": "Mary",
                    "target": 20
                }],
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
                <div>Welcome to ToDo App</div>
                <div> Please enter json in this format. <div><pre>{JSON.stringify(this.state.example_json)}</pre></div></div>
                <div>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Enter JSON data"
                        multiline
                        maxRows={4}
                        value={this.state.data_error ? this.state.data : JSON.stringify(this.state.data)}
                        onChange={this.handleChange}
                        helperText={this.state.data_error}
                        style={{ width: '90%' }}
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
            </div>
        );
    }
}
