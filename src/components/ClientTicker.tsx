import React from 'react';
import '../ClientTicker.css';

interface Client {
  name: string;
  logo: string;
}

const clients: Client[] = [
  { name: 'logo', logo: 'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/logos.webp' },
  { name: 'logo1', logo: 'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/logos1.jpg' },
  { name: 'logo2', logo: 'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/logos2.webp' },
  { name: 'logo3', logo: 'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/logos3.webp' },
  { name: 'logo4', logo: 'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/logos4.webp' },
   { name: 'logo5', logo: 'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/logos5.webp' },
    { name: 'logo6', logo: 'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/logos6.webp' },
     { name: 'logo7', logo: 'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/logos7.webp' },
      { name: 'logo8', logo: 'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/logos8.webp' },
       { name: 'logo9', logo: 'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/logos9.webp' },
        { name: 'logo10', logo: 'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/logos10.webp' },
];

const ClientTicker: React.FC = () => {
  const tickerItems = [...clients, ...clients, ...clients];

  return (
    <section className="mosaic-white-container">
      <div className="ticker-viewport">
        <div className="ticker-track">
          {tickerItems.map((client, index) => (
            <div key={index} className="logo-card">
              <img 
                src={client.logo} 
                alt={`${client.name} logo`} 
                loading="lazy"
                // onError={(e) => {
                //   console.error(`Failed to load logo for ${client.name}`);
                // }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTicker;