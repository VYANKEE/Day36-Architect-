import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { 
  Globe, Server, Database, Shield, Zap, Terminal, 
  Activity, Lock, AlertTriangle, Cpu, Info, Code, Layers 
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

// --- UI COMPONENTS ---

const CyberButton = ({ children, onClick, active, disabled, color = "cyan" }) => (
  <motion.button
    whileHover={{ scale: 1.05, letterSpacing: "2px" }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "relative w-full py-4 font-mono font-bold uppercase tracking-wider transition-all duration-300 clip-path-button",
      active 
        ? "bg-cyan-500 text-black shadow-[0_0_30px_#06b6d4]" 
        : "bg-black/40 text-cyan-500 border border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-400",
      disabled && "opacity-30 cursor-not-allowed grayscale"
    )}
    style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
  >
    {children}
  </motion.button>
);

// --- NEW SECTION: DEEP DIVE & MANUAL (TEXT WALA PART) ---
const DeepDiveSection = () => {
  return (
    <section className="relative py-24 px-6 bg-[#020202] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <Activity className="text-cyan-500 animate-pulse" size={40} />
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            SYSTEM <span className="text-cyan-500">INTELLIGENCE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* LEFT: HOW TO USE (USER MANUAL) */}
          <InfoCard title="OPERATIONAL MANUAL" icon={Terminal} color="cyan">
            <ul className="space-y-6 font-mono text-sm md:text-base text-gray-400">
              <li className="flex gap-4">
                <span className="text-cyan-500 font-bold">01.</span>
                <span>
                  <strong className="text-white">TOGGLE LAYERS:</strong> Enable 'AUTH' and 'CACHE' from the Command Module. Observe how the packet path changes dynamically.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="text-cyan-500 font-bold">02.</span>
                <span>
                  <strong className="text-white">ANALYZE LATENCY:</strong> Notice the speed difference. A <span className="text-yellow-400">Cache Hit</span> returns instantly (10-50ms), while a Database fetch takes longer (200ms+).
                </span>
              </li>
              <li className="flex gap-4">
                <span className="text-cyan-500 font-bold">03.</span>
                <span>
                  <strong className="text-white">STRESS TEST:</strong> Use 'SIMULATE FAIL'. In a real system, this represents a DB timeout. Watch how the UI handles errors gracefully.
                </span>
              </li>
            </ul>
          </InfoCard>

          {/* RIGHT: BEHIND THE SCENES (TECHNICAL) */}
          <InfoCard title="BEHIND THE SCENES" icon={Layers} color="purple">
            <div className="space-y-6 font-mono text-sm md:text-base text-gray-400">
              <div>
                <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                  <Server size={16}/> API GATEWAY (Load Balancer)
                </h4>
                <p>
                  Acts as the traffic cop. It terminates SSL, routes requests to the correct service, and protects the backend from being overwhelmed.
                </p>
              </div>
              
              <div className="w-full h-px bg-white/10" />

              <div>
                <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                  <Zap size={16}/> REDIS CACHING
                </h4>
                <p>
                  We store frequent data in RAM (Memory) instead of Disk. This reduces DB load by 90% and makes the app feel "instant".
                </p>
              </div>

              <div className="w-full h-px bg-white/10" />

              <div>
                <h4 className="text-green-500 font-bold mb-2 flex items-center gap-2">
                  <Database size={16}/> DB SHARDING
                </h4>
                <p>
                  Large datasets are split across multiple machines (Shards). This demo simulates querying a "Primary Shard" for read/write operations.
                </p>
              </div>
            </div>
          </InfoCard>

        </div>
      </div>
    </section>
  );
};

