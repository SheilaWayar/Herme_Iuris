import { useState } from "react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1703128311299-eef2994e1b3b?w=1400&h=700&fit=crop&auto=format";

const CATEGORIES = [
  { name: "Civil", icon: "⚖️", color: "#6B1A2A" },
  { name: "Penal", icon: "🔒", color: "#7B1D2E" },
  { name: "Laboral", icon: "🤝", color: "#5A1725" },
  { name: "Comercial", icon: "💼", color: "#6B1A2A" },
  { name: "Familia", icon: "🏠", color: "#7B1D2E" },
  { name: "Constitucional", icon: "📜", color: "#5A1725" },
  { name: "Procesal", icon: "📋", color: "#6B1A2A" },
  { name: "Administrativo", icon: "🏛️", color: "#7B1D2E" },
  { name: "Tributario", icon: "💰", color: "#5A1725" },
  { name: "Consumidor", icon: "🛒", color: "#6B1A2A" },
  { name: "Ambiental", icon: "🌿", color: "#7B1D2E" },
  { name: "Informativo", icon: "📰", color: "#5A1725" },
];

const DICTIONARY_TERMS = [
  { term: "Acción", def: "Facultad de acudir ante un juez para reclamar un derecho." },
  { term: "Demanda", def: "Escrito mediante el cual se inicia un proceso judicial." },
  { term: "Sentencia", def: "Resolución final del juez que pone fin al proceso." },
  { term: "Apelación", def: "Recurso para impugnar una resolución ante un tribunal superior." },
  { term: "Fianza", def: "Garantía económica para asegurar el cumplimiento de una obligación." },
  { term: "Prescripción", def: "Extinción de un derecho por el transcurso del tiempo." },
];

const NEWS = [
  {
    id: 1,
    date: "3 sep 2026",
    category: "Laboral",
    title: "La Corte Suprema confirmó el derecho a la doble indemnización por despido sin causa",
    summary:
      "El máximo tribunal ratificó su postura respecto a situaciones de vulnerabilidad económica, ampliando la protección para trabajadores en relación de dependencia.",
    interpretation:
      "Este fallo sienta precedente para miles de causas pendientes. En términos prácticos, si fuiste despedido sin causa justificada durante períodos de crisis reconocidos por decreto, tenés derecho a reclamar el doble de lo establecido en la LCT.",
    comments: [
      { user: "María G.", text: "¿Esto aplica también a contratos part-time?" },
      { user: "Carlos P.", text: "Excelente explicación. En mi caso el despido fue en 2025, ¿entra?" },
    ],
  },
  {
    id: 2,
    date: "1 sep 2026",
    category: "Familia",
    title: "Nuevo criterio judicial sobre cuidado personal compartido en divorcios conflictivos",
    summary:
      "Cámaras civiles de CABA adoptaron un nuevo estándar que prioriza el vínculo afectivo sobre la conflictividad entre progenitores.",
    interpretation:
      "El cambio es sustancial: antes, el conflicto entre los padres era razón suficiente para denegar la tenencia compartida. Ahora los jueces deben evaluar si el conflicto afecta directamente al niño, y no solo a los adultos.",
    comments: [
      { user: "Ana R.", text: "¿Cómo se acredita que el conflicto no afecta al menor?" },
    ],
  },
];

const FORUM_THREADS = [
  { id: 1, title: "¿Qué hago si mi empleador no me registra en AFIP?", replies: 12, category: "Laboral", hot: true },
  { id: 2, title: "Vecino que hace ruidos molestos de noche — ¿qué ley aplica?", replies: 8, category: "Civil", hot: false },
  { id: 3, title: "Me devolvieron un producto en mal estado — ¿cuál es mi derecho?", replies: 21, category: "Consumidor", hot: true },
  { id: 4, title: "Diferencias entre denuncia penal y demanda civil", replies: 5, category: "Penal", hot: false },
];

const COURSES = [
  { title: "Introducción al Derecho para ciudadanos", duration: "4 hs", level: "Básico", modules: 6 },
  { title: "Tus derechos como consumidor", duration: "2 hs", level: "Básico", modules: 4 },
  { title: "Cómo leer una sentencia judicial", duration: "3 hs", level: "Intermedio", modules: 5 },
  { title: "Derecho Laboral: lo que todo trabajador debe saber", duration: "5 hs", level: "Intermedio", modules: 8 },
];

