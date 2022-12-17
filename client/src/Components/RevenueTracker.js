import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import React from 'react';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartProps } from 'react-chartjs-2';


const AgentPerfromanceChart = (props) => {
    const { collectors, collectorNumber, payees, payeeCount, apt, aptCount, aptAmount, apm, apmCount, apmAmount, apy, apyCount, apyAmount } = props;
    console.log(payees)

    const [labels, setLabels] = useState([]);
    const [datas, setDatas] = useState([]);

    const labeler = () =>{
        let labels = collectors.map(collector => collector.full_name)
        console.log(labels);
        setLabels(labels)

    }



    const counter = () =>{

    }
    
    
    
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
            label: 'Revenue Per Month',
            data: [3,1,2,3,2,1,4,3],
            backgroundColor:'rgba(255, 99, 132, 0.2)',
              borderColor:'rgba(255, 99, 132, 1)',
                
            borderWidth: 1,
            },
        ]

    }


    useEffect(()=>{
        labeler()
    },[])



    return (
        <Line data={data} 
        options={{
            responsive : true
        }}/>
    )

}

export default AgentPerfromanceChart
