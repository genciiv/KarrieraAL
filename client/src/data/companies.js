// Seed fiktiv për kompanitë (+ 2-3 punë të hapura për secilën)
export const INDUSTRIES = [
  "Software",
  "IT Services",
  "HR & Rekrutim",
  "Green Tech",
  "EduTech",
  "Finance",
];

export const CITIES = ["Tiranë", "Durrës", "Fier", "Shkodër", "Elbasan"];

export const COMPANIES = [
  {
    id: "c1",
    name: "TechVision",
    city: "Tiranë",
    industry: "Software",
    size: "50-100",
    about:
      "Projekte web dhe mobile për tregun vendas e ndërkombëtar.",
    openJobs: [
      { id: "j101", title: "Zhvillues React", link: "/punet/101" },
      { id: "j102", title: "QA Engineer", link: "/punet/102" },
      { id: "j103", title: "Node.js Developer", link: "/punet/103" },
    ],
  },
  {
    id: "c2",
    name: "AlbaniaSoft",
    city: "Durrës",
    industry: "IT Services",
    size: "20-50",
    about: "Implementime ERP/CRM dhe konsulencë IT.",
    openJobs: [{ id: "j104", title: "DevOps Junior", link: "/punet/104" }],
  },
  {
    id: "c3",
    name: "HR Group",
    city: "Fier",
    industry: "HR & Rekrutim",
    size: "10-20",
    about: "Rekrutim dhe trajnim për kompani teknologjike.",
    openJobs: [], // asnjë pozicion i hapur
  },
  {
    id: "c4",
    name: "GreenIT",
    city: "Shkodër",
    industry: "Green Tech",
    size: "5-10",
    about: "Zgjidhje IoT dhe energji të rinovueshme.",
    openJobs: [{ id: "j105", title: "Embedded Developer", link: "/punet/105" }],
  },
  {
    id: "c5",
    name: "LearnX",
    city: "Elbasan",
    industry: "EduTech",
    size: "10-30",
    about: "Platforma LMS dhe kurse teknike.",
    openJobs: [
      { id: "j106", title: "Frontend Trainer", link: "/punet/106" },
      { id: "j107", title: "Content Creator (Tech)", link: "/punet/107" },
    ],
  },
  {
    id: "c6",
    name: "FinCore",
    city: "Tiranë",
    industry: "Finance",
    size: "100-200",
    about: "Produkte fintech për pagesa dhe risk.",
    openJobs: [{ id: "j108", title: "Data Analyst", link: "/punet/108" }],
  },
];
