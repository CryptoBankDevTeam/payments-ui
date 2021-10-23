import React, { useEffect, useState } from 'react'
import { Container, ContainerSection, Field, FieldAsColumn } from '../components/container'
import { useParams } from 'react-router-dom'
import  { data, getPayment } from '../store/store'

class Payments extends React.Component {

    render () {
        return (
            <div class="">
                <h1>Payments</h1>
            </div>
        );
    }
}

function Payment () {

    let { id } = useParams();

    const [payment, setPayment] = useState({})

    useEffect(() => {
        setPayment(getPayment(id))
    })

    return (
        <div class="">
            <Container title="Payment">
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

export { Payments, Payment } 