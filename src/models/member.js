class Members {
#team_id;
#user_id;

constructor(team_id, user_id) {
this.team_id = team_id;
this.user_id = user_id;
}

// Getter para team_id
getTeam_id() {
return this.#team_id;
}

// Setter para team_id
setTeam_id(nuevoTeam_id) {
this.#team_id = nuevoTeam_id;
}

// Getter para user_id
getUser_id() {
return this.#user_id;
}

// Setter para user_id
setUser_id(nuevoUser_id) {
this.#user_id = nuevoUser_id;
}

}