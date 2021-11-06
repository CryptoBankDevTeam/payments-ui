import React from 'react'
import { data } from '../store/store'
import { Link } from 'react-router-dom'

import { gql } from '@apollo/client';
import { client } from '../api/graph';

import { Container, ContainerSection, Field, FieldAsColumn } from '../components/container';
import { SearchBar } from '../components/searchBar';

// import Web3 from 'web3'
// const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

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
            buyer
            swap{
              id
            _tokenAmount
            _amountInUSD
            _tokenSymbol
            _transactionId
            amountOut
            }
          }

        vendorEntities{
            id
            _vendorId
            name
        }

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

function fromWei(amt) {
    return Number(amt)*1e-18
}

function TopBar(props) {

    return (
        <div class="px-4 pt-4 pb-8 bg-gray-900 text-white">
            <h2 class="font-light mb-2">Payment Contract transactions</h2>
            <SearchBar/>
        </div>
    );
}

function StatBar(props) {
    return (
        <div>
            <Container>
                <div class="grid gap-4 grid-cols-2">
                    <div>
                        <h2 class="font-light text-gray-400 text-center text-sm">MERCHANTS</h2>
                        <p class="font-light mb-2 text-center text-xl">{props.NumberOfVendors}</p>
                    </div>

                    <div>
                        <h2 class="font-light text-gray-400 text-center text-sm">BUYERS</h2>
                        <h2 class="font-light mb-2 text-center text-xl">{props.NumberOfBuyers}</h2>
                    </div>

                    <div>
                        <h2 class="font-light text-gray-400 text-center text-sm">PAYMENTS</h2>
                        <h2 class="font-light mb-2 text-center text-xl">{props.NumberOfPayments}</h2>
                    </div>
                    <div>
                        <h2 class="font-light text-gray-400 text-center text-sm">VALUE</h2>
                        <h2 class="font-light mb-2 text-center text-xl">{fromWei(props.ValueOfPayments).toFixed(2) +" USD"}</h2>
                    </div>
                </div>
                
            </Container>
        </div>
    );
}

class PaymentsHome extends React.Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props)
        this.when = this.when.bind(this)
        this.state = {
            payments: [],
            vendors: [],
            buyers: [],
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
                payments: data.data.paymentEntities ,
                vendors: data.data.vendorEntities,
                buyers: data.data.buyerEntities
            });
            //alert(vendors)
        })
        .catch(err => { console.log("Error fetching data: ", err) });
    }

    when (txTime) {
        // alert(txTime)
        let timeInSeconds = Math.round((new Date()/1000 - txTime))
        let timeInMinutes = Math.round(timeInSeconds/60)
        let timeInHours = Math.round(timeInMinutes/60)

        if(timeInMinutes > 59) {
            return `${timeInHours} hour(s) ago`
        } else if(timeInSeconds > 59) {
            return `${timeInMinutes} min(s) ago`
        } else {
            return `${timeInSeconds} secs(s) ago`
        }

    }

    render () {
        return (
            <div class="h-auto">
                <StatBar 
                    NumberOfVendors={this.state.vendors.length}
                    NumberOfPayments={this.state.payments.length}
                    ValueOfPayments={this.state.payments.map(p => Number(p.swap._tokenAmount)).reduce((t, amt) => t + amt, 0)}
                    NumberOfBuyers={this.state.buyers.length}
                />
                <Container title={"Latest Payments"}>
                    {this.state.payments.map(pmt => 
                        <Link to={`/payments/${pmt.id}`}>
                            <div class="border-b-2 border-gray-100 py-2 text-sm">
                                <p>
                                    <Field name={"When: "} value={this.when(pmt._timestamp)}/>
                                    <Field name={"Merchant: "} value={pmt._vendorId}/>
                                </p>
                                <p>
                                    <Field name={"Tx: "} value={pmt.id}/>
                                </p>
                                <p>
                                    <Field name={"Fiat: "} value={`${pmt._fiatSymbol} ${pmt._fiatAmount}`}/>
                                    <Field name={"Stable Coin: "} value={`$ ${fromWei(pmt.swap._tokenAmount).toFixed(2)}`}/>
                                    {/* <Field name={"Crypto: "} value={`${pmt.swap._tokenSymbol} ${fromWei(pmt.swap._tokenAmount).toFixed(2)}`}/> */}
                                </p>
                            </div>
                        </Link>
                    )}
                </Container>
                
            </div>  
        );
    }
}

class Home extends React.Component {

    render () {
        return (
            <div class="h-full">
                <TopBar/>
                <PaymentsHome payments={data.payments}/>
            </div>
        );
    }
}

export { Home }