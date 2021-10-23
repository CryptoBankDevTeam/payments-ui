import React from 'react'

function ContainerTitle (props) {
    return (
        <h2 class="border-b-2 border-gray-100 pb-2 font-semibold text-xl">{props.title}</h2>
    );
}

function Container (props) {

    return (
        <div class="rounded-md bg-white m-4 p-4 shadow-md overflow-auto">
            <ContainerTitle title={props.title}/>
            {props.children}
        </div>  
    );
}

function Field (props) {
    return (
        <span class="pr-2">
            <span class="text-blue-500">
                {props.name}
            </span>
            <span>
                {props.value}
            </span>
        </span>
    );
}

function FieldAsColumn (props) {
    return (
        <span class="flex flex-col pr-2">
            <span class="text-blue-500">
                {props.name}
            </span>
            <span>
                {props.value}
            </span>
        </span>
    );
}

function ContainerSection (props) {
    return (
        <div class="border-b-2 border-gray-100 py-2 text-sm">
            {props.children}
        </div>
    );
}

export { Container, ContainerSection, Field, FieldAsColumn }