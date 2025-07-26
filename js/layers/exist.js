export default createLayer({
    name: "Exist",
    startData() { return {
        unlocked: true
    }},
    color: "#ffffff",
    buttonStyle: {
        color: "black",
        "background-color": "#ffffff",
    },
    image: "https://static.wikia.nocookie.net/jtohs-joke-towers/images/e/e6/Exist_Difficulty_Squared.png",
    update() {

    }
})
.addUpgrade({
    description: "Going through the entire spectrum again... x2 Skill gain",
    cost: 250e12,
    currency: "points",
    effect: () => 2,
    effectOperation: 'mul',
    style: {
        color: "green"
    },
})
.addUpgrade({
    description: "x2 Cash gain",
    cost: 25e6,
    currency: "points",

    effect: () => 2,
    effectCurrency: "cash",
    effectOperation: 'mul',
    style: {
        color: "blue"
    },
})
.addUpgrade({
    description: "x3 Skill gain",
    cost: 750e12,
    currency: "points",

    effect: () => 3,
    effectOperation: 'mul',
    style: {
        color: "darkorange"
    },
})
.addUpgrade({
    description: "x3 Cash gain",
    cost: 75e6,
    currency: "Cash",

    effect: () => 3,
    effectCurrency: "cash",
    effectOperation: 'mul',
    style: {
        color: "red"
    },
})
.addUpgrade({
    description: "Did you enjoy the raw stat boosts? x4 Skill and Cash gain",
    cost: 3e15,
    currency: "points",

    effects: [
        {
            effect: () => 4,
            effectOperation: 'mul'
        },
        {
            effect: () => 4,
            effectOperation: 'mul',
            effectCurrency: 'Cash'
        }
    ],
    style: {
        color: "magenta"
    },
})
.addUpgrade({
    description: "You get used to automation. Automate key features.",
    cost: 1e20,
    currency: "points",
    effect: () => 1.25,
    effectCurrency: 'tickspeed',
    effectOperation: 'mul',
})
.addUpgrade({
    description: "Unlock new mechanics and boosts.",
    cost: 5e22,
    currency: "points",
    effect: () => 3,
    effectOperation: 'mul',
})
.addUpgrade({
    description: "Major progression unlock.",
    cost: 1e25,
    currency: "points",
    effect: () => 5,
    effectOperation: 'mul',
})
.addUpgrade({
    description: "Approach the extension layer.",
    cost: 1e30,
    currency: "points",
    effect: () => 10,
    effectOperation: 'mul',
})
.register()