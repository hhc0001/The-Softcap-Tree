addLayer("P", {
    name: "声望", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#CCFCCF",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "声望点数", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P：重置获得声望点数", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "PU11",
            description: "点数获取 *2",
            cost: new Decimal(1),
            effect() {
                return 2
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        12: {
            title: "PU12",
            description: "点数加成点数",
            cost: new Decimal(3),
            unlocked() {
                return hasUpgrade(this.layer, 11)
            },
            effect() {
                let mult = player.points.add(2).log(2)
                if(mult.gte(PU12SC1())) mult = PU12SC1Effect(mult)
                return mult
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        13: {
            title: "PU13",
            description: "PSC1 的开始基于声望点数延后",
            cost: new Decimal(10),
            unlocked() {
                return hasUpgrade(this.layer, 12)
            },
            effect() {
                let mult = player[this.layer].points.add(1).pow(0.75)
                if(mult.gte(PU13SC1())) mult = PU13SC1Effect(mult)
                return mult
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        21: {
            title: "PU21",
            description: "P 增幅 p",
            cost: new Decimal(20),
            unlocked() {
                return hasUpgrade(this.layer, 13)
            },
            effect() {}
        },
    },
    layerShown(){return true}
})
