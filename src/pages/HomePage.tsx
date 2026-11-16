import { useState } from "react";
import Lightbox from "../components/Lightbox";
import TrainingVideoSection from "../components/TrainingVideoSection";
import {
  BIO,
  GALLERY,
  GOOGLE_MAPS_LINK,
  HERO,
  LOCATION,
  MODALITIES,
  PLANS,
  PLAN_MODALITIES,
  PLAN_PAYMENT_NOTE,
  SCHEDULE,
  SPONSORS,
  SPONSOR_PHONE_DISPLAY,
  SPONSOR_SECTION,
  SPONSOR_WHATSAPP_LINK,
  TRIAL_WHATSAPP_LINK,
  planWhatsAppLink,
  plansInquiryWhatsAppLink,
} from "../data";

const base = import.meta.env.BASE_URL;
const asset = (src: string) => base + src.replace(/^\//, "");

const renderBenefitIcon = (icon: string) => {
  switch (icon) {
    case "trophy":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
          <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-2c-.55 0-1-.45-1-1v-2.34" />
          <path d="M6 3h12v7a6 6 0 0 1-12 0V3z" />
        </svg>
      );
    case "share":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );
    case "handshake":
    default:
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m11 17 2 2a1 1 0 0 0 1.4 0l6.6-6.6a2 2 0 0 0 0-2.8l-2.6-2.6a2 2 0 0 0-2.8 0L13 9.6" />
          <path d="m13 14 1.5-1.5" />
          <path d="M2 13l4.5-4.5a2 2 0 0 1 2.8 0l1.4 1.4a2 2 0 0 1 0 2.8L8 15.4" />
          <path d="M5.5 16.5 7 18" />
          <path d="m7.5 13.5 1.5 1.5" />
        </svg>
      );
  }
};

