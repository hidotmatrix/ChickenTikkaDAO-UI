import React from 'react'
import Card from './Card';

export default function CardList(props) {
    const {proposalDataArray,provider} = props;
    console.log(proposalDataArray);
  return (
    <div>
        {proposalDataArray.map((data, index) => {
            console.log("data", data);
            return (
                <div key={index}>
                   <Card data={data} index={index} provider={provider}/>
                </div> 
            )
        })}
    </div>
  )
}
