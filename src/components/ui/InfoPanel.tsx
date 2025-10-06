import React from 'react'

interface InfoPanelProps {
  title: string
  children: React.ReactNode
  isVisible: boolean
  onClose: () => void
  className?: string
}

export const InfoPanel: React.FC<InfoPanelProps> = ({
  title,
  children,
  isVisible,
  onClose,
  className = 'left-0 sm:left-20 top-20',
}) => {
  if (!isVisible) return null

  return (
    <div className={`absolute ${className} z-[9000]`}>
      <div className="chat chat-start text-primary-content items-start justify-start">
        {/* Doctor Avatar */}
        <div className="hidden sm:block absolute chat-image avatar -bottom-14 -left-10">
          <div className="w-24">
            <img alt="Doctor avatar" src="/img/doctor.png" className="rounded-full" />
          </div>
        </div>

        {/* Info Content */}
        <div className="max-w-96 p-4 chat-bubble text-neutral-content rounded-2xl px-6 bg-base-200/95 backdrop-blur-sm shadow-2xl border border-white/10">
          <h3 className="font-bold text-lg mb-3 text-primary">{title}</h3>
          <div className="space-y-2 text-sm leading-relaxed">{children}</div>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="-right-0 top-1 border border-neutral-50 absolute m-0 btn btn-primary btn-xs rounded-sm rounded-tr-2xl rounded-bl-2xl z-[9001]"
        aria-label="Cerrar panel"
      >
        ✕
      </button>
    </div>
  )
}

// Predefined content components for each celestial body
export const EarthInfo: React.FC = () => (
  <>
    <div>La Tierra es el tercer planeta del sistema solar en orden de distancia al Sol.</div>
    <div>Aproximadamente el 71% de su superficie está cubierta de agua.</div>
    <div>Tiene un diámetro de unos 12,742 kilómetros.</div>
    <div>La atmósfera de la Tierra está compuesta mayoritariamente de nitrógeno y oxígeno.</div>
    <div>La Tierra es el único planeta conocido que alberga vida.</div>
  </>
)

export const MoonInfo: React.FC = () => (
  <>
    <div>
      La Luna es el único satélite natural de la Tierra y el quinto satélite más grande del sistema
      solar.
    </div>
    <div>Tiene un diámetro de aproximadamente 3,474 kilómetros.</div>
    <div>
      La Luna no tiene atmósfera significativa, lo que provoca temperaturas extremas en su
      superficie.
    </div>
    <div>Su gravedad es aproximadamente una sexta parte de la de la Tierra.</div>
    <div>Las fases de la Luna son causadas por su posición relativa al Sol y la Tierra.</div>
  </>
)

export const SunInfo: React.FC = () => (
  <>
    <div>
      El Sol es la estrella en el centro del sistema solar y la principal fuente de energía para la
      Tierra.
    </div>
    <div>
      Tiene un diámetro de aproximadamente 1,39 millones de kilómetros, lo que lo convierte en el
      objeto más grande del sistema solar.
    </div>
    <div>
      El Sol está compuesto principalmente de hidrógeno y helio, que se fusionan en su núcleo
      generando energía.
    </div>
    <div>La luz del Sol tarda alrededor de 8 minutos y 20 segundos en llegar a la Tierra.</div>
    <div>
      Las erupciones solares y las manchas solares son fenómenos que ocurren en la superficie del
      Sol.
    </div>
  </>
)

export const SatelliteInfo: React.FC = () => (
  <>
    <div>Un satélite es un objeto que orbita un planeta u otro cuerpo celestial.</div>
    <div>
      Los satélites pueden ser naturales, como la Luna, o artificiales, construidos por el ser
      humano.
    </div>
    <div>
      Los satélites artificiales se utilizan para telecomunicaciones, monitoreo climático y
      exploración espacial.
    </div>
    <div>
      Algunos satélites están en órbita baja de la Tierra, mientras que otros están a mayor
      distancia.
    </div>
    <div>
      Las órbitas de los satélites son cuidadosamente calculadas para evitar colisiones y maximizar
      su funcionalidad.
    </div>
  </>
)