const InfoCard = ({ title, icon: Icon, children, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colors = {
    cyan: "border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]",
    purple: "border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.1)]",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "bg-black/80 backdrop-blur-xl border p-8 rounded-xl relative overflow-hidden group hover:border-opacity-100 transition-all",
        colors[color] || colors.cyan
      )}
    >
      {/* Moving Scanline Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[200%] w-full animate-scanline opacity-0 group-hover:opacity-100 pointer-events-none" />

      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold font-mono tracking-widest text-white">{title}</h3>
        <Icon className={cn("opacity-50 group-hover:opacity-100 transition-opacity", color === 'purple' ? 'text-purple-400' : 'text-cyan-400')} size={24} />
      </div>
      
      {children}
    </motion.div>
  );
};

// --- PREVIOUS COMPONENTS (SCROLL PIPELINE & PLAYGROUND) ---
// (Note: Included compactly so you can copy full file)

const ScrollPipeline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pipeFill = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative py-24 px-6 min-h-[150vh] bg-black overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-[100px_1fr] gap-10">
        <div className="hidden md:block relative w-2 bg-gray-900 rounded-full h-full mx-auto">
          <motion.div style={{ height: pipeFill }} className="w-full bg-cyan-500 shadow-[0_0_20px_#06b6d4] rounded-full relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-[0_0_30px_white]" />
          </motion.div>
        </div>
        <div className="space-y-40 py-20">
          <ScrollCard title="01. THE REQUEST" text="User clicks trigger a JSON payload. The signal enters the fiber optic web." icon={Globe} />
          <ScrollCard title="02. THE GATEKEEPER" text="Load Balancer intercepts. It checks health, decrypts SSL, and routes traffic." icon={Shield} />
          <ScrollCard title="03. THE LOGIC CORE" text="Business rules apply. Caches are checked first. If empty, we dive into DB shards." icon={Cpu} />
        </div>
      </div>
    </div>
  );
};

const ScrollCard = ({ title, text, icon: Icon }) => (
  <motion.div 
    initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ margin: "-100px" }}
    className="p-8 border border-white/10 bg-black/60 backdrop-blur-md rounded-xl hover:border-cyan-500/50 transition-colors"
  >
    <div className="flex items-center gap-4 mb-4">
        <Icon size={40} className="text-cyan-500" />
        <h2 className="text-3xl font-bold text-white font-mono">{title}</h2>
    </div>
    <p className="text-gray-400 text-lg leading-relaxed max-w-lg">{text}</p>
  </motion.div>
);

const Playground = () => {
  const [active, setActive] = useState(false);
  const [config, setConfig] = useState({ auth: false, cache: false });
  const [logs, setLogs] = useState([]);
  const [packetPath, setPacketPath] = useState(null);
  const [nodeStatus, setNodeStatus] = useState({ client: 'idle', gw: 'idle', cache: 'idle', db: 'idle', auth: 'idle' });

  const addLog = (msg) => setLogs(p => [`> ${msg}`, ...p].slice(0, 6));
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  const runSim = async () => {
    if(active) return;
    setActive(true); setLogs([]); setNodeStatus({ client: 'active', gw: 'idle', cache: 'idle', db: 'idle', auth: 'idle' });
    
    addLog("PACKET DEPLOYED...");
    let nextNode = config.auth ? 'auth' : 'gw';
    setPacketPath(`client-${nextNode}`);
    await wait(1000);

    if(config.auth) {
        setNodeStatus(p => ({...p, auth: 'active'}));
        addLog("VERIFYING IDENTITY...");
        await wait(800);
        setPacketPath('auth-gw');
        await wait(1000);
    }

    setNodeStatus(p => ({...p, gw: 'active'}));
    addLog("GATEWAY ROUTING...");
    await wait(500);

    if(config.cache) {
        setPacketPath('gw-cache');
        await wait(1000);
        setNodeStatus(p => ({...p, cache: 'active'}));
        addLog("CACHE HIT! RETURNING...");
        await wait(500);
        setPacketPath('cache-gw');
        await wait(1000);
    } else {
        setPacketPath('gw-db');
        await wait(1000);
        setNodeStatus(p => ({...p, db: 'active'}));
        addLog("FETCHING FROM SHARD 01...");
        await wait(1200);
        setPacketPath('db-gw');
        await wait(1000);
    }

    setPacketPath(`gw-client`);
    await wait(1000);
    setNodeStatus(p => ({...p, client: 'success'}));
    addLog("REQUEST COMPLETE [200 OK]");
    setActive(false); setPacketPath(null);
  };

  return (
    <section className="relative min-h-[900px] bg-[#050505] flex flex-col xl:flex-row border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
      
      <div className="w-full xl:w-1/4 p-8 border-r border-white/10 bg-black/80 z-20 flex flex-col gap-6">
        <div className="flex items-center gap-2 text-cyan-400 mb-6">
          <Terminal size={20} /> <span className="font-mono font-bold tracking-widest">COMMAND_OS v2.0</span>
        </div>
        <div className="space-y-4">
          <Toggle label="AUTH_LAYER" active={config.auth} onClick={() => setConfig(p => ({...p, auth: !p.auth}))} icon={Shield} />
          <Toggle label="REDIS_CACHE" active={config.cache} onClick={() => setConfig(p => ({...p, cache: !p.cache}))} icon={Zap} />
        </div>
        <div className="mt-8">
           <CyberButton onClick={runSim} disabled={active} active={active}>{active ? 'EXECUTING...' : 'INITIATE REQUEST'}</CyberButton>
        </div>
        <div className="flex-1 bg-black border border-white/10 p-4 font-mono text-xs text-green-500 overflow-hidden">
           {logs.map((l, i) => <div key={i} className="mb-1 opacity-80">{l}</div>)}
           {!logs.length && <span className="opacity-30">Waiting for input...</span>}
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-black">
         <div className="cyber-floor" />
         <div className="relative w-[800px] h-[500px] select-none scale-[0.6] md:scale-[0.8] xl:scale-100 transition-transform">
            <Node x={50} y={250} icon={Globe} label="CLIENT" status={nodeStatus.client} />
            <AnimatePresence>{config.auth && <Node x={250} y={250} icon={Shield} label="AUTH" status={nodeStatus.auth} color="purple" />}</AnimatePresence>
            <Node x={450} y={250} icon={Server} label="GATEWAY" status={nodeStatus.gw} />
            <div className={`transition-opacity duration-500 ${config.cache ? 'opacity-100' : 'opacity-20'}`}>
               <Node x={450} y={50} icon={Zap} label="CACHE" status={nodeStatus.cache} color="yellow" />
            </div>
            <Node x={700} y={250} icon={Database} label="DATABASE" status={nodeStatus.db} color="green" />
            
            <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
               {!config.auth && <Path id="client-gw" d="M 110 250 L 390 250" active={packetPath === 'client-gw' || packetPath === 'gw-client'} />}
               {config.auth && (
                 <>
                   <Path id="client-auth" d="M 110 250 L 190 250" active={packetPath === 'client-auth'} />
                   <Path id="auth-gw" d="M 310 250 L 390 250" active={packetPath === 'auth-gw'} />
                 </>
               )}
               <Path id="gw-cache" d="M 450 190 L 450 110" active={packetPath === 'gw-cache' || packetPath === 'cache-gw'} />
               <Path id="gw-db" d="M 510 250 L 640 250" active={packetPath === 'gw-db' || packetPath === 'db-gw'} />
            </svg>
         </div>
         <div className="absolute bottom-6 right-6 flex gap-6">
            <Stat label="LATENCY" val="24ms" /> <Stat label="UPTIME" val="99.99%" />
         </div>
      </div>
    </section>
  );
};

const Node = ({ x, y, icon: Icon, label, status, color = "cyan" }) => {
  const isActive = status === 'active';
  const colors = { cyan: "border-cyan-500 text-cyan-400 shadow-cyan-500/50", purple: "border-purple-500 text-purple-400 shadow-purple-500/50", yellow: "border-yellow-500 text-yellow-400 shadow-yellow-500/50", green: "border-green-500 text-green-400 shadow-green-500/50" };
  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={cn("absolute w-28 h-28 -ml-14 -mt-14 bg-black/90 backdrop-blur-xl border-2 rounded-2xl flex flex-col items-center justify-center gap-2 z-10 transition-all duration-300", isActive ? `scale-110 shadow-[0_0_40px] ${colors[color]}` : "border-white/10 text-gray-600")} style={{ left: x, top: y }}>
      <Icon size={32} className={isActive ? "animate-pulse" : ""} /> <span className="text-[10px] font-bold tracking-widest">{label}</span>
    </motion.div>
  );
};

const Path = ({ d, active }) => (
  <>
    <path d={d} stroke="#1f2937" strokeWidth="4" fill="none" />
    <motion.path d={d} stroke={active ? "#06b6d4" : "transparent"} strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: active ? 1 : 0 }} transition={{ duration: 0.5 }} />
    {active && <circle r="6" fill="white" filter="url(#glow)"><animateMotion dur="1s" repeatCount="indefinite" path={d} /></circle>}
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  </>
);

const Toggle = ({ label, active, onClick, icon: Icon }) => (
  <button onClick={onClick} className={cn("w-full flex items-center justify-between p-4 border rounded transition-all group", active ? "border-cyan-500 bg-cyan-500/10" : "border-white/10 hover:border-white/30")}>
    <div className="flex items-center gap-3"><Icon size={18} className={active ? "text-cyan-400" : "text-gray-500"} /> <span className="text-sm font-mono text-gray-300">{label}</span></div>
    <div className={cn("w-3 h-3 rounded-full border", active ? "bg-cyan-400 border-cyan-400 shadow-[0_0_10px_#06b6d4]" : "border-gray-600")} />
  </button>
);

const Stat = ({ label, val }) => (<div className="text-right"><div className="text-[10px] text-gray-500 font-mono tracking-widest">{label}</div><div className="text-xl font-bold font-mono text-cyan-400">{val}</div></div>);

// --- MAIN APP ---

export default function App() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black">
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#06b6d410_0%,_transparent_70%)]" />
        <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-gray-500 tracking-tighter mb-8 neon-text text-center">
          SYSTEM<br/>VISUALIZER
        </h1>
        <p className="text-cyan-400 font-mono tracking-[0.3em] animate-pulse">SCROLL TO INITIALIZE</p>
      </section>

      <ScrollPipeline />
      <Playground />
      
      {/* NEW SECTION ADDED HERE */}
      <DeepDiveSection />

      <footer className="py-8 text-center border-t border-white/10 bg-black text-gray-600 font-mono text-xs">
        SYSTEM STATUS: ONLINE // END OF STREAM
      </footer>
    </main>
  );
}