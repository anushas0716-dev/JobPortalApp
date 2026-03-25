export const RECOMMENDED = [
  { id:1, icon:"🍎", bg:"#1a2a4a", company:"Apple",     title:"Senior Frontend Engineer", location:"Bengaluru, IN", salary:"₹32–40 LPA", type:"Full-time · Remote",  match:96 },
  { id:2, icon:"G",  bg:"#2a1a1a", company:"Google",    title:"Software Engineer II",     location:"Hyderabad, IN", salary:"₹40–55 LPA", type:"Full-time · Hybrid",  match:91 },
  { id:3, icon:"Ⓜ",  bg:"#1a1a2e", company:"Microsoft", title:"Full Stack Developer",     location:"Pune, IN",      salary:"₹28–36 LPA", type:"Full-time · On-site", match:87 },
  { id:4, icon:"⚡", bg:"#2a1a2a", company:"Razorpay",  title:"React Engineer",           location:"Bengaluru, IN", salary:"₹22–30 LPA", type:"Full-time · Remote",  match:83 },
  { id:5, icon:"🛒", bg:"#1a2a1a", company:"Flipkart",  title:"UI Engineer",              location:"Bengaluru, IN", salary:"₹20–28 LPA", type:"Full-time · Hybrid",  match:79 },
];

export const SAVED = [
  { id:1, icon:"🚀", bg:"#2a201a", company:"Zepto",      title:"Tech Lead – Node.js",   salary:"₹30–42 LPA", deadline:"3 days" },
  { id:2, icon:"💳", bg:"#1a2a22", company:"CRED",       title:"Full Stack Engineer",   salary:"₹25–35 LPA", deadline:"6 days" },
  { id:3, icon:"🧩", bg:"#1e1a2a", company:"Infosys",    title:"Platform Engineer",     salary:"₹18–24 LPA", deadline:"12 days" },
  { id:4, icon:"🌊", bg:"#1a1e2a", company:"Freshworks", title:"Product Engineer",      salary:"₹22–32 LPA", deadline:"15 days" },
];

export const RECENT = [
  { id:1, icon:"🧩", bg:"#1e1a2a", company:"Infosys",    title:"Platform Engineer",    salary:"₹18–24 LPA", time:"1h ago" },
  { id:2, icon:"🚀", bg:"#2a201a", company:"Zepto",      title:"Tech Lead – Node.js",  salary:"₹30–42 LPA", time:"3h ago" },
  { id:3, icon:"💳", bg:"#1a2a22", company:"CRED",       title:"Full Stack Engineer",  salary:"₹25–35 LPA", time:"Yesterday" },
  { id:4, icon:"🌊", bg:"#1a1e2a", company:"Freshworks", title:"Product Engineer",     salary:"₹22–32 LPA", time:"2 days ago" },
];

export const APPLICATIONS = [
  { id:1, icon:"🍎", bg:"#1a2a4a", company:"Apple",    title:"Senior Frontend Eng.", status:"Interview",    statusClass:"interview" },
  { id:2, icon:"G",  bg:"#2a1a1a", company:"Google",   title:"Software Engineer II", status:"Shortlisted",  statusClass:"shortlisted" },
  { id:3, icon:"⚡", bg:"#2a1a2a", company:"Razorpay", title:"React Developer",      status:"Under Review", statusClass:"review" },
  { id:4, icon:"🟢", bg:"#1a2a1a", company:"Swiggy",   title:"Backend Engineer",     status:"Applied",      statusClass:"applied" },
  { id:5, icon:"🛒", bg:"#1a2a1a", company:"Flipkart", title:"UI Engineer",          status:"Rejected",     statusClass:"rejected" },
];

export const NOTIFICATIONS = [
  { id:1, dot:"#ff6584", unread:true,  company:"Apple",    text:"has invited you for an interview — Senior Frontend Engineer.", time:"10 min ago" },
  { id:2, dot:"#43e97b", unread:true,  company:"Google",   text:"shortlisted your application for Software Engineer II.",       time:"2 hrs ago" },
  { id:3, dot:"#6c63ff", unread:false, company:"JobSphere",text:"5 new jobs match your skills — React, Node.js.",               time:"Yesterday" },
  { id:4, dot:"#f7971e", unread:false, company:"Recruiter",text:"Your profile was viewed by 3 recruiters this week.",           time:"2 days ago" },
];

export const BAR_DATA = [
  { label:"Applied",   value:10, color:"#6c63ff" },
  { label:"Review",    value:6,  color:"#f7971e" },
  { label:"Listed",    value:5,  color:"#43e97b" },
  { label:"Interview", value:2,  color:"#ff6584" },
  { label:"Offered",   value:1,  color:"#43e97b" },
  { label:"Rejected",  value:4,  color:"#3a3d4d" },
];

export const NAV_SECTIONS = [
  {
    title: "Main",
    items: [
      { icon:"⊞", label:"Dashboard",    badge:null },
      { icon:"🔍", label:"Find Jobs",    badge:null },
      { icon:"🔖", label:"Saved Jobs",   badge:4    },
      { icon:"📋", label:"Applications", badge:null },
    ],
  },
  {
    title: "Career",
    items: [
      { icon:"👤", label:"My Profile", badge:null },
      { icon:"📄", label:"Resumes",    badge:null },
      { icon:"💬", label:"Messages",   badge:2    },
      { icon:"📅", label:"Interviews", badge:null },
    ],
  },
  {
    title: "System",
    items: [
      { icon:"🔔", label:"Notifications", badge:null },
      { icon:"⚙️", label:"Settings",      badge:null },
    ],
  },
];
