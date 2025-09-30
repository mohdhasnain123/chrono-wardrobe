export function RealisticWorldMap() {
  return (
    <svg viewBox="0 0 1000 500" className="w-full h-full">
      <defs>
        {/* Ocean gradient */}
        <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor: '#E3F2FD', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#BBDEFB', stopOpacity: 1}} />
        </linearGradient>
        
        {/* Land gradient */}
        <linearGradient id="landGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor: '#FAFAFA', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#F5F5F5', stopOpacity: 1}} />
        </linearGradient>
        
        {/* Grid pattern */}
        <pattern id="mapGrid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#E0E0E0" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        
        {/* Glow filter */}
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Ocean background */}
      <rect width="1000" height="500" fill="url(#oceanGrad)"/>
      <rect width="1000" height="500" fill="url(#mapGrid)"/>
      
      {/* Realistic continents */}
      <g fill="url(#landGrad)" stroke="#00A651" strokeWidth="1.5" opacity="0.95">
        
        {/* North America */}
        <path d="M 60,80 Q 70,60 90,55 L 120,50 Q 140,48 160,52 L 180,58 Q 200,65 210,75 L 220,90 Q 225,105 225,120 L 220,140 Q 215,160 205,175 L 190,190 Q 170,200 150,205 L 130,208 Q 110,208 95,202 L 75,192 Q 60,180 55,160 L 52,140 Q 52,115 60,95 Z" 
          className="hover:fill-primary/5 transition-all cursor-pointer"/>
        
        {/* Greenland */}
        <path d="M 250,30 L 270,25 Q 285,27 290,35 L 292,50 Q 290,65 280,72 L 265,75 Q 250,73 245,62 L 242,45 Q 243,35 250,30 Z"
          className="hover:fill-primary/5 transition-all cursor-pointer"/>
        
        {/* South America */}
        <path d="M 180,220 Q 190,215 200,218 L 215,225 Q 230,235 235,250 L 240,275 Q 242,300 235,320 L 225,340 Q 215,355 200,360 L 185,362 Q 170,358 162,345 L 155,325 Q 152,300 155,275 L 160,250 Q 165,232 180,220 Z"
          className="hover:fill-primary/5 transition-all cursor-pointer"/>
        
        {/* Europe */}
        <path d="M 430,55 Q 440,50 455,48 L 475,47 Q 490,49 500,55 L 515,65 Q 525,78 528,92 L 527,108 Q 523,122 512,130 L 495,137 Q 478,140 462,136 L 445,130 Q 432,120 428,105 L 426,88 Q 427,70 430,55 Z"
          className="hover:fill-primary/5 transition-all cursor-pointer"/>
        
        {/* Africa */}
        <path d="M 460,145 Q 475,140 492,142 L 510,148 Q 528,158 540,175 L 548,195 Q 552,220 548,245 L 540,275 Q 530,300 515,315 L 495,325 Q 475,330 455,325 L 435,315 Q 420,300 413,280 L 408,255 Q 407,230 412,205 L 420,180 Q 430,160 460,145 Z"
          className="hover:fill-primary/5 transition-all cursor-pointer"/>
        
        {/* Asia - Main */}
        <path d="M 530,45 Q 550,40 575,38 L 620,35 Q 665,37 705,42 L 745,50 Q 780,60 810,75 L 835,92 Q 855,110 865,132 L 870,155 Q 868,178 855,195 L 835,210 Q 810,222 780,228 L 745,232 Q 705,233 665,230 L 620,225 Q 580,218 550,205 L 535,195 Q 525,180 522,160 L 520,135 Q 522,110 530,80 Z"
          className="hover:fill-primary/5 transition-all cursor-pointer"/>
        
        {/* India */}
        <path d="M 660,165 Q 672,160 685,162 L 700,168 Q 712,178 718,192 L 722,210 Q 720,228 710,240 L 695,248 Q 680,250 667,245 L 655,235 Q 648,222 647,207 L 648,190 Q 652,175 660,165 Z"
          className="hover:fill-primary/5 transition-all cursor-pointer"/>
        
        {/* Southeast Asia */}
        <path d="M 760,230 Q 770,228 780,232 L 790,240 Q 795,252 793,265 L 788,278 Q 780,285 770,285 L 758,282 Q 750,275 748,265 L 748,252 Q 752,238 760,230 Z"
          className="hover:fill-primary/5 transition-all cursor-pointer"/>
        
        {/* Australia */}
        <path d="M 750,295 Q 768,290 788,292 L 815,298 Q 840,308 855,325 L 865,345 Q 868,365 860,380 L 845,392 Q 825,398 805,395 L 780,388 Q 760,378 748,362 L 742,345 Q 740,325 748,308 Z"
          className="hover:fill-primary/5 transition-all cursor-pointer"/>
        
        {/* Japan */}
        <path d="M 875,115 Q 882,112 890,115 L 895,122 Q 897,132 893,140 L 885,145 Q 878,145 873,140 L 870,130 Q 870,120 875,115 Z"
          className="hover:fill-primary/5 transition-all cursor-pointer"/>
        
        {/* New Zealand */}
        <path d="M 920,380 L 928,378 Q 935,382 935,390 L 932,398 Q 927,402 920,400 L 915,395 Q 913,388 916,383 Z"
          className="hover:fill-primary/5 transition-all cursor-pointer"/>
        
        {/* UK & Ireland */}
        <path d="M 405,65 Q 410,63 415,65 L 418,70 Q 418,76 413,78 L 407,78 Q 403,75 403,70 Z"
          className="hover:fill-primary/5 transition-all cursor-pointer"/>
        
        {/* Scandinavia */}
        <path d="M 445,30 Q 455,25 465,28 L 475,35 Q 478,45 473,53 L 463,58 Q 453,58 447,52 L 443,43 Q 442,35 445,30 Z"
          className="hover:fill-primary/5 transition-all cursor-pointer"/>
        
        {/* Middle East */}
        <path d="M 535,135 Q 548,130 562,133 L 575,140 Q 583,152 580,165 L 570,175 Q 558,178 546,173 L 538,165 Q 534,153 535,142 Z"
          className="hover:fill-primary/5 transition-all cursor-pointer"/>
        
      </g>
      
      {/* Latitude/Longitude lines */}
      <g stroke="#BDBDBD" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,3">
        {/* Latitudes */}
        {[100, 150, 200, 250, 300, 350, 400].map(y => (
          <line key={`lat-${y}`} x1="0" y1={y} x2="1000" y2={y} />
        ))}
        {/* Longitudes */}
        {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(x => (
          <line key={`lon-${x}`} x1={x} y1="0" x2={x} y2="500" />
        ))}
        {/* Equator - thicker */}
        <line x1="0" y1="250" x2="1000" y2="250" strokeWidth="1" opacity="0.6"/>
      </g>
    </svg>
  );
}
