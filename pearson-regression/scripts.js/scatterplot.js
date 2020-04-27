function scatterplot(sample) {    
    let data = {
        label: 'Height',
        datasets: [{
            data: sample
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