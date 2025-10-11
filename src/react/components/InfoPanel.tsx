interface InfoPanelProps {
  selectedObject: string | null;
}

const objectInfo: Record<string, { title: string; icon: string; facts: string[] }> = {
  earth: {
    title: 'La Tierra',
    icon: '🌍',
    facts: [
      'La Tierra es el tercer planeta del sistema solar en orden de distancia al Sol.',
      'Aproximadamente el 71% de su superficie está cubierta de agua.',
      'Tiene un diámetro de unos 12,742 kilómetros.',
      'La atmósfera de la Tierra está compuesta mayoritariamente de nitrógeno y oxígeno.',
      'La Tierra es el único planeta conocido que alberga vida.',
    ],
  },
  moon: {
    title: 'La Luna',
    icon: '🌙',
    facts: [
      'La Luna es el único satélite natural de la Tierra y el quinto satélite más grande del sistema solar.',
      'Tiene un diámetro de aproximadamente 3,474 kilómetros.',
      'La Luna no tiene atmósfera significativa, lo que provoca temperaturas extremas en su superficie.',
      'Su gravedad es aproximadamente una sexta parte de la de la Tierra.',
      'Las fases de la Luna son causadas por su posición relativa al Sol y la Tierra.',
    ],
  },
  satellite: {
    title: 'Satélite',
    icon: '🛰️',
    facts: [
      'Un satélite es un objeto que orbita un planeta u otro cuerpo celestial.',
      'Los satélites pueden ser naturales, como la Luna, o artificiales, construidos por el ser humano.',
      'Los satélites artificiales se utilizan para telecomunicaciones, monitoreo climático y exploración espacial.',
      'Algunos satélites están en órbita baja de la Tierra, mientras que otros están a mayor distancia.',
      'Las órbitas de los satélites son cuidadosamente calculadas para evitar colisiones y maximizar su funcionalidad.',
    ],
  },
  sun: {
    title: 'El Sol',
    icon: '☀️',
    facts: [
      'El Sol es la estrella en el centro del sistema solar y la principal fuente de energía para la Tierra.',
      'Tiene un diámetro de aproximadamente 1,39 millones de kilómetros, lo que lo convierte en el objeto más grande del sistema solar.',
      'El Sol está compuesto principalmente de hidrógeno y helio, que se fusionan en su núcleo generando energía.',
      'La luz del Sol tarda alrededor de 8 minutos y 20 segundos en llegar a la Tierra.',
      'Las erupciones solares y las manchas solares son fenómenos que ocurren en la superficie del Sol.',
    ],
  },
};

export default function InfoPanel({ selectedObject }: InfoPanelProps) {
  if (!selectedObject || !objectInfo[selectedObject]) {
    return (
      <div id="info-container">
        <p className="text-xs text-base-content/60">Selecciona un objeto para ver más información...</p>
      </div>
    );
  }

  const info = objectInfo[selectedObject];

  return (
    <div id="info-container">
      <h3 className="text-lg font-bold mb-2">
        {info.icon} {info.title}
      </h3>
      <div className="space-y-2 text-sm">
        {info.facts.map((fact, index) => (
          <p key={index}>{fact}</p>
        ))}
      </div>
    </div>
  );
}
