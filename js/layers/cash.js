export default createLayer({
    name: "Cash",
    row: 2,
    branches: ["thelowergap"],
    startData() { return {
        unlocked: true,
        points: new OmegaNum(0)
    }},
    color: "rgb(0, 50, 0)",
    style: {
        color: "white",
    },
    buttonStyle: {
        color: "#ffffff",
        "background-color": "rgb(0, 50, 0)",
    },
    componentStyles: {
        "main-display-value": {
            color: "lime"
        }
    },
    type: "none",
    resource: "Cash",
    image: "https://static.wikia.nocookie.net/jtohs-joke-towers/images/6/66/Cash.png",
    tabFormat: [
        "main-display",
        "blank",
        "upgrades"
    ],
    update(diff) {
        if (hasUpgrade("cash", 101))
            player.cash.points = player.cash.points.add(getBoost("Cash", diff))

        addCurrencyToHeader("Cash", () => player.cash.points, $ONE, "lime")
    }
})
.addUpgrade({
    description: "Start producing Cash",
    cost: 100000,
    currency: "points"
})
.register()