const JURISPRUDENCIA_NACIONAL = [
  { tribunal: "CSJN", fecha: "15/08/2026", caratula: "González c/ Estado Nacional", tema: "Empleo público" },
  { tribunal: "CSJN", fecha: "02/07/2026", caratula: "Pérez Hnos. S.A. c/ AFIP", tema: "Tributario" },
  { tribunal: "Cámara Civil", fecha: "20/06/2026", caratula: "M.L. c/ M.R. s/ tenencia", tema: "Familia" },
];

const JURISPRUDENCIA_PROVINCIAL = [
  { tribunal: "STJ Córdoba", fecha: "10/08/2026", caratula: "Acosta c/ Municipalidad de Río Cuarto", tema: "Administrativo" },
  { tribunal: "Cámara Laboral BA", fecha: "05/08/2026", caratula: "Rodríguez c/ Transporte XYZ", tema: "Laboral" },
  { tribunal: "STJ Mendoza", fecha: "28/07/2026", caratula: "Díaz c/ Banco Provincial", tema: "Consumidor" },
];

const GLOSARIO = [
  { term: "Acción", def: "Facultad de acudir ante un juez para reclamar un derecho." },
  { term: "Actor / Demandante", def: "Quien inicia un proceso judicial." },
  { term: "Demandado", def: "Persona contra quien se dirige la demanda." },
  { term: "Sentencia", def: "Resolución final del juez que concluye el proceso." },
  { term: "Apelación", def: "Recurso para impugnar ante tribunal superior." },
  { term: "Prescripción", def: "Pérdida de un derecho por el paso del tiempo sin ejercerlo." },
  { term: "Jurisdicción", def: "Poder del Estado de administrar justicia en un territorio." },
  { term: "Competencia", def: "Capacidad del juez para entender en determinada causa." },
  { term: "Medida cautelar", def: "Disposición preventiva del juez para asegurar el resultado del proceso." },
  { term: "Cosa juzgada", def: "Efecto de la sentencia firme que impide volver a juzgar el mismo asunto." },
];

type Section = "home" | "actualidad" | "foro" | "micuenta" | "cursos" | "terminologia" | "chatbot" | "jurisprudencia-nacional" | "jurisprudencia-provincial";

