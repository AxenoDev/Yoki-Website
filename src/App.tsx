import {useEffect, useState} from "react";

const FEATURES = [
    {
        tag: "01",
        title: "Native performance",
        desc: "Compiled to machine code. Thousands of concurrent players without breaking a sweat."
    },
    {tag: "02", title: "Zero JVM", desc: "One lightweight binary. No Java to install, no flags to tune."},
    {tag: "03", title: "Stable ticks", desc: "No garbage collector, so no lag spikes. 20 TPS, all the time."},
    {
        tag: "04",
        title: "Native multi-version",
        desc: "One server, every client version. Multi-version support is built in."
    },
    {
        tag: "05",
        title: "Deep customization",
        desc: "Shape everything about your server: gameplay, world rules, scoreboard, ..."
    },
    {tag: "06", title: "Open source", desc: "The code is public, auditable, and open to contributions."},
];

const STATS = [
    {label: "Startup time", value: "< 50 ms"},
    {label: "Memory footprint", value: "~ 30 MB"},
    {label: "Garbage collector pauses", value: "0"},
];

function useScrollReveal() {
    useEffect(() => {
        const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const offsets = new Map<HTMLElement, number>();
        els.forEach((el) => {
            const parent = el.parentElement;
            const siblings = parent
                ? Array.from(parent.children).filter((c) => c.hasAttribute("data-reveal"))
                : [el];
            offsets.set(el, Math.min(siblings.indexOf(el), 5) * 0.08);
        });

        let raf = 0;
        const update = () => {
            raf = 0;
            const vh = window.innerHeight;
            const range = vh * 0.28;
            const atBottom = window.scrollY + vh >= document.documentElement.scrollHeight - 2;
            for (const el of els) {
                const top = el.getBoundingClientRect().top;
                const raw = (vh - top) / range - (offsets.get(el) ?? 0);
                const p = reduced || atBottom ? 1 : Math.min(1, Math.max(0, raw));
                el.style.opacity = String(p);
                el.style.transform =
                    el.dataset.reveal === "scale"
                        ? `translateY(${16 * (1 - p)}px) scale(${0.85 + 0.15 * p})`
                        : `translateY(${32 * (1 - p)}px)`;
            }
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, {passive: true});
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);
}

function Nav() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll, {passive: true});
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className={"nav-wrap" + (scrolled ? " is-scrolled" : "")}>
            <nav style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                maxWidth: 1040,
                margin: "0 auto",
                padding: "16px clamp(20px, 4vw, 32px)"
            }}>
                <a href="/" style={{display: "flex", alignItems: "center", gap: 12}}>
                    <img src="/logo.svg" alt="Yoki" style={{width: 34, height: 34, borderRadius: 8}}/>
                    <img src="/text.svg" alt="Yoki" style={{height: 20, display: "block"}}/>
                </a>
                <div style={{display: "flex", alignItems: "center", gap: 32, fontSize: 14, fontWeight: 500}}>
                    <a className="nav-link" href="#features">Features</a>
                    <a className="nav-link" href="#why-rust">Why Rust</a>
                    <a className="nav-link" href="#get-started">Documentation</a>
                    <a href="https://github.com/AxenoDev/Yoki" className="btn btn-dark"
                       style={{padding: "9px 18px", fontSize: 14}}>GitHub</a>
                </div>
            </nav>
        </div>
    );
}

