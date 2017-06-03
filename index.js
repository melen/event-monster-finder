

module.exports = function FindEventMobs(dispatch) {
    let long = require("long");
    let userId;
    let translate = require('./lib/translate/lib/translate');

    let monsterNames = {
        blueBox: '이벤트 보물상자'
    };

    dispatch.hook('S_LOGIN', 1, event => {
        userId = event.playerId;
        console.log("Login");
    });

    dispatch.hook('S_SPAWN_NPC', 3, event => {
        if (event.npcName == monsterNames.blueBox) {
            console.log(spawnId);
            dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 1, {
                unk1: 42,
                unk2: 0,
                unk3: 27,
                message: "Blue Box Found"
            });

            itemID = event.id.toInt();
            dispatch.toClient('S_SPAWN_DROPITEM', 1, {
                id: itemID,
                x: event.x,
                y: event.y,
                z: event.z,
                item: 98261,
                amount: 1,
                expiry: 999999,
                owners: [{id: userId}]
            });
        }
    });

    dispatch.hook('S_DESPAWN_NPC', 1, event => {
        spawnId = event.target.toString();
        itemID = event.target.toInt();
        if (spawnId > '4925812090000000') {
            dispatch.toClient('S_DESPAWN_DROPITEM', 1, {
                id: itemID
            });
        }
    });
};