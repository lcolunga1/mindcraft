export function normalizeName(name = "") {
  return String(name)
    .trim()
    .replace(/^[*]+/, "")               // quita * al inicio
    .replace(/§[0-9A-FK-OR]/gi, "")     // quita colores por si acaso
    .replace(/\s+/g, "");
}

export function resolvePlayerEntity(bot, inputName) {
  const wanted = normalizeName(inputName);

  // 1) match directo (nombre real)
  const direct = bot.players[wanted]?.entity;
  if (direct) return direct;

  // 2) busca por normalización en las llaves reales
  for (const [key, p] of Object.entries(bot.players || {})) {
    if (!p?.entity) continue;
    if (normalizeName(key) === wanted) return p.entity;
  }

  return null;
}