function HomePage() {
  const [scheduleIndex, setScheduleIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const activeSchedule = SCHEDULE[scheduleIndex];

  // Mantém a ordem de exibição nas mensagens
  const orderedModalities = PLAN_MODALITIES.filter((m) => selectedModalities.includes(m));

  const toggleModality = (name: string) => {
    setSelectedModalities((current) => {
      if (current.includes(name)) return current.filter((m) => m !== name);
      // Limite de no máximo 2 modalidades
      const next = [...current, name];
      return next.slice(-2);
    });
  };

  const selectPlan = (index: number) => {
    setSelectedPlan((current) => (current === index ? null : index));
  };

  return (
    <>
      <main>
        <section className="hero" id="inicio">
          <img
            className="hero__image"
            src={asset("/hero-bg.webp")}
            alt="Fachada do Centro de Lutas Betão Fight em Aracaju"
            loading="eager"
          />
          <div className="hero__overlay" />

          <div className="container hero__content">
            <span className="eyebrow">{HERO.eyebrow}</span>
            <h1>{HERO.title}</h1>
            <p>{HERO.description}</p>
            <div className="hero__actions">
              <a
                className="button button--primary"
                href={TRIAL_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                {HERO.ctaPrimary}
              </a>
              <a className="button button--ghost" href="#horarios">
                {HERO.ctaSecondary}
              </a>
            </div>
          </div>
        </section>

        <section className="section section--dense" id="modalidades">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Treinos</span>
                <h2>Escolha sua luta</h2>
              </div>
              <p>Comece do zero ou evolua seu nível com acompanhamento técnico.</p>
            </div>

            <div className="modalities-grid">
              {MODALITIES.map((modality, index) => (
                <article className="modality" key={modality.name}>
                  <span className="modality__number">0{index + 1}</span>
                  <h3>{modality.name}</h3>
                  <p>{modality.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <TrainingVideoSection />

        <section className="section section--surface section--dense" id="planos">
          <div className="container">
            <div className="section-heading section-heading--compact">
              <div>
                <span className="eyebrow">Planos</span>
                <h2>Treine do seu jeito</h2>
              </div>
            </div>

            <div className="plans-modalities" role="group" aria-label="Modalidades disponíveis">
              <span className="plans-modalities__label">Modalidades disponíveis</span>
              <ul>
                {PLAN_MODALITIES.map((name) => {
                  const active = selectedModalities.includes(name);
                  return (
                    <li key={name}>
                      <button
                        type="button"
                        id={`plan-modality-${name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                        className={`plans-modality${active ? " plans-modality--active" : ""}`}
                        aria-pressed={active}
                        onClick={() => toggleModality(name)}
                      >
                        {active && <span aria-hidden="true">✓</span>}
                        {name}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <span className={`plans-modalities__hint${orderedModalities.length === 2 ? " plans-modalities__hint--max" : ""}`}>
                {orderedModalities.length === 2
                  ? "Limite de 2 modalidades atingido (2/2)"
                  : orderedModalities.length === 1
                  ? "1 de 2 selecionadas (máx. 2)"
                  : "Selecione até 2 modalidades (máx. 2)"}
              </span>
            </div>

            <div className="plans-grid" aria-label="Planos da Betão Fight">
              {PLANS.map((plan, index) => (
                <article
                  className={`plan-card${plan.featured ? " plan-card--featured" : ""}${selectedPlan === index ? " plan-card--selected" : ""}`}
                  key={plan.name}
                  onClick={() => selectPlan(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      selectPlan(index);
                    }
                  }}
                  aria-pressed={selectedPlan === index}
                >
                  {plan.badge && <span className="plan-card__badge">{plan.badge}</span>}
                  {selectedPlan === index && (
                    <span className="plan-card__check" aria-hidden="true">✓</span>
                  )}
                  <span className="plan-card__name">{plan.name}</span>
                  <strong>{plan.price}</strong>
                  <span className="plan-card__detail">{plan.detail}</span>
                  {plan.benefit && <span className="plan-card__benefit">{plan.benefit}</span>}
                </article>
              ))}
            </div>

            <div className="plans-footer">
              <p>{PLAN_PAYMENT_NOTE}</p>
              {selectedPlan !== null ? (
                <a
                  href={planWhatsAppLink(
                    PLANS[selectedPlan].name,
                    PLANS[selectedPlan].price,
                    orderedModalities
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button--primary plans-footer__cta"
                >
                  Quero o plano {PLANS[selectedPlan].name} →
                </a>
              ) : (
                <a
                  href={plansInquiryWhatsAppLink(orderedModalities)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Tirar dúvidas sobre planos →
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="section" id="horarios">
          <div className="container schedule-layout">
            <div className="schedule-intro">
              <span className="eyebrow">Grade semanal</span>
              <h2>Horários</h2>
              <p>Selecione os dias para conferir os treinos disponíveis.</p>

              <div className="schedule-tabs" role="tablist" aria-label="Dias de treino">
                {SCHEDULE.map((group, index) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={scheduleIndex === index}
                    className={`schedule-tab${scheduleIndex === index ? " schedule-tab--active" : ""}`}
                    onClick={() => setScheduleIndex(index)}
                    key={group.days}
                  >
                    {group.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            <div className="schedule-card" role="tabpanel">
              <div className="schedule-card__header">
                <span>{activeSchedule.days}</span>
                <small>{activeSchedule.slots.length} horários</small>
              </div>
              <ul>
                {activeSchedule.slots.map((slot) => (
                  <li key={`${activeSchedule.days}-${slot.time}-${slot.modality}`}>
                    <time>{slot.time}</time>
                    <span>{slot.modality}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section section--surface" id="academia">
          <div className="container about-layout">
            <div className="about-copy">
              <span className="eyebrow">Professor e estrutura</span>
              <h2>{BIO.title}</h2>
              <p>{BIO.text}</p>
              <a href={TRIAL_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-link">
                Agendar aula experimental →
              </a>
            </div>

            <div className="about-media">
              <div className="about-media__main">
                <img
                  className="about-media__betao"
                  src={asset("/betao.webp")}
                  alt="Betão, professor do Centro de Lutas Betão Fight"
                  loading="lazy"
                />
              </div>

              <div className="gallery-strip">
                {GALLERY.map((image, index) => (
                  <button
                    type="button"
                    className="gallery-thumb"
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`Abrir foto ${index + 1} da academia`}
                    key={image.src}
                  >
                    <img
                      src={asset(image.src)}
                      alt={image.alt}
                      loading="lazy"
                      style={{
                        objectPosition: image.objectPosition,
                        objectFit: image.objectFit ?? "cover",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section fachada" id="estrutura">
          <div className="container fachada__inner">
            <div className="fachada__copy">
              <span className="eyebrow">Venha conhecer</span>
              <h2>Sua evolução começa aqui</h2>
              <p>
                Estrutura moderna, equipamentos de ponta e um ambiente que respira luta.
                Na Betão Fight você treina com quem entende de verdade — do iniciante ao competidor.
              </p>
              <div className="fachada__actions">
                <a
                  className="button button--primary"
                  href={TRIAL_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar aula experimental
                </a>
                <a className="button button--ghost" href="#localizacao">
                  Como chegar
                </a>
              </div>
            </div>
            <div className="fachada__media">
              <img
                className="fachada__image"
                src={asset("/frente-betao.jpeg")}
                alt="Fachada do Centro de Lutas Betão Fight em Aracaju"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="section partnerships" id="parcerias">
          <div className="container partnerships__inner">
            <div className="partnerships__content">
              <span className="eyebrow">{SPONSOR_SECTION.eyebrow}</span>
              <h2>{SPONSOR_SECTION.title}</h2>
              <p className="partnerships__lead">
                {SPONSOR_SECTION.description}
              </p>

              <ul className="partnerships__list" aria-label="Benefícios da parceria">
                {SPONSOR_SECTION.benefits.map((item) => (
                  <li className="partnerships__item" key={item.id}>
                    <span className="partnerships__item-icon" aria-hidden="true">
                      {renderBenefitIcon(item.icon)}
                    </span>
                    <span className="partnerships__item-label">{item.label}</span>
                  </li>
                ))}
              </ul>

              <div className="partnerships__actions">
                <a
                  className="button button--primary"
                  href={SPONSOR_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Falar no WhatsApp sobre parcerias e patrocínios"
                >
                  {SPONSOR_SECTION.cta}
                </a>

                <div className="partnerships__contact">
                  <span className="partnerships__contact-label">
                    {SPONSOR_SECTION.whatsappLabel}
                  </span>
                  <a
                    className="partnerships__contact-link"
                    href={SPONSOR_WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chamar no WhatsApp +55 79 99139-9024 para parcerias"
                  >
                    {SPONSOR_PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>

            <div className="partnerships__visual">
              <div className="partnerships__frame">
                <img
                  className="partnerships__image"
                  src={asset("/gallery-2.webp")}
                  alt="Equipe Betão Fight reunida no ringue"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="container partnerships__sponsors">
            <div className="partnerships__sponsors-header">
              <h3 className="partnerships__sponsors-title">{SPONSOR_SECTION.sponsorsTitle}</h3>
              <p className="partnerships__sponsors-subtitle">{SPONSOR_SECTION.sponsorsSubtitle}</p>
            </div>
            <ul className="partnerships__sponsors-list" aria-label="Patrocinadores oficiais do Betão Fight Club">
              {SPONSORS.map((sponsor) => (
                <li
                  className={`partnerships__sponsor-card partnerships__sponsor-card--${sponsor.id}`}
                  key={sponsor.id}
                >
                  <img
                    className="partnerships__sponsor-logo"
                    src={asset(sponsor.logoSrc)}
                    alt={sponsor.logoAlt}
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section location" id="localizacao">
          <div className="container location__inner">
            <div>
              <span className="eyebrow">Farolândia · Aracaju</span>
              <h2>{LOCATION.title}</h2>
              <p>{LOCATION.address}</p>
            </div>
            <div className="location__actions">
              <a
                className="button button--primary"
                href={TRIAL_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar aula experimental
              </a>
              <a
                className="button button--ghost"
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                {LOCATION.mapButton}
              </a>
            </div>
          </div>
        </section>
      </main>

      <a
        className="mobile-whatsapp"
        href={TRIAL_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar aula experimental pelo WhatsApp"
      >
        Agendar aula
      </a>

      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY}
          activeIndex={lightboxIndex}
          onChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
          resolveAsset={asset}
        />
      )}
    </>
  );
}

export default HomePage;