export default function App() {
  const [section, setSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchJuri, setSearchJuri] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hola, soy el asistente de Herme Iuris. Podés preguntarme sobre términos jurídicos, derechos básicos y cómo funciona el sistema judicial argentino." },
  ]);
  const [newThread, setNewThread] = useState(false);
  const [newsComment, setNewsComment] = useState<Record<number, string>>({});
  const [glossarySearch, setGlossarySearch] = useState("");

  const nav = (s: Section) => {
    setSection(s);
    setMenuOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) setLoggedIn(true);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    setTimeout(() => {
      const responses: Record<string, string> = {
        default:
          "Esta consulta puede requerir asesoramiento profesional. Te recomiendo contactar un abogado o visitar el Centro de Acceso a la Justicia más cercano.",
        prescripcion:
          "La prescripción es la pérdida del derecho a reclamar por el paso del tiempo. Varía según el tipo de acción: en materia civil suele ser de 2 a 5 años; en penal depende del delito.",
        demanda:
          "Una demanda es el escrito con el que se inicia un proceso judicial. Debe incluir los hechos, el derecho aplicable y el petitorio. Se presenta ante el juez competente.",
        laboral:
          "En Argentina, la relación laboral se rige principalmente por la Ley de Contrato de Trabajo (LCT 20.744). Ante un despido sin causa, tenés derecho a preaviso e indemnización.",
      };
      const lower = userMsg.toLowerCase();
      let reply = responses.default;
      if (lower.includes("prescripci")) reply = responses.prescripcion;
      else if (lower.includes("demanda")) reply = responses.demanda;
      else if (lower.includes("laboral") || lower.includes("despido") || lower.includes("trabajo")) reply = responses.laboral;
      setChatMessages((prev) => [...prev, { role: "bot", text: reply }]);
    }, 800);
  };

  const filteredGlosario = GLOSARIO.filter(
    (g) =>
      g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      g.def.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  const filteredNacional = JURISPRUDENCIA_NACIONAL.filter(
    (j) =>
      j.caratula.toLowerCase().includes(searchJuri.toLowerCase()) ||
      j.tema.toLowerCase().includes(searchJuri.toLowerCase()) ||
      j.tribunal.toLowerCase().includes(searchJuri.toLowerCase())
  );

  const filteredProvincial = JURISPRUDENCIA_PROVINCIAL.filter(
    (j) =>
      j.caratula.toLowerCase().includes(searchJuri.toLowerCase()) ||
      j.tema.toLowerCase().includes(searchJuri.toLowerCase()) ||
      j.tribunal.toLowerCase().includes(searchJuri.toLowerCase())
  );

  return (
    <div className="min-h-full flex flex-col" style={{ background: "var(--cream)" }}>
      {/* NAVBAR */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-0"
        style={{ background: "var(--bordo-dark)", borderBottom: "2px solid var(--gold)", height: 60 }}
      >
        <button
          className="flex items-center gap-2 font-display text-xl font-bold tracking-wide"
          style={{ color: "var(--gold)" }}
          onClick={() => nav("home")}
        >
          <span style={{ fontSize: 22 }}>⚖️</span>
          <span>Herme Iuris</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {(["home", "actualidad", "foro", "micuenta"] as Section[]).map((s) => {
            const labels: Record<string, string> = { home: "Home", actualidad: "Actualidad", foro: "Foro", micuenta: "Mi cuenta" };
            return (
              <button
                key={s}
                onClick={() => nav(s)}
                className="px-4 py-2 text-sm font-body font-bold uppercase tracking-widest transition-colors"
                style={{
                  color: section === s ? "var(--gold)" : "rgba(255,255,255,0.85)",
                  borderBottom: section === s ? "2px solid var(--gold)" : "2px solid transparent",
                }}
              >
                {labels[s]}
              </button>
            );
          })}

          {/* Hamburger */}
          <button
            className="ml-3 px-3 py-2 rounded text-sm font-body font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
            style={{ color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.2)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span>Más</span>
            <span style={{ fontSize: 14 }}>▾</span>
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </header>

      {/* Dropdown menu */}
      {menuOpen && (
        <div
          className="fixed top-[60px] right-0 z-40 shadow-xl"
          style={{ background: "var(--bordo-dark)", border: "1px solid var(--gold)", minWidth: 230 }}
        >
          {([
            ["cursos", "🎓 Cursos"],
            ["terminologia", "📖 Terminología"],
            ["chatbot", "🤖 Chatbot jurídico"],
            ["jurisprudencia-nacional", "🏛️ Jurisprudencia nacional"],
            ["jurisprudencia-provincial", "📍 Jurisprudencia provincial"],
          ] as [Section, string][]).map(([s, label]) => (
            <button
              key={s}
              onClick={() => nav(s)}
              className="w-full text-left px-5 py-3 text-sm font-body transition-colors"
              style={{
                color: section === s ? "var(--gold)" : "rgba(255,255,255,0.9)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                background: section === s ? "rgba(201,168,76,0.08)" : "transparent",
              }}
            >
              {label}
            </button>
          ))}
          {/* Buscador en menú */}
          <div className="px-4 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full px-3 py-2 text-sm rounded"
              style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", outline: "none" }}
            />
          </div>
        </div>
      )}

      {/* Main content offset for fixed navbar */}
      <div className="flex-1 pt-[60px]">
        {section === "home" && <HomeSection loggedIn={loggedIn} email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} />}
        {section === "actualidad" && <ActualidadSection news={NEWS} newsComment={newsComment} setNewsComment={setNewsComment} />}
        {section === "foro" && <ForoSection threads={FORUM_THREADS} newThread={newThread} setNewThread={setNewThread} />}
        {section === "micuenta" && <MiCuentaSection loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} />}
        {section === "cursos" && <CursosSection courses={COURSES} />}
        {section === "terminologia" && <TerminologiaSection glosario={filteredGlosario} search={glossarySearch} setSearch={setGlossarySearch} />}
        {section === "chatbot" && <ChatbotSection messages={chatMessages} input={chatInput} setInput={setChatInput} onSend={handleChatSend} />}
        {section === "jurisprudencia-nacional" && <JurisprudenciaSection title="Jurisprudencia Nacional" data={filteredNacional} search={searchJuri} setSearch={setSearchJuri} />}
        {section === "jurisprudencia-provincial" && <JurisprudenciaSection title="Jurisprudencia Provincial" data={filteredProvincial} search={searchJuri} setSearch={setSearchJuri} />}
      </div>

      {/* FOOTER */}
      <footer style={{ background: "var(--bordo-dark)", borderTop: "2px solid var(--gold)" }}>
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-display text-xl font-bold mb-2" style={{ color: "var(--gold)" }}>⚖️ Herme Iuris</div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
              El derecho explicado para todos. Un espacio de educación jurídica popular, accesible y comprometido con la justicia social.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--gold)" }}>Enlaces rápidos</div>
            <div className="flex flex-col gap-1">
              {["Home", "Actualidad", "Foro", "Cursos", "Terminología", "Chatbot"].map((l) => (
                <span key={l} className="text-sm cursor-pointer hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>{l}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--gold)" }}>Redes sociales</div>
            <div className="flex gap-3 mb-4">
              {[["📸", "Instagram"], ["💬", "WhatsApp"], ["👥", "Facebook"], ["🐦", "Twitter"]].map(([icon, name]) => (
                <button
                  key={name}
                  className="flex flex-col items-center gap-1 px-3 py-2 rounded text-xs transition-colors"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <span>{name}</span>
                </button>
              ))}
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              © 2026 Herme Iuris. Información orientativa, no reemplaza asesoramiento profesional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── HOME ── */
function HomeSection({
  loggedIn, email, setEmail, password, setPassword, handleLogin,
}: {
  loggedIn: boolean;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  handleLogin: (e: React.FormEvent) => void;
}) {
  return (
    <div>
      {/* HERO */}
      <div className="relative" style={{ minHeight: 480 }}>
        <img
          src={HERO_IMAGE}
          alt="Tribunal de justicia"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(74,17,32,0.92) 0%, rgba(107,26,42,0.80) 60%, rgba(74,17,32,0.65) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-10 items-start">
          {/* Login aside left */}
          <aside className="w-full md:w-72 shrink-0">
            <div className="rounded-lg p-5 shadow-2xl" style={{ background: "rgba(255,255,255,0.97)", border: "2px solid var(--gold)" }}>
              <div className="font-display text-lg font-bold mb-1" style={{ color: "var(--bordo)" }}>
                {loggedIn ? "¡Bienvenido!" : "Acceder a mi cuenta"}
              </div>
              {loggedIn ? (
                <div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 mx-auto" style={{ background: "var(--bordo)", color: "white" }}>👤</div>
                  <p className="text-center text-sm font-body" style={{ color: "var(--gray-text)" }}>{email || "usuario@herme.ar"}</p>
                  <p className="text-center text-xs mt-1" style={{ color: "var(--bordo-muted)" }}>Sesión activa</p>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="flex flex-col gap-3 mt-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color: "var(--gray-text)" }}>
                      Email o teléfono
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full px-3 py-2 text-sm rounded border outline-none transition-colors"
                      style={{ border: "1.5px solid var(--gray-mid)", color: "var(--text-dark)" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color: "var(--gray-text)" }}>
                      Contraseña
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-sm rounded border outline-none transition-colors"
                      style={{ border: "1.5px solid var(--gray-mid)", color: "var(--text-dark)" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 rounded font-bold text-sm uppercase tracking-widest transition-all"
                    style={{ background: "var(--bordo)", color: "white" }}
                  >
                    Ingresar
                  </button>
                  <div className="text-center">
                    <span className="text-xs" style={{ color: "var(--gray-text)" }}>¿No tenés cuenta? </span>
                    <button type="button" className="text-xs font-bold underline" style={{ color: "var(--bordo)" }}>
                      Registrate aquí
                    </button>
                  </div>
                  <div className="text-center">
                    <button type="button" className="text-xs" style={{ color: "var(--bordo-muted)" }}>
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                </form>
              )}
            </div>
          </aside>

          {/* Hero text */}
          <div className="flex-1 pt-2">
            <div className="flex flex-wrap gap-3 mb-6">
              {["El derecho explicado para todos.", "Tu voz también cuenta.", "La justicia se construye entre todos."].map((phrase) => (
                <span
                  key={phrase}
                  className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                  style={{ background: "var(--gold)", color: "var(--bordo-dark)" }}
                >
                  {phrase}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "white" }}>
              Herme Iuris
            </h1>
            <p className="text-base md:text-lg leading-relaxed font-body" style={{ color: "rgba(255,255,255,0.88)", maxWidth: 620 }}>
              Un espacio donde el derecho deja de ser un lenguaje inaccesible y se convierte en una herramienta para comprender la vida en comunidad. Aquí no importa si sos abogado o ciudadano común: todos tienen derecho a entender cómo las leyes impactan en nuestra sociedad.
            </p>
            <p className="mt-4 text-base leading-relaxed font-body" style={{ color: "rgba(255,255,255,0.75)", maxWidth: 580 }}>
              Queremos que te sientas acompañado, identificado y con voz en cada debate. Porque la justicia no es solo un concepto — es parte de nuestra vida cotidiana.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT: 3-col layout */}
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        {/* Left filler for aside symmetry on large screens (invisible) */}
        <div className="hidden lg:block w-64 shrink-0" />

        {/* CENTER: categories */}
        <div className="flex-1">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--bordo)" }}>
            Áreas del derecho
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className="flex flex-col items-center gap-2 rounded-xl py-5 px-3 text-center shadow transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ background: "white", border: "1.5px solid var(--gray-mid)" }}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="font-body font-bold text-sm uppercase tracking-wide" style={{ color: "var(--bordo)" }}>
                  {cat.name}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "var(--gray-light)", color: "var(--gray-text)" }}
                >
                  Ver más
                </span>
              </button>
            ))}
          </div>

          {/* Latest news teaser */}
          <h2 className="font-display text-2xl font-bold mt-12 mb-5" style={{ color: "var(--bordo)" }}>
            Últimas noticias
          </h2>
          <div className="flex flex-col gap-4">
            {NEWS.slice(0, 2).map((n) => (
              <div key={n.id} className="rounded-xl p-5 shadow-sm" style={{ background: "white", border: "1px solid var(--gray-mid)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{ background: "var(--bordo)", color: "white" }}>{n.category}</span>
                  <span className="text-xs" style={{ color: "var(--gray-text)" }}>{n.date}</span>
                </div>
                <h3 className="font-display text-base font-semibold mb-1" style={{ color: "var(--text-dark)" }}>{n.title}</h3>
                <p className="text-sm" style={{ color: "var(--gray-text)", lineHeight: 1.6 }}>{n.summary.slice(0, 120)}…</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: dictionary aside */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-[72px] rounded-xl shadow-md overflow-hidden" style={{ background: "white", border: "2px solid var(--bordo)" }}>
            <div className="px-4 py-3" style={{ background: "var(--bordo)" }}>
              <div className="font-display text-base font-bold" style={{ color: "var(--gold)" }}>📚 Diccionario jurídico</div>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>Términos esenciales explicados</p>
            </div>
            <div className="divide-y" style={{ borderColor: "var(--gray-mid)" }}>
              {DICTIONARY_TERMS.map((item) => (
                <div key={item.term} className="px-4 py-3">
                  <div className="font-body font-bold text-sm mb-0.5" style={{ color: "var(--bordo)" }}>{item.term}</div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--gray-text)" }}>{item.def}</p>
                </div>
              ))}
            </div>
            <div className="px-4 py-3" style={{ borderTop: "1px solid var(--gray-mid)" }}>
              <button
                className="w-full py-2 rounded text-xs font-bold uppercase tracking-widest transition-colors"
                style={{ background: "var(--bordo)", color: "white" }}
              >
                Ver glosario completo
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ── ACTUALIDAD ── */
function ActualidadSection({
  news, newsComment, setNewsComment,
}: {
  news: typeof NEWS;
  newsComment: Record<number, string>;
  setNewsComment: React.Dispatch<React.SetStateAction<Record<number, string>>>;
}) {
  const [comments, setComments] = useState<Record<number, { user: string; text: string }[]>>(
    Object.fromEntries(news.map((n) => [n.id, n.comments]))
  );

  const addComment = (id: number) => {
    const text = newsComment[id];
    if (!text?.trim()) return;
    setComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), { user: "Vos", text }],
    }));
    setNewsComment((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="font-display text-3xl font-bold" style={{ color: "var(--bordo)" }}>Actualidad jurídica</h1>
        <span className="text-xs px-2 py-1 rounded-full font-bold uppercase" style={{ background: "var(--gold)", color: "var(--bordo-dark)" }}>Fallos recientes</span>
      </div>
      <div className="flex flex-col gap-10">
        {news.map((n) => (
          <article key={n.id} className="rounded-2xl overflow-hidden shadow-md" style={{ background: "white", border: "1px solid var(--gray-mid)" }}>
            <div className="px-6 py-5" style={{ borderBottom: "1px solid var(--gray-mid)" }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{ background: "var(--bordo)", color: "white" }}>{n.category}</span>
                <span className="text-xs" style={{ color: "var(--gray-text)" }}>{n.date}</span>
              </div>
              <h2 className="font-display text-xl font-bold mb-3" style={{ color: "var(--text-dark)" }}>{n.title}</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--gray-text)" }}>{n.summary}</p>
              <div className="rounded-lg p-4" style={{ background: "var(--gray-light)", borderLeft: "3px solid var(--bordo)" }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--bordo)" }}>📌 Interpretación jurídica</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-dark)" }}>{n.interpretation}</p>
              </div>
            </div>
            {/* Comments */}
            <div className="px-6 py-4">
              <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--gray-text)" }}>
                💬 Foro de este fallo ({(comments[n.id] || []).length} comentarios)
              </div>
              <div className="flex flex-col gap-2 mb-4">
                {(comments[n.id] || []).map((c, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "var(--bordo)", color: "white" }}>
                      {c.user[0]}
                    </div>
                    <div className="flex-1 rounded-lg px-3 py-2" style={{ background: "var(--gray-light)" }}>
                      <div className="text-xs font-bold mb-0.5" style={{ color: "var(--bordo)" }}>{c.user}</div>
                      <p className="text-sm" style={{ color: "var(--text-dark)" }}>{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newsComment[n.id] || ""}
                  onChange={(e) => setNewsComment((prev) => ({ ...prev, [n.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && addComment(n.id)}
                  placeholder="Escribí tu comentario..."
                  className="flex-1 px-3 py-2 text-sm rounded-lg outline-none"
                  style={{ border: "1.5px solid var(--gray-mid)" }}
                />
                <button
                  onClick={() => addComment(n.id)}
                  className="px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                  style={{ background: "var(--bordo)", color: "white" }}
                >
                  Enviar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ── FORO ── */
function ForoSection({ threads, newThread, setNewThread }: { threads: typeof FORUM_THREADS; newThread: boolean; setNewThread: (v: boolean) => void }) {
  const [localThreads, setLocalThreads] = useState(threads);
  const [newTitle, setNewTitle] = useState("");
  const [newCat, setNewCat] = useState("Civil");

  const createThread = () => {
    if (!newTitle.trim()) return;
    setLocalThreads((prev) => [
      { id: Date.now(), title: newTitle, replies: 0, category: newCat, hot: false },
      ...prev,
    ]);
    setNewTitle("");
    setNewThread(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-display text-3xl font-bold" style={{ color: "var(--bordo)" }}>Foro general</h1>
        <button
          onClick={() => setNewThread(!newThread)}
          className="px-5 py-2 rounded-lg font-bold text-sm uppercase tracking-widest transition-all"
          style={{ background: "var(--gold)", color: "var(--bordo-dark)" }}
        >
          + Nuevo tema
        </button>
      </div>

      {newThread && (
        <div className="rounded-xl p-5 mb-8 shadow" style={{ background: "white", border: "2px solid var(--bordo)" }}>
          <div className="font-display text-lg font-bold mb-4" style={{ color: "var(--bordo)" }}>Crear nuevo debate</div>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Título del debate..."
              className="w-full px-3 py-2 text-sm rounded-lg outline-none"
              style={{ border: "1.5px solid var(--gray-mid)" }}
            />
            <select
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg outline-none"
              style={{ border: "1.5px solid var(--gray-mid)" }}
            >
              {CATEGORIES.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setNewThread(false)} className="px-4 py-2 rounded-lg text-sm" style={{ color: "var(--gray-text)" }}>Cancelar</button>
              <button onClick={createThread} className="px-5 py-2 rounded-lg font-bold text-sm" style={{ background: "var(--bordo)", color: "white" }}>Publicar</button>
            </div>
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["Todos", ...CATEGORIES.map((c) => c.name)].slice(0, 8).map((cat) => (
          <span key={cat} className="px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors" style={{ background: "var(--gray-light)", color: "var(--gray-text)" }}>
            {cat}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {localThreads.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-4 rounded-xl px-5 py-4 cursor-pointer transition-all hover:shadow-md"
            style={{ background: "white", border: "1px solid var(--gray-mid)" }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "var(--bordo)", color: "white" }}>{t.category}</span>
                {t.hot && <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "var(--gold)", color: "var(--bordo-dark)" }}>🔥 Popular</span>}
              </div>
              <h3 className="font-body font-bold text-sm" style={{ color: "var(--text-dark)" }}>{t.title}</h3>
            </div>
            <div className="text-right shrink-0">
              <div className="text-lg font-bold font-display" style={{ color: "var(--bordo)" }}>{t.replies}</div>
              <div className="text-xs" style={{ color: "var(--gray-text)" }}>respuestas</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── MI CUENTA ── */
function MiCuentaSection({ loggedIn, email, setLoggedIn }: { loggedIn: boolean; email: string; setLoggedIn: (v: boolean) => void }) {
  if (!loggedIn) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">🔐</div>
        <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--bordo)" }}>Acceso requerido</h2>
        <p className="text-sm" style={{ color: "var(--gray-text)" }}>Ingresá desde el formulario en la pantalla de inicio para acceder a tu cuenta.</p>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl font-bold mb-8" style={{ color: "var(--bordo)" }}>Mi cuenta</h1>
      <div className="rounded-2xl p-6 shadow mb-6" style={{ background: "white", border: "1px solid var(--gray-mid)" }}>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold" style={{ background: "var(--bordo)", color: "white" }}>👤</div>
          <div>
            <div className="font-display text-xl font-bold" style={{ color: "var(--text-dark)" }}>Usuario activo</div>
            <div className="text-sm" style={{ color: "var(--gray-text)" }}>{email}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-5">
          {[["Participaciones", "7"], ["Temas creados", "2"], ["Comentarios", "14"]].map(([label, val]) => (
            <div key={label} className="rounded-lg p-3 text-center" style={{ background: "var(--gray-light)" }}>
              <div className="font-display text-2xl font-bold" style={{ color: "var(--bordo)" }}>{val}</div>
              <div className="text-xs" style={{ color: "var(--gray-text)" }}>{label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors" style={{ background: "var(--gray-light)", color: "var(--text-dark)" }}>⚙️ Configuración de perfil</button>
          <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors" style={{ background: "var(--gray-light)", color: "var(--text-dark)" }}>🔔 Notificaciones</button>
          <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors" style={{ background: "var(--gray-light)", color: "var(--text-dark)" }}>📚 Mis cursos</button>
          <button
            onClick={() => setLoggedIn(false)}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors"
            style={{ background: "rgba(107,26,42,0.07)", color: "var(--bordo)" }}
          >
            🚪 Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── CURSOS ── */
function CursosSection({ courses }: { courses: typeof COURSES }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl font-bold mb-3" style={{ color: "var(--bordo)" }}>Cursos de derecho popular</h1>
      <p className="text-sm mb-8" style={{ color: "var(--gray-text)" }}>Formación jurídica accesible para todos los ciudadanos. Sin tecnicismos innecesarios.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {courses.map((c) => (
          <div key={c.title} className="rounded-2xl overflow-hidden shadow" style={{ background: "white", border: "1px solid var(--gray-mid)" }}>
            <div className="px-5 py-4" style={{ background: "var(--bordo)", borderBottom: "2px solid var(--gold)" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "var(--gold)", color: "var(--bordo-dark)" }}>{c.level}</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>{c.duration}</span>
              </div>
              <h3 className="font-display text-base font-bold" style={{ color: "white" }}>{c.title}</h3>
            </div>
            <div className="px-5 py-4">
              <div className="text-xs mb-3" style={{ color: "var(--gray-text)" }}>{c.modules} módulos incluidos</div>
              <button
                className="w-full py-2 rounded-lg font-bold text-sm uppercase tracking-widest"
                style={{ background: "var(--bordo)", color: "white" }}
              >
                Comenzar curso
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── TERMINOLOGÍA ── */
function TerminologiaSection({ glosario, search, setSearch }: { glosario: typeof GLOSARIO; search: string; setSearch: (v: string) => void }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl font-bold mb-2" style={{ color: "var(--bordo)" }}>Glosario jurídico</h1>
      <p className="text-sm mb-6" style={{ color: "var(--gray-text)" }}>Definiciones simples y claras para entender el lenguaje del derecho.</p>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar término..."
        className="w-full px-4 py-3 text-sm rounded-xl outline-none mb-6"
        style={{ border: "2px solid var(--bordo)", background: "white" }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {glosario.map((item) => (
          <div key={item.term} className="rounded-xl p-4 shadow-sm" style={{ background: "white", border: "1px solid var(--gray-mid)" }}>
            <div className="font-display text-base font-bold mb-1" style={{ color: "var(--bordo)" }}>{item.term}</div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--gray-text)" }}>{item.def}</p>
          </div>
        ))}
      </div>
      {glosario.length === 0 && (
        <div className="text-center py-10" style={{ color: "var(--gray-text)" }}>No se encontraron términos para "{search}".</div>
      )}
    </div>
  );
}

/* ── CHATBOT ── */
function ChatbotSection({
  messages, input, setInput, onSend,
}: {
  messages: { role: "user" | "bot"; text: string }[];
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col" style={{ height: "calc(100vh - 120px)" }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: "var(--bordo)", color: "white" }}>🤖</div>
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: "var(--bordo)" }}>Asistente Herme</h1>
          <p className="text-xs" style={{ color: "var(--gray-text)" }}>Consultas jurídicas orientativas · No reemplaza asesoramiento profesional</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4 pr-1">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "bot" && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 mr-2 mt-1" style={{ background: "var(--bordo)", color: "white" }}>⚖</div>
            )}
            <div
              className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
              style={{
                background: msg.role === "user" ? "var(--bordo)" : "white",
                color: msg.role === "user" ? "white" : "var(--text-dark)",
                border: msg.role === "bot" ? "1px solid var(--gray-mid)" : "none",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder="Escribí tu consulta jurídica..."
          className="flex-1 px-4 py-3 text-sm rounded-xl outline-none"
          style={{ border: "2px solid var(--bordo)", background: "white" }}
        />
        <button
          onClick={onSend}
          className="px-5 py-3 rounded-xl font-bold text-sm transition-colors"
          style={{ background: "var(--bordo)", color: "white" }}
        >
          Enviar
        </button>
      </div>
      <p className="text-xs text-center mt-3" style={{ color: "var(--gray-text)" }}>
        Intentá preguntar sobre prescripción, demanda, derechos laborales y más.
      </p>
    </div>
  );
}

/* ── JURISPRUDENCIA ── */
function JurisprudenciaSection({
  title, data, search, setSearch,
}: {
  title: string;
  data: { tribunal: string; fecha: string; caratula: string; tema: string }[];
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="font-display text-3xl font-bold" style={{ color: "var(--bordo)" }}>{title}</h1>
      </div>
      <p className="text-sm mb-6" style={{ color: "var(--gray-text)" }}>Buscá fallos y resoluciones judiciales relevantes.</p>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por carátula, tema o tribunal..."
        className="w-full px-4 py-3 text-sm rounded-xl outline-none mb-6"
        style={{ border: "2px solid var(--bordo)", background: "white" }}
      />
      {data.length === 0 ? (
        <div className="text-center py-10" style={{ color: "var(--gray-text)" }}>No se encontraron resultados.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow" style={{ border: "1px solid var(--gray-mid)" }}>
          <table className="w-full text-sm" style={{ background: "white" }}>
            <thead>
              <tr style={{ background: "var(--bordo)", color: "white" }}>
                {["Tribunal", "Fecha", "Carátula", "Tema"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors cursor-pointer"
                  style={{ borderTop: "1px solid var(--gray-mid)", background: i % 2 === 0 ? "white" : "var(--gray-light)" }}
                >
                  <td className="px-4 py-3 font-bold font-mono text-xs" style={{ color: "var(--bordo)" }}>{row.tribunal}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--gray-text)" }}>{row.fecha}</td>
                  <td className="px-4 py-3">{row.caratula}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "var(--bordo)", color: "white" }}>{row.tema}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
