import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

import React, { Component } from 'react';
import '../../styles/App.css';
import facade from "../../facades/ApiFacade";


export default class SwapiTable extends Component {

    constructor(props) {
        super(props);
        this.state = { person: "", starship: "", planet: "", species: "", film: "", data: null };
    }


    async componentDidMount() {
        try {
            let data = await facade.fetchSwapi();
            // data = data.filter((sw) => !sw.hasOwnProperty('error')); // catch errors at client instead of server
            // const data = await fetch(URL).then(handleHttpErrors)
            this.setState({ data })
        } catch (err) {
            alert("ACCESS DENIED! CODE: " + err.status);
        }
    }


    render() {
        if (this.state.data !== null) {
            let page = 1;
            let sizePerPage = 2;
            let totalSize = this.state.data.length;
            return (
                <div style={{ margin: 20, width: "100%" }}>
                    <h3>Swapi</h3>
                    <BootstrapTable
                        striped
                        hover
                        bootstrap4
                        keyField='name'
                        data={this.state.data}
                        columns={columns}
                        // filter={filterFactory()}
                        pagination={paginationFactory({ page, sizePerPage, totalSize })}
                    />

                </div>
            );
        }
        else {
            return <div><h1>Loading...</h1></div>
        }
    }
}

const columns =
[
    {
        dataField: 'name',
        text: 'Name',
        // filter: textFilter(),
        sort: true

    }, {
        dataField: 'films',
        text: 'Films',
        // filter: textFilter(),
        sort: true
    }
];