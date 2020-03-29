import axios from "axios";
// import { functions } from "firebase";

export async function fecthStudents() {
  let result = await axios.get(
    "https://us-central1-newagent-47c20.cloudfunctions.net/api/student"
  );

  console.dir(result.data);

  return result;
}

/*
 * Function Modify Student Data
 */
export async function modifyStudent(id, data) {
  let result = await axios.put(
    `https://us-central1-newagent-47c20.cloudfunctions.net/api/student/updateDt/${id}`,
    data
  );

  return result;
}
