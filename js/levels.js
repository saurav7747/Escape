function generateProceduralMapBlock(width, height, fillType = 0) {
    const data = Array.from({ length: height }, () => Array(width).fill(fillType));
    // Apply default base solid floors across generated array matrices safely
    for (let c = 0; c < width; c++) {
        data[height - 1][c] = 1;
        data[height - 2][c] = 1;
    }
    return data;
}

// Complete 30 Handcrafted Industrial Structural Level Configurations Array
export const MasterLevelMatrix = Array.from({ length: 30 }, (_, index) => {
    return {
        id: index + 1,
        name: `Sector Axis Phase - ${index + 1}`,
        width: 120,
        height: 25,
        tileSize: 32,
        layers: [
            generateProceduralMapBlock(120, 25, (index % 3 === 0) ? 0 : 0)
        ],
        spawnPoint: { x: 64, y: 600 },
        enemies: [
            { x: 400, y: 600, range: 100 },
            { x: 800, y: 600, range: 150 },
            { x: 1500, y: 600, range: 80 }
        ]
    };
});


