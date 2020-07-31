const openDb = idb.open('saved-team', 1, upgDb => {
    upgDb.createObjectStore("teams", {keyPath: "id"}).createIndex("id_team", "id_team", {unique:true});
});

function saveToDb(team) {
    openDb.then(db=> {
        const trx = db.transaction("teams","readwrite");
        trx.objectStore("teams").put(team)
        return trx.complete;
    }).then(()=> {
        M.toast({html: `${team.shortName} saved`})
    });
}

function getTeam(id) {
    return new Promise(r=>{
        openDb.then(db=> db.transaction("teams", "readonly").objectStore("teams").get(parseInt(id)))
            .then(team=>{
                r(team)
            });
    });
}

function getTeams() {
    return new Promise(r=>{
        openDb.then(db=> db.transaction("teams", "readonly").objectStore("teams").getAll())
            .then(teams => {
                r(teams)
            })
    })
}

function deleteTeam(team) {
    openDb.then(db=>{
        const trx = db.transaction("teams", "readwrite");
        trx.objectStore("teams").delete(team.id);
        return trx.complete;
    }).then(() => {
        M.toast({html: `${team.shortName} deleted`})
    })
}