function Hero() {
    return (
        <header style={{
            maxWidth: 1040,
            margin: "0 auto",
            padding: "clamp(140px, 22vh, 186px) clamp(20px, 4vw, 32px) clamp(80px, 13vh, 120px)",
            textAlign: "center"
        }}>
            <h1 data-reveal=""
                style={{
                    fontSize: "clamp(42px, 9vw, 72px)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    margin: "0 0 24px"
                }}>
                Yoki, the Minecraft<br/> server reinvented.
            </h1>
            <p data-reveal="" style={{
                fontSize: "clamp(17px, 4.5vw, 20px)",
                lineHeight: 1.6,
                color: "#5C6470",
                maxWidth: 560,
                margin: "0 auto 40px",
                textWrap: "pretty"
            }}>
                A high-performance Minecraft server written from scratch in Rust.
                Zero JVM, wro lag spikes - pure performance.
            </p>
            <div data-reveal="" style={{display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap"}}>
                <a href="#get-started" className="btn btn-primary">Get started</a>
                <a href="#features" className="btn btn-outline">Explore</a>
            </div>
        </header>
    );
}

function Terminal() {
    const now = new Date();
    const [randomSeconds] = useState(() => Math.floor(Math.random() * 121));
    const previous = new Date(now.getTime() - (2 * 60 * 1000) - (randomSeconds * 1000));

    const currentTime = now.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    const previousTime = previous.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
    return (
        <section data-reveal=""
                 style={{
                     maxWidth: 720,
                     margin: "0 auto",
                     padding: "0 clamp(20px, 4vw, 32px) clamp(80px, 13vh, 120px)"
                 }}>
            <div style={{
                background: "#1E2A38",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(30, 42, 56, 0.18)"
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "14px 18px",
                    borderBottom: "1px solid rgba(253, 253, 251, 0.08)"
                }}>
                    {[0, 1, 2].map((i) => (
                        <span key={i} style={{
                            width: 11,
                            height: 11,
                            borderRadius: "50%",
                            background: "rgba(253,253,251,0.18)",
                            display: "block"
                        }}/>
                    ))}
                </div>
                <div style={{
                    padding: "24px 26px",
                    fontFamily: "'SF Mono', ui-monospace, Menlo, monospace",
                    fontSize: 14,
                    lineHeight: 1.9,
                    color: "#F4E9D2",
                    overflowX: "auto",
                    whiteSpace: "nowrap"
                }}>
                    <div><span style={{color: "#C8452C"}}>$</span> cargo run --release</div>
                    <div style={{color: "#8A97A5"}}> Compiling yoki v0.0.1-beta-1</div>
                    <div style={{color: "#8A97A5"}}> Finished release in 1.13s</div>
                    <div style={{color: "#8A97A5"}}>
                        <span style={{color: "#5C6470"}}>[{previousTime} <span
                            style={{color: "#7FB37A"}}>INFO</span>]:</span>
                        <span style={{color: "#F4E9D2"}}>Yoki listening on demo-yoki.axeno.me</span>
                    </div>
                    <div style={{color: "#8A97A5"}}>
                        <span style={{color: "#5C6470"}}>[{currentTime} <span
                            style={{color: "#7FB37A"}}>INFO</span>]:</span>
                        <span
                            style={{color: "#F4E9D2"}}>login start: axenq (uuid 38ead091-8977-4815-bae6-43735d3b848a)</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Features() {
    return (
        <section id="features" style={{background: "#F7F1E3"}}>
            <div style={{maxWidth: 1040, margin: "0 auto", padding: "clamp(70px, 12vh, 110px) clamp(20px, 4vw, 32px)"}}>
                <h2 data-reveal=""
                    style={{
                        fontSize: "clamp(32px, 7vw, 44px)",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        margin: "0 0 12px"
                    }}>Built for
                    performance.</h2>
                <p data-reveal=""
                   style={{fontSize: 18, color: "#5C6470", margin: "0 0 64px", maxWidth: 520, textWrap: "pretty"}}>
                    Every tick counts. Yoki rethinks server architecture from the ground up.
                </p>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
                    gap: 20
                }}>
                    {FEATURES.map((f) => (
                        <div key={f.tag} data-reveal=""
                             style={{background: "#FDFDFB", borderRadius: 18, padding: "32px 28px"}}>
                            <div style={{
                                fontSize: 15,
                                fontWeight: 700,
                                color: "#C8452C",
                                marginBottom: 10,
                                fontFamily: "'SF Mono', ui-monospace, Menlo, monospace"
                            }}>{f.tag}</div>
                            <h3 style={{
                                fontSize: 20,
                                fontWeight: 650,
                                margin: "0 0 10px",
                                letterSpacing: "-0.01em"
                            }}>{f.title}</h3>
                            <p style={{
                                fontSize: 15,
                                lineHeight: 1.6,
                                color: "#5C6470",
                                margin: 0,
                                textWrap: "pretty"
                            }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function WhyRust() {
    return (
        <section id="why-rust" style={{
            maxWidth: 1040,
            margin: "0 auto",
            padding: "clamp(80px, 14vh, 130px) clamp(20px, 4vw, 32px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(40px, 7vw, 80px)",
            alignItems: "center"
        }}>
            <div data-reveal="">
                <h2 style={{
                    fontSize: "clamp(32px, 7vw, 44px)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    margin: "0 0 20px",
                    lineHeight: 1.15
                }}>Why Rust?</h2>
                <p style={{fontSize: 17, lineHeight: 1.7, color: "#5C6470", margin: "0 0 18px", textWrap: "pretty"}}>
                    No garbage collector, no unpredictable pauses. Memory is managed at compile time, not while your
                    players are exploring.
                </p>
                <p style={{fontSize: 17, lineHeight: 1.7, color: "#5C6470", margin: 0, textWrap: "pretty"}}>
                    The result: stable ticks, a tiny memory footprint, and a server that doesn't crash at 3 a.m.
                </p>
            </div>
            <div style={{display: "grid", gap: 14}}>
                {STATS.map((s) => (
                    <div key={s.label} data-reveal="" style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #EDE8DB",
                        padding: "18px 4px"
                    }}>
                        <span style={{fontSize: 15, color: "#5C6470"}}>{s.label}</span>
                        <span style={{fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em"}}>{s.value}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

function CTA() {
    return (
        <section id="get-started"
                 style={{
                     maxWidth: 1040,
                     margin: "0 auto",
                     padding: "0 clamp(20px, 4vw, 32px) clamp(80px, 14vh, 130px)",
                     textAlign: "center"
                 }}>
            <div style={{
                border: "1px solid #EDE8DB",
                borderRadius: 24,
                padding: "clamp(48px, 9vw, 90px) clamp(20px, 5vw, 40px)"
            }}>
                <img data-reveal="scale" src="/logo.svg" alt=""
                     style={{width: 56, height: 56, borderRadius: 14, marginBottom: 28}}/>
                <h2 data-reveal=""
                    style={{
                        fontSize: "clamp(30px, 7vw, 40px)",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        margin: "0 0 14px"
                    }}>Ready to
                    try?</h2>
                <p data-reveal="" style={{fontSize: 17, color: "#5C6470", margin: "0 0 36px"}}>Open source. One binary.
                    Zero Java dependencies.</p>
                <div data-reveal="" style={{display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap"}}>
                    <a href="https://github.com/AxenoDev/Yoki" className="btn btn-dark">View on GitHub</a>
                    <a href="#" className="btn btn-outline">Read the docs</a>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer style={{borderTop: "1px solid #EDE8DB"}}>
            <div style={{
                maxWidth: 1040,
                margin: "0 auto",
                padding: "32px clamp(20px, 4vw, 32px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 14,
                fontSize: 13,
                color: "#8A929C"
            }}>
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                    <img src="/favicon.svg" alt="" style={{width: 26, height: 26, borderRadius: 5}}/>
                    <span>&copy; 2026 Yoki</span>
                </div>
                <div style={{display: "flex", gap: 24}}>
                    <a href="https://github.com/AxenoDev/Yoki" style={{color: "#8A929C"}}>GitHub</a>
                    <a href="https://github.com/AxenoDev/Yoki/blob/master/LICENSE"
                       style={{color: "#8A929C"}}>License</a>
                </div>
            </div>
        </footer>
    );
}

export default function App() {
    useScrollReveal();
    return (
        <div style={{minHeight: "100vh", background: "#FDFDFB", color: "#1E2A38"}}>
            <Nav/>
            <Hero/>
            <Terminal/>
            <Features/>
            <WhyRust/>
            <CTA/>
            <Footer/>
        </div>
    );
}
