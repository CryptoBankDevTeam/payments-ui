import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Container, ContainerSection, Field, FieldAsColumn } from '../components/container'
import { useParams } from 'react-router-dom'
import  { data, getPayment } from '../store/store'

import { gql } from '@apollo/client';
import { client } from '../api/graph';

import { CommonSearchBar } from '../components/searchBar';

const paymentsQuery = `
    query {    
        paymentEntities {
            id
            _transactionId
            _amountInUSD 
            vendorEntity {
              id
              name
              _vendorId
            }
            _fiatSymbol
            _fiatAmount
            _timestamp
            buyer {
                address
            }
            swap{
              id
            _tokenAmount
            _amountInUSD
            _tokenSymbol
            _transactionId
            amountOut
            }
          }
    }`


class Payments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            payments: []
        };
    }

    componentDidMount() {
        client.query({  
            query: gql(paymentsQuery)
        })
        .then(data => { 
            console.log("Subgraph data: ", data) 
            // alert(Object.keys(vendors).join(","))
            this.setState({      
                payments: data.data.paymentEntities 
            });
            //alert(vendors)
        })
        .catch(err => { console.log("Error fetching data: ", err) });
    }
    
    render () {
        return (
            <div class="h-full">
                <CommonSearchBar/>
                <Container title={"Payments"}>
                    {this.state.payments.map(pmt => 
                        <Link to={`/payments/${pmt.tx}`}>
                            <div class="border-b-2 border-gray-100 py-2 text-sm">
                                <p>
                                    <Field name={"Merchant: "} value={pmt.vendorEntity._vendorId}/>
                                </p>
                                <p>
                                    <Field name={"Buyer: "} value={pmt.buyer.address}/>
                                </p>
                                <p>
                                    <Field name={"Tx: "} value={pmt.id}/>
                                </p>
                                <p>
                                    <Field name={"Fiat: "} value={`${pmt._fiatSymbol} ${pmt._fiatAmount}`}/>
                                    <Field name={"Crypto: "} value={`${pmt.swap._tokenSymbol} ${pmt.swap._tokenAmount}`}/>
                                </p>
                            </div>
                        </Link>
                    )}
                </Container>
                
                
            </div>
        );
    }
}

function Payment (props) {

    let { id } = useParams();

    const [payment, setPayment] = useState({
        vendorEntity: {},
        buyer: {},
        swap: {}
    })

    useEffect(() => {

        client.query({  
            query: gql(paymentsQuery)
        })
        .then(data => { 
            console.log("Subgraph data: ", data) 
            // alert(Object.keys(vendors).join(","))
            let pmt = data.data.paymentEntities.find(p => p.id === id)
            setPayment(pmt)
  
            // alert(pmt.vendorEntity.name)
        })
        .catch(err => { console.log("Error fetching data: ", err) });

    })

    return (
        <div class="">
            <CommonSearchBar/>
            <Container title="Payment">
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Tx: "} value={payment.id}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Merchant: "} value={payment.vendorEntity.name}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Buyer: "} value={payment.buyer.address}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Fiat: "} value={`${payment._fiatSymbol} ${payment._fiatAmount}`}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Crypto: "} value={`${payment.swap._tokenAmount} ${payment.swap._tokenSymbol}`}/>
                    </p>
                </ContainerSection>
            </Container>
        </div>
    );
}

export { Payments, Payment } 