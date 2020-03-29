import axios from "axios";
// import { functions } from "firebase";

export function fetchUserStudent() {
  let result = axios.get(
    "https://us-central1-newagent-47c20.cloudfunctions.net/api/user"
  );

  return result;
}

export function EditeUserLevel(id, newLavel) {
  let result = axios.put(
    `https://us-central1-newagent-47c20.cloudfunctions.net/api/user/updateLv/${id}`,
    newLavel
  );
  // console.log(newLavel.data);

  return result;
}
