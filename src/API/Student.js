import axios from "axios";

export async function fecthStudents() {
  let result = await axios.get(
    "https://us-central1-newagent-47c20.cloudfunctions.net/api/student"
  );

  console.dir(result.data);

  return result;
}
