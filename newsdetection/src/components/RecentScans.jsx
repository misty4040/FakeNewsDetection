import { useRef } from 'react'

const scans = [
  {
    id: '0921',
    title: 'COVID-19 ARTICLE',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=800',
    status: 'VERIFIED',
    score: 94,
    source: 'WHO.INT',
    color: 'green',
    desc: 'CREDIBLE'
  },
  {
    id: '0844',
    title: 'POLITICAL POST',
    image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=800',
    status: 'FLAGGED',
    score: 12,
    source: 'UNKNOWN',
    color: 'red',
    desc: 'SUSPICIOUS',
    grayscale: true,
    overlay: 'SUSPICIOUS'
  },
  {
    id: '0776',
    title: 'VIRAL CLAIM',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800',
    status: 'MIXED',
    score: 58,
    source: 'SOCIAL MEDIA',
    color: 'yellow',
    desc: '58%'
  },
  {
    id: '0903',
    title: 'NEWS REPORT',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168d6c?auto=format&fit=crop&q=80&w=800',
    status: 'VERIFIED',
    score: 89,
    source: 'BBC.COM',
    color: 'green',
    desc: '89%'
  },
  {
    id: '0955',
    title: 'WHATSAPP FORWARD',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&q=80&w=800',
    status: 'FALSE',
    score: 7,
    source: 'FORWARDED MSG',
    color: 'red',
    desc: '7%',
    grayscale: true
  }
]

export default function RecentScans() {
  const scrollRef = useRef(null)

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <section id="awareness" className="py-20 stripe-pattern">
      <div className="container mx-auto px-4 md:px-8 mb-10 flex justify-between items-end">
        <div>
          <p className="font-bold uppercase tracking-[0.2em] text-[#09090B]/50 mb-2 text-xs font-mono">
            Detection Results
          </p>
          <h2 className="font-display text-5xl">RECENT SCANS</h2>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => scroll(-350)}
            className="w-14 h-14 border-2 border-[#09090B] bg-[#F8F4E8] hard-shadow-sm flex items-center justify-center hover:bg-[#D2E823] transition-all cursor-none"
          >
            <iconify-icon icon="lucide:arrow-left" class="text-2xl" />
          </button>
          <button
            onClick={() => scroll(350)}
            className="w-14 h-14 border-2 border-[#09090B] bg-[#F8F4E8] hard-shadow-sm flex items-center justify-center hover:bg-[#D2E823] transition-all cursor-none"
          >
            <iconify-icon icon="lucide:arrow-right" class="text-2xl" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="no-scrollbar overflow-x-auto flex gap-8 px-4 md:px-8 pb-10">
        {scans.map((scan) => {
          const isGreen = scan.color === 'green'
          const isRed = scan.color === 'red'
          
          const colorClass = isGreen ? 'text-green-400' : isRed ? 'text-red-400' : 'text-yellow-400'
          const bgClass = isGreen ? 'bg-green-500/20 border-green-500/40' : isRed ? 'bg-red-500/20 border-red-500/40' : 'bg-yellow-500/20 border-yellow-500/40'
          const dotClass = isGreen ? 'bg-green-400' : isRed ? 'bg-red-400' : 'bg-yellow-400'
          const descColor = isGreen ? 'text-green-600' : isRed ? 'text-red-500' : 'text-yellow-600'

          return (
            <div key={scan.id} className="min-w-[320px] group">
              <div className="relative bg-[#09090B] border-2 border-[#09090B] hard-shadow-lg aspect-square mb-6 overflow-hidden">
                <img
                  src={scan.image}
                  alt={scan.title}
                  className={`w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500 ${scan.grayscale ? 'grayscale opacity-20' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/50 to-transparent" />
                
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  {/* Top */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#F8F4E8]/40">SCAN #{scan.id}</span>
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 border rounded-full ${bgClass}`}>
                      <div className={`w-1.5 h-1.5 rounded-full animate-scan-pulse ${dotClass}`} />
                      <span className={`font-mono text-[9px] font-bold ${colorClass}`}>{scan.status}</span>
                    </div>
                  </div>

                  {/* Center Score */}
                  <div className="text-center z-10">
                    <div className={`font-display text-6xl ${colorClass}`}>
                      {scan.score < 10 ? `0${scan.score}` : scan.score}<span className="text-3xl">%</span>
                    </div>
                    <div className="font-mono text-[10px] text-[#F8F4E8]/40 tracking-widest mt-1">CREDIBILITY SCORE</div>
                    <div className="mt-3 flex justify-center gap-0.5">
                      {[...Array(5)].map((_, i) => {
                        const filled = (scan.score / 20) > i
                        return (
                          <div
                            key={i}
                            className={`w-8 h-1.5 rounded-full ${filled ? (isGreen ? 'bg-green-400' : isRed ? 'bg-red-500' : 'bg-yellow-400') : 'bg-[#F8F4E8]/10'}`}
                          />
                        )
                      })}
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-between border-t border-[#F8F4E8]/10 pt-3 z-10">
                    <span className="font-mono text-[9px] text-[#F8F4E8]/30">SOURCE: {scan.source}</span>
                    <iconify-icon
                      icon={isGreen ? 'lucide:shield-check' : isRed ? (scan.id === '0955' ? 'lucide:x-circle' : 'lucide:alert-triangle') : 'lucide:alert-circle'}
                      class={colorClass}
                    />
                  </div>
                </div>

                {/* Overlays */}
                {scan.score >= 80 && (
                  <div className="absolute top-4 left-4 bg-[#D2E823] text-[#09090B] px-3 py-1 font-bold text-xs border-2 border-[#09090B] flex items-center gap-1 z-10">
                    <iconify-icon icon="lucide:badge-check" class="text-sm" /> VERIFIED {scan.score}%
                  </div>
                )}
                {scan.overlay && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <span className="bg-red-500 text-white px-6 py-2 font-display text-xl -rotate-12 border-4 border-white/30">
                      {scan.overlay}
                    </span>
                  </div>
                )}
              </div>
              <h4 className="font-display text-xl mb-1">{scan.title}</h4>
              <p className="font-bold text-[#09090B]/60">
                {scan.score >= 80 ? 'VERIFIED' : scan.status === 'MIXED' ? 'MIXED SIGNALS' : `SCAN #${scan.id}`} · <span className={descColor}>{scan.desc}</span>
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
