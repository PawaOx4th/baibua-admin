import axios from "axios";

// จำนวนผู้ใช้ในระะบบทั้งหมด
export async function fetchUserRegister() {
  const url =
    "https://us-central1-newagent-47c20.cloudfunctions.net/api/dashboard/user";
  let result = await axios.get(url);

  return result;
}

// จำนวนนักศึกษาทั้งหมด
export async function fetchStudent() {
  const url =
    "https://us-central1-newagent-47c20.cloudfunctions.net/api/dashboard/student";
  let result = await axios.get(url);
  return result;
}

// จำนวนข่าว กิจกรรมทั้งหมด
export async function fetchNews() {
  const url =
    "https://us-central1-newagent-47c20.cloudfunctions.net/api/dashboard/news";
  let result = await axios.get(url);
  return result;
}

// จำนวนกลุ่มเรียน
export async function fectGroupStudy() {
  const url =
    "https://us-central1-newagent-47c20.cloudfunctions.net/api/dashboard/sec";
  let result = await axios.get(url);
  return result;
}

// จำนวนกลุ่มเรียน ในแอปพลิเคชัน
export async function fectGroupStudyInApp() {
  const url =
    "https://us-central1-newagent-47c20.cloudfunctions.net/api/dashboard/group";
  let result = await axios.get(url);
  return result;
}

// จำนวนอาจารย์์
export async function fectTeacher() {
  const url =
    "https://us-central1-newagent-47c20.cloudfunctions.net/api/dashboard/teacher";
  let result = await axios.get(url);
  return result;
}

// จำนวนวิชาเรียน
export async function fectSubject() {
  const url =
    "https://us-central1-newagent-47c20.cloudfunctions.net/api/dashboard/subject";
  let result = await axios.get(url);
  return result;
}

// จำนวนงาน
export async function fectWork() {
  const url =
    "https://us-central1-newagent-47c20.cloudfunctions.net/api/dashboard/work";
  let result = await axios.get(url);
  return result;
}
