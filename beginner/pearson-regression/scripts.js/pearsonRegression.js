function calculateCorrelation(sample) {
    const xValues = [];
    const yValues = [];
    for (const element of sample) {
        xValues.push(element.x);
        yValues.push(element.y);
    }

    const sum = (accumulator, currentValue) => accumulator + currentValue;
    const sumX = xValues.reduce(sum);
    const sumY = yValues.reduce(sum);

    const mX = sumX / xValues.length;
    const mY = sumY / yValues.length;

    const xDeviation = [];
    const yDeviation = [];
    for (let i = 0; i < xValues.length; i++) {
        xDeviation.push(xValues[i] - mX);
        yDeviation.push(yValues[i] - mY);
    }

    const xDeviationSquare = [];
    const yDeviationSquare = [];
    for (let i = 0; i < xDeviation.length; i++) {
        xDeviationSquare.push(Math.pow(xDeviation[i], 2));
        yDeviationSquare.push(Math.pow(yDeviation[i], 2));
    }

    const xDeviationSum = xDeviationSquare.reduce(sum);
    const yDeviationSum = yDeviationSquare.reduce(sum);

    const combineXY = [];
    for (let i = 0; i < xDeviation.length; i++) {
        combineXY.push(xDeviation[i] * yDeviation[i]);
    }
    const r = combineXY.reduce(sum) / Math.sqrt(xDeviationSum * yDeviationSum);
    
    let interpretation;
    if(r > 0.7 || r < -0.7)      interpretation = 'Some correlation';
    else if(r > 0.3 || r < -0.3) interpretation = 'Neutral';
    else                         interpretation = 'No correlation';

    return { 
        r: interpretation, 
        mean: { x: mX, y: mY },
        deviation: { x: xDeviationSum, y: yDeviationSum }
    };
}

function calculateRegression(data, minX, maxX) {
    const b = data.deviation.y / data.deviation.x;
    const a = data.mean.y - (b * data.mean.x);

    const minY = a + (b * minX);
    const maxY = a + (b * maxX);

    return [
        { x: minX, y: minY },
        { x: maxX, y: maxY }
    ]
}