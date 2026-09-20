const pokemons = [
    {
        id: 25,
        name: "pikachu",
        height: 4,
        weight: 60,

        types: [
            {
                slot: 1,
                type: {
                    name: "electric"
                }
            }
        ],

        sprites: {
            front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        }
    },

    {
        id: 6,
        name: "charizard",
        height: 17,
        weight: 905,

        types: [
            {
                slot: 1,
                type: {
                    name: "fire"
                }
            },
            {
                slot: 2,
                type: {
                    name: "flying"
                }
            }
        ],

        sprites: {
            front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
        }
    },

    {
        id: 94,
        name: "gengar",
        height: 15,
        weight: 405,

        types: [
            {
                slot: 1,
                type: {
                    name: "ghost"
                }
            },
            {
                slot: 2,
                type: {
                    name: "poison"
                }
            }
        ],

        sprites: {
            front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
        }
    }
];
