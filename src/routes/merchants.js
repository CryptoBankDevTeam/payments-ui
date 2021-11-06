import React from 'react'
import { gql } from '@apollo/client';
import { client } from '../api/graph';

import { Container, ContainerSection, Field, FieldAsColumn } from '../components/container';
import { CommonSearchBar } from '../components/searchBar';

const merchantsQuery = `
    query {    
        vendorEntities{
            id
            _vendorId
            name
        }
    }`

class Merchants extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            merchants: []
        };
    }

    componentDidMount() {
        client.query({  
            query: gql(merchantsQuery)
        })
        .then(data => { 
            console.log("Subgraph data: ", data) 
            // alert(Object.keys(vendors).join(","))
            this.setState({      
                merchants: data.data.vendorEntities 
            });
            //alert(vendors)
        })
        .catch(err => { console.log("Error fetching data: ", err) });
    }

    render() {
        return(
            <div class="h-full">
                <CommonSearchBar/>
                <Container title={"Merchants"}>
                    {this.state.merchants.map((m) => {
                        return <div class="">
                            <ContainerSection>
                                <Field name={"Name: "} value={m.name}/>
                                <p>
                                    <Field name={"ID: "} value={m._vendorId}/>
                                </p>
                            </ContainerSection>
                        </div>
                    })} 
                </Container>
            </div>
        );
    }
}

export { Merchants }