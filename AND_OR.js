var synaptic = require('synaptic'); // this line is not needed in the browser

var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;

// criando as camadas de neurônios
var inputLayer = new Layer(2);
var hiddenLayer = new Layer(2);
var outputLayer = new Layer(2);

// criando as camadas de pessoas (ALL_TO_ALL)
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

hiddenLayer.set({
	squash: Neuron.squash.TANH,
	bias: 0
});

var perceptron = new Network({
	input: inputLayer,
	hidden: [hiddenLayer],
	output: outputLayer
});

var trainer = new Trainer(perceptron);

// dados de treinamento
var trainingSet = [
  {
    input: [0,0],
    output: [0, 0]
  },
  {
    input: [0,1],
    output: [0, 1]
  },
  {
    input: [1,0],
    output: [0, 1]
  },
  {
    input: [1,1],
    output: [1, 1]
  },
];

// treina a rede usando os parâmetros
trainer.train(trainingSet, {
  rate: .1, // taxa de aprendizado
	iterations: 0, // número máximo de iterações
	error: .0001, // erro mínimo
	shuffle: true,
	log: 100
});

// ativa a rede
console.log("0 && 0 == ", perceptron.activate([0, 0]));
console.log("0 && 1 == ", perceptron.activate([0, 1]));
console.log("1 && 0 == ", perceptron.activate([1, 0]));
console.log("1 && 1 == ", perceptron.activate([1, 1]));
