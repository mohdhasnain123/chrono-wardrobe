import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AlertCircle } from 'lucide-react';

interface MapNode {
  id: string;
  name: string;
  type: 'plant' | 'dc' | 'demand';
  coordinates: [number, number];
  utilization?: number;
  status?: 'normal' | 'underutilized' | 'high-demand';
}

const nodes: MapNode[] = [
  // Manufacturing Plants
  { id: 'plant-uk', name: 'UK Plant', type: 'plant', coordinates: [-1.5, 53.0] },
  { id: 'plant-de', name: 'Germany Plant', type: 'plant', coordinates: [9.0, 50.0] },
  { id: 'plant-fr', name: 'France Plant', type: 'plant', coordinates: [2.3, 48.8] },
  { id: 'plant-it', name: 'Italy Plant', type: 'plant', coordinates: [12.5, 41.9] },
  { id: 'plant-pl', name: 'Poland Plant', type: 'plant', coordinates: [19.0, 52.2] },
  
  // Distribution Centers
  { id: 'dc-manchester', name: 'Manchester DC', type: 'dc', coordinates: [-2.24, 53.48], utilization: 85, status: 'normal' },
  { id: 'dc-frankfurt', name: 'Frankfurt DC', type: 'dc', coordinates: [8.68, 50.11], utilization: 92, status: 'normal' },
  { id: 'dc-paris', name: 'Paris DC', type: 'dc', coordinates: [2.35, 48.86], utilization: 88, status: 'normal' },
  { id: 'dc-milan', name: 'Milan DC', type: 'dc', coordinates: [9.19, 45.46], utilization: 90, status: 'normal' },
  { id: 'dc-warsaw', name: 'Warsaw DC', type: 'dc', coordinates: [21.01, 52.23], utilization: 45, status: 'underutilized' },
  
  // Demand Clusters
  { id: 'demand-berlin', name: 'Berlin Demand', type: 'demand', coordinates: [13.4, 52.52], status: 'high-demand' },
  { id: 'demand-london', name: 'London Demand', type: 'demand', coordinates: [-0.12, 51.50], status: 'high-demand' },
  { id: 'demand-toulouse', name: 'Toulouse Demand', type: 'demand', coordinates: [1.44, 43.60], status: 'high-demand' },
];

const routes = [
  { from: 'plant-uk', to: 'dc-manchester' },
  { from: 'plant-de', to: 'dc-frankfurt' },
  { from: 'plant-fr', to: 'dc-paris' },
  { from: 'plant-it', to: 'dc-milan' },
  { from: 'plant-pl', to: 'dc-warsaw' },
];

export const SupplyChainMapMain = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('pk.eyJ1IjoiaGFyc2gzMCIsImEiOiJjbWVhMjlmdXEwenBiMmpzaG9jM3p6Zzd1In0.bcCwfO1VpdbJ9RtoPd2__Q');
  const [showTokenInput, setShowTokenInput] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [10, 50],
      zoom: 4.5,
      pitch: 45,
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // Add routes as lines
      routes.forEach((route) => {
        const fromNode = nodes.find((n) => n.id === route.from);
        const toNode = nodes.find((n) => n.id === route.to);
        
        if (fromNode && toNode) {
          const isWarsaw = route.to === 'dc-warsaw';
          
          map.current?.addLayer({
            id: `route-${route.from}-${route.to}`,
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: [fromNode.coordinates, toNode.coordinates],
                },
              },
            },
            paint: {
              'line-color': isWarsaw ? '#f59e0b' : '#0ea5e9',
              'line-width': isWarsaw ? 3 : 2,
              'line-opacity': 0.6,
              'line-dasharray': isWarsaw ? [2, 2] : [1, 0],
            },
          });
        }
      });

      // Add nodes as markers
      nodes.forEach((node) => {
        const el = document.createElement('div');
        el.className = 'supply-chain-marker';
        
        let color = '#0ea5e9';
        let size = '12px';
        
        if (node.type === 'plant') {
          color = '#3b82f6';
          size = '16px';
        } else if (node.type === 'dc') {
          color = node.status === 'underutilized' ? '#f59e0b' : '#10b981';
          size = '14px';
        } else if (node.type === 'demand') {
          color = '#ef4444';
          size = '10px';
        }
        
        el.style.backgroundColor = color;
        el.style.width = size;
        el.style.height = size;
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        el.style.cursor = 'pointer';

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div class="p-2">
            <h3 class="font-bold text-sm">${node.name}</h3>
            <p class="text-xs text-muted-foreground capitalize">${node.type}</p>
            ${node.utilization ? `<p class="text-xs mt-1">Utilization: ${node.utilization}%</p>` : ''}
          </div>`
        );

        new mapboxgl.Marker(el)
          .setLngLat(node.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  if (!mapboxToken) {
    return (
      <div className="flex items-center justify-center h-full bg-card rounded-lg border">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-warning" />
          <h3 className="text-lg font-semibold mb-2">Mapbox Token Required</h3>
          <p className="text-sm text-muted-foreground mb-4">
            To display the interactive map, please enter your Mapbox public token.
            Get one free at{' '}
            <a
              href="https://mapbox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          {!showTokenInput ? (
            <button
              onClick={() => setShowTokenInput(true)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Enter Token
            </button>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="pk.eyJ1..."
                className="w-full px-3 py-2 border rounded-lg text-sm"
                onChange={(e) => setMapboxToken(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Paste your token and it will be saved for this session
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card p-4 rounded-lg shadow-md border">
        <h4 className="text-sm font-semibold mb-3">Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#3b82f6] border-2 border-white"></div>
            <span>Manufacturing Plant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#10b981] border-2 border-white"></div>
            <span>Distribution Center</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#f59e0b] border-2 border-white"></div>
            <span>Underutilized DC</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444] border-2 border-white"></div>
            <span>Demand Cluster</span>
          </div>
        </div>
      </div>
    </div>
  );
};
