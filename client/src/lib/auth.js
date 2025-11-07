export async function apiLogin({ email, password }) {
  await sleep(500);
  if (!email?.includes("@") || password?.length < 4) throw new Error("Kredenciale të pavlefshme");
  // demo: gjithmonë kthen user
  return { id: "u1", name: email.split("@")[0], email, onboarded: false };
}

export async function apiRegister({ name, email, password }) {
  await sleep(600);
  if (!name || name.length < 2) throw new Error("Emri shumë i shkurtër");
  if (!email?.includes("@")) throw new Error("Email i pavlefshëm");
  if (password?.length < 6) throw new Error("Fjalëkalimi ≥ 6 shenja");
  return { id: crypto.randomUUID(), name, email, onboarded: false };
}

export async function apiCompleteOnboarding(data){
  await sleep(600);
  // thjesht kthejmë ç’u dërgua
  return { ok: true, profile: data };
}

function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }
