import axios from "axios";

export async function fetchUserStudent() {
  let result = await axios.get(
    "https://us-central1-newagent-47c20.cloudfunctions.net/api/user"
  );

  return result;
}

export async function EditeUserLevel(id, newLavel) {
  let result = await axios.put(
    `https://us-central1-newagent-47c20.cloudfunctions.net/api/user/updateLv/${id}`,
    newLavel
  );

  return result;
}
