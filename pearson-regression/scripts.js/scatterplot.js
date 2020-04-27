function scatterplot(bubbleData, lineData) {    
    let data = {
        label: 'Height',
        datasets: [{
            data: bubbleData
        }, {
            data: lineData,
            type: 'line',
            fill: false
        }]
    }

    let options = {
        title: {
            display: true,
            text: 'Pearson Regression'
        },
        legend: false,
        tooltips: false
    }

    let chart = new Chart('scatterplot', {
        type: 'bubble',
        data: data,
        options: options
    })
}