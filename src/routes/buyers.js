import React, { useEffect, useState } from 'react'
import { Container, ContainerSection, Field, FieldAsColumn } from '../components/container'
import { useParams } from 'react-router-dom'
import  { data, getPayment } from '../store/store'

import { gql } from '@apollo/client';
import { client } from '../api/graph';

import { CommonSearchBar } from '../components/searchBar';


const buyersQuery = `
    query {    
        buyerEntities {
            address
            payments{
                _transactionId
                _fiatSymbol
                _fiatAmount
                swap{
                  _tokenAmount
                  _amountInUSD
                  _tokenSymbol
                }
              } 
        }
    }`


class Buyers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buyers: []
        };
    }

    componentDidMount() {
        client.query({  
            query: gql(buyersQuery)
        })
        .then(data => { 
            console.log("Subgraph data: ", data) 
            // alert(Object.keys(vendors).join(","))
            this.setState({      
                buyers: data.data.buyerEntities 
            });
            //alert(vendors)
        })
        .catch(err => { console.log("Error fetching data: ", err) });
    }

   
    render () {
        return (
            <div class="h-full">
                <CommonSearchBar/>
                <Container title={"Buyers"}>
                    {this.state.buyers.map((b) => {
                        return <div class="">
                            <ContainerSection>
                                <Field name={"Address: "} value={b.address}/>
                                <p>
                                    <Field name={"Number of Transactions: "} value={b.payments.length}/>
                                </p>
                                <Field name={"Value: "} value={b.payments.map(p => p.swap._amountInUSD).reduce((t,amt) => Number(t) + Number(amt)) + " USD" }/>
                            </ContainerSection>
                        </div>
                    })} 
                </Container>
                
                
            </div>
        );
    }
}

function Buyer () {

    let { id } = useParams();

    const [payment, setPayment] = useState({})

    useEffect(() => {
        setPayment(getPayment(id))
    })

    return (
        <div class="">
            <Container title="Buyer">
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Tx: "} value={payment.tx}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Merchant: "} value={payment.merchant}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Buyer: "} value={payment.buyer}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Fiat: "} value={`${payment.fiatSymbol} ${payment.fiatAmount}`}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Crypto: "} value={`${payment.swap.tokenAmount} ${payment.swap.tokenSymbol}`}/>
                    </p>
                </ContainerSection>
            </Container>
        </div>
    );
}

export { Buyers, Buyer } 