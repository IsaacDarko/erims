import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import React from 'react';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
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
        labels:  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
            label: 'Tax Payer Increase (Monthly)',
            data: [3,1,2,3,2,1,4,3,3,2,1,4],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 159, 164, 0.2)',
                'rgba(155, 59, 64, 0.2)',
                'rgba(154, 102, 205, 0.2)',
                'rgba(55, 226, 186, 0.2)',
                'rgba(175, 120, 102, 0.2)',
                'rgba(153, 112, 255, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 164, 0.2)',
                'rgba(155, 59, 64, 0.2)',
                'rgba(154, 102, 205, 0.2)',
                'rgba(55, 226, 186, 0.2)',
                'rgba(175, 120, 102, 0.2)',
                'rgba(153, 112, 255, 0.2)'
              ],
            borderWidth: 1,
            },
        ]

    }


    useEffect(()=>{
        labeler()
    },[])



    return (
        <Bar data={data} 
        options={{
            responsive : true
        }}/>
    )

}

export default AgentPerfromanceChart
