import { darkScrollbar } from '@mui/material';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import React from 'react';
import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
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
        labels: ['Nana Kwame Akwasi-Kumah', 'Joel Mensah', 'Dorcas Darko', 'Gerald Tsebewu', 'Henry Turkson', 'Gary Al Smith', 'Jesse Jay', 'Jay Cole'],
        datasets: [
            {
            label: 'Payee per Agent',
            data: [3,1,2,3,2,1,4,3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 159, 164, 0.2)',
                'rgba(155, 59, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 164, 0.2)',
                'rgba(155, 59, 64, 0.2)'
              ],
            borderWidth: 1,
            },
        ]

    }


    useEffect(()=>{
        labeler()
    },[])



    return (
        <Pie data={data} 
        options={{
            responsive : true,
            plugins:{
                legend:{
                    display: true,
                    position: 'left'
                },
                title: {
                    display: true,
                    text: 'Tax-Payers Per Agent',
                    position:'top'
                }
            }
        }}/>
    )

}

export default AgentPerfromanceChart
