addLayer("돈", {
    name: "돈", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "돈", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFF00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "원", // Name of prestige currency
    baseResource: "점수", // Name of resource prestige is based on
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
        {key: "m", description: "M: 돈 리셋하기 단축키", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        rows: 4,
        cols: 4,
        11: {
            title: "11번: 시작",
            description: "초당 1 점수를 휙득합니다.",
            cost: new Decimal(1),
            unlocked() { return hasAchievement("업", 11) },
        },
        12: {
            title: "12번: 증가",
            description: "현재 돈에 비례해 점수 휙득량이 증가합니다.",
            cost: new Decimal(1),           
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { return hasUpgrade("돈", 11) },
        }
    },

})

addLayer("업", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
    }},
    color: "#FFFFFF",                       // The color for this layer, which affects many elements.          // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).
    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
    achievements: {
        rows: 16,
        cols: 5,
        11: {
            name: "시작",
            done() { return player.돈.points.gt(0) },
            tooltip: "1원을 얻으세요. 보상: 돈 업그레이드 11 해제",
        },
    },
    tabFormat: [
        "blank", 
        ["display-text", function() { return "업적: "+player.업.achievements.length+"/"+(Object.keys(tmp.업.achievements).length-2) }], 
        "blank", "blank",
        "achievements",
    ],
})