const net = new brain.recurrent.LSTM();

net.trainAsync([
  'doe, a deer, a female deer',
  'ray, a drop of golden sun',
  'me, a name I call myself',
]).then((res) => {
    console.log(res)
}).catch(handleError);

const output = net.run('doe'); // ', a deer, a female deer'