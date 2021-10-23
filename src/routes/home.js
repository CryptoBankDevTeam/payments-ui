import React from 'react'
import { Field } from '../components/container'
import  { data } from '../store/store'
import { Link } from 'react-router-dom'

function SearchBar(props) {

    return (
        <div class="flex flex-row">
            <input 
                class="bg-white w-screen p-2 rounded-l-md"
                type="text"
                placeholder="Payments | Merchants | Buyers"
            ></input>
            <button class="bg-blue-500 text-sm font-light p-2 rounded-r-md">Search</button>
        </div>
    );
}


function TopBar(props) {

    return (
        <div class="px-4 pt-4 pb-8 bg-gray-900 text-white">
            <h2 class="font-light mb-2">Payment Contract transactions</h2>
            <SearchBar/>
        </div>
    );
}



class PaymentsHome extends React.Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props)
        this.when = this.when.bind(this)
    }

    when (txTime) {
        return `${Math.round((new Date() - txTime) / 1000)} sec(s) ago`
    }

    render () {
        return (
            <div class="h-screen rounded-md bg-white m-4 p-4 shadow-md overflow-auto">
                <h2 class="border-b-2 border-gray-100 pb-2 font-semibold text-xl">Latest Payments</h2>

                {this.props.payments.map(pmt => 
                    <Link to={`/payments/${pmt.tx}`}>
                        <div class="border-b-2 border-gray-100 py-2 text-sm">
                            <p>
                                <Field name={"When: "} value={this.when(pmt.when)}/>
                                <Field name={"Merchant: "} value={pmt.merchant}/>
                            </p>
                            <p>
                                <Field name={"Tx: "} value={pmt.tx}/>
                            </p>
                            <p>
                                <Field name={"Fiat: "} value={`${pmt.fiatSymbol} ${pmt.fiatAmount}`}/>
                                <Field name={"Crypto: "} value={`${pmt.swap.tokenAmount} ${pmt.swap.tokenSymbol}`}/>
                            </p>
                        </div>
                    </Link>
                )}
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