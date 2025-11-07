// Mock API — zëvendëso me thirrje reale më vonë
export async function getFeedPosts() {
  await wait(600);
  return [
    { id: "p1", name: "Arlind H.", title: "Front-end Dev", time: "2h",
      text: "Po ndaj një listë resources për React në shqip.", likes: 12, comments: 3 },
    { id: "p2", name: "Elira M.", title: "HR @ TiranaTech", time: "5h",
      text: "Kemi hapur praktikë 3-mujore për QA. Aplikoni!", likes: 25, comments: 7 },
  ];
}

export async function createPost(payload) {
  await wait(500);
  return { ok: true, id: crypto.randomUUID(), ...payload };
}

export async function searchJobs(query = {}) {
  await wait(700);
  // kthen disa rezultate demo sipas fushave kryesore
  const all = [
    { id: "j1", title: "Full-Stack (MERN)", company: "TechAL", city: "Tiranë", remote: true, salary: "1,200–1,600€", deadline: "30 Dhj" },
    { id: "j2", title: "Data Analyst (Junior)", company: "DataFier", city: "Fier", remote: false, salary: "900–1,200€", deadline: "20 Dhj" },
    { id: "j3", title: "UI/UX Designer", company: "Studio Durrës", city: "Durrës", remote: false, salary: "1,000–1,300€", deadline: "15 Dhj" },
  ];
  // filtrime të lehta demo:
  return all.filter(j => {
    if (query.city && j.city !== query.city) return false;
    if (query.remote !== undefined && query.remote !== "" && String(j.remote) !== String(query.remote)) return false;
    if (query.q && !`${j.title} ${j.company}`.toLowerCase().includes(query.q.toLowerCase())) return false;
    return true;
  });
}

function wait(ms){ return new Promise(r=>setTimeout(r, ms)); }
